import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Modal, Upload, Button, message } from 'antd'
import { EditOutlined, UploadOutlined } from '@ant-design/icons'
import { UpdateName, UpdateProfilePicture, ChangePassword, DeleteAccount } from '../../../apicalls/profile'
import { SetUser } from '../../../redux/usersSlice'
import { useNavigate } from 'react-router-dom'

function ProfileInfo() {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.users)
    const [editing, setEditing] = useState(false)
    const [name, setName] = useState(user.name)
    const [modalOpen, setModalOpen] = useState(false)
    const [file, setFile] = useState(null)
    const [uploading, setUploading] = useState(false)
    const navigate = useNavigate();
    const [deleteModalOpen, setDeleteModalOpen] = useState(false)
    const [deletePassword, setDeletePassword] = useState("")
    const [deleting, setDeleting] = useState(false)
    const [changePwdModalOpen, setChangePwdModalOpen] = useState(false)
    const [oldPwd, setOldPwd] = useState("")
    const [newPwd, setNewPwd] = useState("")
    const [changingPwd, setChangingPwd] = useState(false)

    const handleEdit = () => setEditing(true)
    const handleChange = (e) => setName(e.target.value)

    // Update name using API
    const handleSave = async () => {
        try {
            const res = await UpdateName({ userName: name});
            if (res.success) {
                message.success("Name updated successfully");
                setEditing(false);
                // Update redux user state with new name
                dispatch(SetUser(res.data));
            } else {
                message.error(res.message || "Failed to update name");
            }
        } catch (err) {
            message.error("Error updating name");
        }
    }

    // Handle file selection
    const handleFileChange = (info) => {
        if (info.fileList.length === 0) {
            setFile(null)
        } else {
            setFile(info.fileList[info.fileList.length - 1].originFileObj)
        }
    }

    // Update profile picture using API
    const handleChangeImage = async () => {
        if (!file) {
            message.warning('Please select an image to upload.')
            return
        }
        setUploading(true)
        try {
            const formData = new FormData();
            formData.append("newProfilePicture", file);
            const res = await UpdateProfilePicture(formData);
            if (res.success) {
                message.success("Profile picture updated!");
                setModalOpen(false);
                setFile(null);
                // Update redux user state with new profile picture
                dispatch(SetUser(res.data));
            } else {
                message.error(res.message || "Failed to update profile picture");
            }
        } catch (err) {
            message.error("Error updating profile picture");
        }
        setUploading(false)
    }

    // Handler for deleting account
    const handleDeleteAccount = async () => {
        setDeleting(true)
        try {
            const res = await DeleteAccount({
                                confirmPassword: deletePassword
            })
            if (res.success) {
                message.success("Account deleted successfully")
                setDeleteModalOpen(false)
                //this will remove the token and then navgate to login account
                localStorage.removeItem("token")
                navigate('/login')
            } else {
                message.error(res.message || "Failed to delete account")
            }
        } catch (err) {
            message.error("Error deleting account")
        }
        setDeleting(false)
    }

    // Handler for changing password
    const handleChangePassword = async () => {
        setChangingPwd(true)
        try {
            const res = await ChangePassword({
                                currentPassword: oldPwd,
                newPassword: newPwd
            })
            console.log(res)
            if (res.success) {
                message.success("Password changed successfully")
                setChangePwdModalOpen(false)
                setOldPwd("")
                setNewPwd("")
            } else {
                message.error(res || "Failed to change password")
            }
        } catch (error) {
            message.error(error.message)
        }
        setChangingPwd(false)
    }

    return (
        <div className="text-black bg-white ">
            <div className="max-w-full p-8 rounded-2xl shadow-2xl border">
                <div className="flex flex-col items-center mb-6 relative">
                    {/* Profile Picture with Edit Icon Inside */}
                    <div className="relative w-28 h-28">
                        {user.profilePicture ? (
                            <img
                                src={user.profilePicture}
                                alt="Profile"
                                className="w-28 h-28 rounded-full object-cover border-4 border-blue-500 shadow-lg"
                            />
                        ) : (
                            <div className="w-28 h-28 rounded-full bg-gray-800 flex items-center justify-center border-4 border-blue-500 shadow-lg">
                                <span className="text-4xl text-gray-500">?</span>
                            </div>
                        )}
                        {/* edit icon inside profile picture */}
                        <button
                            className="absolute bottom-2 right-2 bg-gradient-to-tr from-blue-500 to-blue-400 border-2 border-white rounded-full p-2 shadow-lg hover:scale-110 hover:from-blue-600 hover:to-blue-400 transition-all duration-200 flex items-center justify-center"
                            onClick={() => setModalOpen(true)}
                            title="Edit Profile Picture"
                            style={{ zIndex: 12 }}
                        >
                            <EditOutlined className="text-white text-lg" />
                        </button>
                    </div>
                    <h2 className="text-2xl font-bold mt-4">Profile Information</h2>
                </div>
                <div className="mb-4 flex flex-col gap-4">
                    <div className="flex items-center gap-2">
                        <span className="font-semibold">Name:</span>
                        {editing ? (
                            <>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={handleChange}
                                    className="bg-white text-black border border-gray-300 rounded px-2 py-1 focus:outline-none placeholder-black"
                                    placeholder="Enter your name"
                                />
                                <button
                                    onClick={handleSave}
                                    className="ml-2 text-green-400 hover:text-green-600 text-sm"
                                    title="Save"
                                >
                                    Save
                                </button>
                            </>
                        ) : (
                            <>
                                <span>{name}</span>
                                {/* Edit icon beside name */}
                                <button
                                    onClick={handleEdit}
                                    className="ml-2 text-blue-400 hover:text-blue-600 text-sm flex items-center"
                                    title="Edit Name"
                                >
                                    <EditOutlined />
                                </button>
                            </>
                        )}
                    </div>
                    <div>
                        <span className="font-semibold">Email:</span> {user.email}
                    </div>
                    <div>
                        <span className="font-semibold">Created At:</span> {new Date(user.createdAt).toLocaleString()}
                    </div>
                </div>

                {/* Add these buttons below the profile info */}
                <div className="flex gap-4 mt-8">
                    <Button danger onClick={() => setDeleteModalOpen(true)}>
                        Delete Account
                    </Button>
                    <Button onClick={() => setChangePwdModalOpen(true)}>
                        Change Password
                    </Button>
                </div>
            </div>

            {/* Modal for image upload */}
            <Modal
                title="Change Profile Picture"
                open={modalOpen}
                onCancel={() => {
                    setModalOpen(false);
                    setFile(null);
                }}
                footer={[
                    <Button key="cancel" onClick={() => {
                        setModalOpen(false);
                        setFile(null);
                    }}>
                        Cancel
                    </Button>,
                    <Button
                        key="submit"
                        type="primary"
                        loading={uploading}
                        onClick={handleChangeImage}
                        disabled={!file}
                    >
                        Change Image
                    </Button>,
                ]}
            >
                <Upload
                    beforeUpload={() => false}
                    showUploadList={true}
                    maxCount={1}
                    onChange={handleFileChange}
                    accept="image/*"
                    fileList={file ? [{
                        uid: '-1',
                        name: file.name,
                        status: 'done',
                        url: URL.createObjectURL(file),
                    }] : []}
                >
                    <Button icon={<UploadOutlined />}>Select Image</Button>
                </Upload>
            </Modal>

            {/* Modal for Delete Account */}
            <Modal
                title="Delete Account"
                open={deleteModalOpen}
                onCancel={() => {
                    setDeleteModalOpen(false)
                    setDeletePassword("")
                }}
                footer={[
                    <Button key="cancel" onClick={() => setDeleteModalOpen(false)}>
                        Cancel
                    </Button>,
                    <Button
                        key="delete"
                        danger
                        loading={deleting}
                        onClick={handleDeleteAccount}
                        disabled={!deletePassword}
                    >
                        Delete
                    </Button>
                ]}
            >
                <p>Enter your password to confirm account deletion:</p>
                <input
                    type="password"
                    value={deletePassword}
                    onChange={e => setDeletePassword(e.target.value)}
                    className="w-full bg-white text-black border rounded px-2 py-1 mt-2 placeholder-black"
                    placeholder="Confirm Password"
                />
            </Modal>

            {/* Modal for Change Password */}
            <Modal
                title="Change Password"
                open={changePwdModalOpen}
                onCancel={() => {
                    setChangePwdModalOpen(false)
                    setOldPwd("")
                    setNewPwd("")
                }}
                footer={[
                    <Button key="cancel" onClick={() => setChangePwdModalOpen(false)}>
                        Cancel
                    </Button>,
                    <Button
                        key="change"
                        type="primary"
                        loading={changingPwd}
                        onClick={handleChangePassword}
                        disabled={!oldPwd || !newPwd}
                    >
                        Change Password
                    </Button>
                ]}
            >
                <div className="mb-2">
                    <label>Current Password</label>
                    <input
                        type="password"
                        value={oldPwd}
                        onChange={e => setOldPwd(e.target.value)}
                        className="w-full bg-white text-black border rounded px-2 py-1 mt-1 placeholder-black"
                        placeholder="Current Password"
                    />
                </div>
                <div>
                    <label>New Password</label>
                    <input
                        type="password"
                        value={newPwd}
                        onChange={e => setNewPwd(e.target.value)}
                        className="w-full bg-white text-black border rounded px-2 py-1 mt-1 placeholder-black"
                        placeholder="New Password"
                    />
                </div>
            </Modal>
        </div>
    )
}

export default ProfileInfo

