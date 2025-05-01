import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AiFillHome, AiOutlineInfoCircle } from "react-icons/ai";
import { IoIosContact } from "react-icons/io";
import { useSelector } from "react-redux";
import { GetCurrentUser } from "../apicalls/users";
import notification from "../assets/notification.png"
import { IoNotificationsCircleSharp } from "react-icons/io5";
import { ClockCircleOutlined } from '@ant-design/icons';
import { Avatar, Badge, Space } from 'antd';
import Notifications from "./Notifications";
import { getNotification, readNotification } from "../apicalls/notification";
const Navbar = () => {
  const { user } = useSelector((state) => state.users);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

 
  const [notifications = [], setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
    if (token) {
      getUserNotifications();
    }
   
  }, [location]);

  const getUserNotifications = async () => {
    try {
      const response = await getNotification();
      if (response.success) {
        setNotifications(response.data);
      }

    } catch (error) {
      console.error("Error fetching notifications :", error);
    }
  }

  const readnotifications = async () => {
    try {
      await readNotification();
    } catch (error) {
      message.error(error.message);
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <>
      {/* Mobile Bottom Navbar */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-gray-900 text-white flex justify-around items-center py-3 px-2 z-10">
        
        <Link to="/" className="flex flex-col items-center justify-center">
          <AiFillHome size={24} className="hover:text-blue-400 transition" />
          <span className="text-xs mt-1">Home</span>
        </Link>

        {isLoggedIn && (
          <Link
            to="/profile"
            className="flex flex-col items-center justify-center"
          >
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-sm font-bold uppercase">
              {user?.name ? user.name.charAt(0) : "G"}
            </div>
            <span className="text-xs mt-1">Profile</span>
          </Link>
        )}

        <Link
          to="/contact"
          className="flex flex-col items-center justify-center"
        >
          <IoIosContact size={24} className="hover:text-blue-400 transition" />
          <span className="text-xs mt-1">Contact</span>
        </Link>

        <div className="flex items-center space-x-3">
            <div
              className="cursor-pointer"
              onClick={() => {
                setShowNotifications(true);
                readnotifications();
              }}
            >
              <Badge
                count={
                  notifications.filter((notification) => !notification.read).length
                }
              >
                <Avatar
                  shape="circle"
                  size={64}
                  icon={
                    <i className="ri-notification-2-line hover:text-blue-400 transition" />
                  }
                />
              </Badge>
            </div>
          </div>
      </div>

      

      {/* Desktop Navbar */}
      <div className="hidden md:flex w-full h-16 bg-gray-900 text-white flex-row justify-between items-center p-12 fixed top-0 left-0 right-0 z-50">
        {/* Left nav items */}
        <div className="flex space-x-6 items-center">
          <Link
            to="/"
            className="flex items-center space-x-3 hover:text-blue-400 transition"
          >
            <AiFillHome size={24} />
            <span className="hidden md:inline">Home</span>
          </Link>

          <Link
            to="/about"
            className="flex items-center space-x-3 hover:text-blue-400 transition"
          >
            <AiOutlineInfoCircle size={24} />
            <span className="hidden md:inline">About</span>
          </Link>

          <Link
            to="/contact"
            className="flex items-center space-x-3 hover:text-blue-400 transition"
          >
            <IoIosContact size={24} />
            <span className="hidden md:inline">Contact</span>
          </Link>

          {isLoggedIn && <div className="flex items-center space-x-3">
            <div
              className="cursor-pointer"
              onClick={() => {
                setShowNotifications(true);
                readnotifications();
              }}
            >
              <Badge
                count={
                  notifications.filter((notification) => !notification.read).length
                }
              >
                <Avatar
                  shape="circle"
                  size={40}
                  icon={
                    <i className="ri-notification-2-line hover:text-blue-400 transition" />
                  }
                />
              </Badge>
            </div>
          </div>}


          {<Notifications
            notifications={notifications}
            reloadNotifications={setNotifications}
            showNotifications={showNotifications}
            setShowNotifications={setShowNotifications}
            refresh={getUserNotifications}
          />}

        </div>



        {/* Bottom profile section */}
        <div className="flex items-center space-x-4">
          {isLoggedIn && (
            <Link
              to={user?.role === "admin" ? "/admin" : "/profile"}
              className="flex items-center space-x-2 hover:bg-gray-800 px-3 py-2 rounded transition"
            >
              {/* Profile Picture */}
              <img src={user?.profilePicture} className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-lg font-bold uppercase text-white">
                
              </img>

              {/* Username beside the picture */}
              <span className="text-base font-medium hidden md:inline">
                {user?.name}
              </span>
            </Link>
          )}

          {/* Logout/Login button */}
          <button
            onClick={handleLogout}
            className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-4 py-2 rounded transition"
          >
            {isLoggedIn ? "Logout" : "Login"}
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
