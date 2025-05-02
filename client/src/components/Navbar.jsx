import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AiFillHome, AiOutlineInfoCircle } from "react-icons/ai";
import { IoIosContact } from "react-icons/io";
import { useSelector } from "react-redux";
import { message, Avatar, Badge } from "antd";
import Notifications from "./Notifications";
import { getNotification, readNotification } from "../apicalls/notification";

const Navbar = () => {
  const { user } = useSelector((state) => state.users);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [notifications = [], setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // ✅ Check token on route change
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, [location]);

  // ✅ Fetch notifications after user is loaded
  useEffect(() => {
    if (user?._id) {
      const fetchData = async () => {
        await fetchNotifications();
      };
      fetchData();
    }
  }, [user?._id]);

  const fetchNotifications = async () => {
    try {
      const response = await getNotification();
      if (response.success) {
        setNotifications(response.data);
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  const handleNotificationClick = () => {
    setShowNotifications(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setNotifications([]);
    navigate("/login");
  };

  return (
    <>
      {/* Mobile Navbar */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-gray-900 text-white flex justify-around items-center py-3 px-2 z-10">
        <Link to="/" className="flex flex-col items-center">
          <AiFillHome size={24} />
          <span className="text-xs mt-1">Home</span>
        </Link>

        {isLoggedIn && (
          <Link to="/profile" className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-sm font-bold uppercase">
              {user?.name?.charAt(0) || "G"}
            </div>
            <span className="text-xs mt-1">Profile</span>
          </Link>
        )}

        <Link to="/contact" className="flex flex-col items-center">
          <IoIosContact size={24} />
          <span className="text-xs mt-1">Contact</span>
        </Link>

        {isLoggedIn && (
          <div className="cursor-pointer" onClick={handleNotificationClick}>
            <Badge count={notifications.filter((n) => !n.read).length}>
              <Avatar
                shape="circle"
                size={64}
                icon={<i className="ri-notification-2-line" />}
              />
            </Badge>
          </div>
        )}
      </div>

      {/* Desktop Navbar */}
      <div className="hidden md:flex w-full h-16 bg-gray-900 text-white justify-between items-center p-12 fixed top-0 left-0 right-0 z-50">
        {/* Left links */}
        <div className="flex space-x-6 items-center">
          <Link to="/" className="flex items-center space-x-3">
            <AiFillHome size={24} />
            <span>Home</span>
          </Link>
          <Link to="/about" className="flex items-center space-x-3">
            <AiOutlineInfoCircle size={24} />
            <span>About</span>
          </Link>
          <Link to="/contact" className="flex items-center space-x-3">
            <IoIosContact size={24} />
            <span>Contact</span>
          </Link>

          {isLoggedIn && (
            <div className="cursor-pointer" onClick={handleNotificationClick}>
              <Badge count={notifications.filter((n) => !n.read).length}>
                <Avatar
                  shape="circle"
                  size={40}
                  icon={<i className="ri-notification-2-line" />}
                />
              </Badge>
            </div>
          )}
        </div>

        {/* Right section */}
        <div className="flex items-center space-x-4">
          {isLoggedIn && (
            <Link
              to={user?.role === "admin" ? "/admin" : "/profile"}
              className="flex items-center space-x-2"
            >
              <img
                src={user?.profilePicture}
                className="w-10 h-10 rounded-full bg-blue-500"
                alt="avatar"
              />
              <span className="text-base hidden md:inline">{user?.name}</span>
            </Link>
          )}

          <button
            onClick={handleLogout}
            className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-4 py-2 rounded"
          >
            {isLoggedIn ? "Logout" : "Login"}
          </button>
        </div>
      </div>

      {/* Notifications Component */}
      <Notifications
        notifications={notifications}
        reloadNotifications={setNotifications}
        showNotifications={showNotifications}
        setShowNotifications={setShowNotifications}
        refresh={fetchNotifications}
      />
    </>
  );
};

export default Navbar;
