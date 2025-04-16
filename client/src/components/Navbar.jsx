import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsLoggedIn(!!token);
    }, [location]); // triggers on route change

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
            <button
                onClick={handleToggle}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition duration-200"
            >
                {isLoggedIn ? "Logout" : "Login"}
            </button>
        </nav>
    );
};

export default Navbar;
