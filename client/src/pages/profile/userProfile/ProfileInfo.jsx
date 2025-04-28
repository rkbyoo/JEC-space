import React, { useState } from 'react'
import { useSelector } from 'react-redux'

function ProfileInfo() {
    const { user } = useSelector((state) => state.users)
    const [editing, setEditing] = useState(false)
    const [name, setName] = useState(user.name)

    const handleEdit = () => setEditing(true)
    const handleChange = (e) => setName(e.target.value)
    const handleSave = () => setEditing(false)

    return (
        <div className="text-black ">
            <div className="max-w-full p-8 rounded-2xl shadow-2xl border">
                <div className="flex flex-col items-center mb-6">
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
                                <button
                                    onClick={handleEdit}
                                    className="ml-2 text-blue-400 hover:text-blue-600 text-sm"
                                    title="Edit Name"
                                >
                                    Edit
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
        </div>
    )
}

export default ProfileInfo

