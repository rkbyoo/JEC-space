import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Modal, Upload, Button, message } from 'antd'
import { EditOutlined, UploadOutlined } from '@ant-design/icons'

function ProfileInfo() {
    const { user } = useSelector((state) => state.users)
    const [editing, setEditing] = useState(false)
    const [name, setName] = useState(user.name)
    const [modalOpen, setModalOpen] = useState(false)
    const [file, setFile] = useState(null)
    const [uploading, setUploading] = useState(false)

    const handleEdit = () => setEditing(true)
    const handleChange = (e) => setName(e.target.value)
    const handleSave = () => setEditing(false)

    // Handle file selection
    const handleFileChange = (info) => {
        if (info.file.status === 'removed') {
            setFile(null)
        } else if (info.file.status === 'done' || info.file.status === 'uploading' || info.file.originFileObj) {
            setFile(info.file.originFileObj)
        }
    }

    // Simulate API call to backend for image upload
    const handleChangeImage = async () => {
        if (!file) {
            message.warning('Please select an image to upload.')
            return
        }
        setUploading(true)
        try {
            // Replace this with your actual API call
            const formData = new FormData()
            formData.append('profilePicture', file)
            // await api.uploadProfilePicture(formData)
            setTimeout(() => {
                setUploading(false)
                setModalOpen(false)
                message.success('Profile picture updated!')
                // Optionally, refresh user info here
            }, 1200)
        } catch (err) {
            setUploading(false)
            message.error('Failed to update profile picture.')
        }
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
                        {/* Edit icon inside profile picture */}
                        <button
                            className="absolute bottom-3 right-3 rounded-full p-1 shadow  hover:bg-blue-100 transition"
                            onClick={() => setModalOpen(true)}
                            title="Edit Profile Picture"
                            style={{ zIndex: 12 }}
                        >
                            <EditOutlined className="text-blue-500 text-lg" />
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
                onCancel={() => setModalOpen(false)}
                footer={[
                    <Button key="cancel" onClick={() => setModalOpen(false)}>
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
                >
                    <Button icon={<UploadOutlined />}>Select Image</Button>
                </Upload>
            </Modal>
        </div>
    )
}

export default ProfileInfo

