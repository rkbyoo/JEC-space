import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Modal, Upload, Button, message } from 'antd'
import { EditOutlined, UploadOutlined } from '@ant-design/icons'
import { UpdateName, UpdateProfilePicture } from '../../../apicalls/profile'
import { SetUser } from '../../../redux/usersSlice'

function ProfileInfo() {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.users)
    const [editing, setEditing] = useState(false)
    const [name, setName] = useState(user.name)
    const [modalOpen, setModalOpen] = useState(false)
    const [file, setFile] = useState(null)
    const [uploading, setUploading] = useState(false)

    const handleEdit = () => setEditing(true)
    const handleChange = (e) => setName(e.target.value)

    // Update name using API
    const handleSave = async () => {
        try {
            const res = await UpdateName({ userName: name, userId: user._id });
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
            formData.append("userId", user._id);
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

    return (
        <div className="text-black ">
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
                                    className="bg-gray-800 border border-gray-700 rounded px-2 py-1 text-white focus:outline-none"
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
        </div>
    )
}

export default ProfileInfo

