import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AiFillHome,AiOutlineInfoCircle } from "react-icons/ai";
import { IoIosContact } from "react-icons/io";
import { GetCurrentUser } from "../apicalls/users";

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsLoggedIn(!!token);

        if (token) {
            fetchUsername();
        } else {
            setUsername("");
        }
    }, [location]);

    const fetchUsername = async () => {
        try {
            const response = await GetCurrentUser();
            if (response.success) {
                setUsername(response.data.name);
            } else {
                setUsername("");
            }
        } catch (error) {
            console.error("Error fetching user:", error);
            setUsername("");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        navigate("/login");
    };

    return (
        <div className="h-screen w-20 md:w-60 bg-gray-900 text-white flex flex-col justify-between p-10 fixed">
            {/* Top nav items */}
            <div className="space-y-8 mt-6">
                <Link to="/" className="flex items-center space-x-3 hover:text-blue-400 transition">
                    <AiFillHome size={24} />
                    <span className="hidden md:inline">Home</span>
                </Link>

                <Link to="/about" className="flex items-center space-x-3 hover:text-blue-400 transition">
                    <AiOutlineInfoCircle size={24} />
                    <span className="hidden md:inline">About</span>
                </Link>

                <Link to="/contact" className="flex items-center space-x-3 hover:text-blue-400 transition">
                    <IoIosContact size={24} />
                    <span className="hidden md:inline">Contact</span>
                </Link>
            </div>

            {/* Bottom profile section */}
            <div className="space-y-3">
                {isLoggedIn && (
                    <Link
                        to="/profile"
                        className="flex items-center space-x-3 hover:bg-gray-800 p-2 rounded transition"
                    >
                        {/* Profile Picture */}
                        <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-lg font-bold uppercase text-white">
                            {username ? username.charAt(0) : "G"}
                        </div>

                        {/* Username beside the picture */}
                        <span className="text-base font-medium hidden md:inline">
                            {username}
                        </span>
                    </Link>
                )}

                {/* Logout/Login button */}
                <button
                    onClick={handleLogout}
                    className="w-full mt-4 py-1 bg-blue-500 hover:bg-blue-600 rounded text-sm transition hidden md:block"
                >
                    {isLoggedIn ? "Logout" : "Login"}
                </button>
            </div>
        </div>
    );
};

export default Navbar;
