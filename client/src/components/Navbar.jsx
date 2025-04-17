import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { GetCurrentUser } from "../apicalls/users";

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState(""); // State to store the username
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsLoggedIn(!!token);

        if (token) {
            fetchUsername(); // Fetch username if logged in
        } else {
            setUsername(""); // Clear username if logged out
        }

    }, [location]); // triggers on route change

    const fetchUsername = async () => {
        try {
            const response = await GetCurrentUser();
            if (response.success) {
                setUsername(response.data.name); // Set the username from the response
            } else {
                setUsername("");
            }
        } catch (error) {
            console.error("Error fetching username:", error);
            setUsername("");
        }
    };

    const handleToggle = () => {
        if (isLoggedIn) {
            localStorage.removeItem("token");
            setIsLoggedIn(false); // update immediately
            navigate("/login");   // or wherever you want to go after logout
        } else {
            navigate("/login"); // go to login page
        }
    };

    return (
        <nav className="flex justify-between items-center px-6 py-4 bg-gray-800 text-white text-center">
            <ul className="flex space-x-6">
                <li>
                    <Link to="/" className="hover:text-blue-400 transition-colors duration-200">
                        Home
                    </Link>
                </li>
                <li>
                    <Link to="/about" className="hover:text-blue-400 transition-colors duration-200">
                        About
                    </Link>
                </li>
                <li>
                    <Link to="/contact" className="hover:text-blue-400 transition-colors duration-200">
                        Contact
                    </Link>
                </li>
            </ul>
            {/* Logut and Username*/}
            <div className="flex items-center space-x-4">
                <button
                    onClick={handleToggle}
                    className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition duration-200"
                >
                    {isLoggedIn ? "Logout" : "Login"}
                </button>

                <div className="flex items-center space-x-2">
                    {/* Profile Circle */}
                    <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white text-lg font-bold uppercase">
                        {isLoggedIn && username ? username.charAt(0) : "G"}
                    </div>

                    {/* Username */}
                    <span className="font-medium">
                        {isLoggedIn && username ? username : "Guest"}
                    </span>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
