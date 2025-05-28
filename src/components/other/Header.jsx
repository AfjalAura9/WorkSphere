import React, { useContext, useState, useRef, useEffect } from "react";
import { FiMenu } from "react-icons/fi";
import { IoNotificationsOutline } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { NotificationContext } from "../../context/NotificationContext";
import EditAdminProfileModal from "../UserProfile/EditAdminProfile";
import ProfileMenuDropdown from "../UserProfile/ProfileMenuDropdown";
import { useNavigate } from "react-router-dom";

const Header = ({ data, onHamburgerClick, adminData, logOutUser }) => {
  const navigate = useNavigate();
  const { notifications, markAllRead } = useContext(NotificationContext);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const bellRef = useRef();
  const profileRef = useRef();

  // Close notification dropdown on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (bellRef.current && !bellRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    if (showDropdown) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [showDropdown]);

  // Close profile menu dropdown on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowProfileMenu(false);
      }
    };
    if (showProfileMenu) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [showProfileMenu]);

  // Count unread notifications
  const unreadCount = notifications.filter((n) => !n.read).length;

  // User data for profile menu
  const userData = {
    firstName: adminData?.firstName || "Your name",
    email: adminData?.email || "yourname@gmail.com",
    profilePic: adminData?.profilePic || "/default-profile.png",
  };

  return (
    <header className="bg-white shadow flex items-center justify-between px-6 py-4 transition-all duration-300">
      {/* Left: Hamburger (mobile) + Hello */}
      <div className="flex items-center gap-4">
        <button
          className="md:hidden p-2 rounded hover:bg-gray-100"
          onClick={onHamburgerClick}
          aria-label="Open sidebar"
        >
          <FiMenu className="h-7 w-7 text-blue-800" />
        </button>
        <span className="text-lg md:text-xl font-semibold text-blue-900">
          Hello,{" "}
          <span className="text-blue-600">{data?.firstName || "Admin"}</span>
        </span>
      </div>
      {/* Right: Notification Bell + Profile Icon */}
      <div className="flex items-center gap-6">
        {/* Notification Bell */}
        <div className="relative" ref={bellRef}>
          <button
            className="p-2 rounded-full hover:bg-gray-100 transition relative"
            aria-label="Notifications"
            onClick={() => {
              setShowDropdown((v) => !v);
              markAllRead();
            }}
          >
            <IoNotificationsOutline className="h-6 w-6 text-gray-700" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1.5">
                {unreadCount}
              </span>
            )}
          </button>
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-80 max-h-96 bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-y-auto">
              <div className="p-3 border-b font-semibold text-blue-700">
                Notifications
              </div>
              {notifications.length === 0 ? (
                <div className="p-4 text-gray-400 text-center">
                  No notifications.
                </div>
              ) : (
                notifications
                  .slice()
                  .reverse()
                  .map((n) => (
                    <div
                      key={n.id || n.time}
                      className={`px-4 py-3 border-b last:border-b-0 ${
                        n.read ? "bg-white" : "bg-blue-50"
                      }`}
                    >
                      <div className="font-medium">{n.title}</div>
                      <div className="text-sm text-gray-600">{n.message}</div>
                      <div className="text-xs text-gray-400 mt-1">
                        {n.time ? new Date(n.time).toLocaleString() : ""}
                      </div>
                    </div>
                  ))
              )}
            </div>
          )}
        </div>
        {/* Profile Icon and Dropdown */}
        <div className="relative" ref={profileRef}>
          <button
            className="p-2 rounded-full hover:bg-gray-100 transition"
            aria-label="Profile"
            onClick={() => setShowProfileMenu((v) => !v)}
          >
            <FaUserCircle className="h-7 w-7 text-gray-700" />
          </button>
          {showProfileMenu && (
            <ProfileMenuDropdown
              isOpen={showProfileMenu}
              onClose={() => setShowProfileMenu(false)}
              userData={userData}
              onProfile={() => {
                setShowProfileMenu(false);
                setShowProfileModal(true);
              }}
              logOutUser={() => {
                setShowProfileMenu(false);
                if (typeof logOutUser === "function") {
                  logOutUser();
                } else {
                  window.location.href = "/login";
                }
              }}
            />
          )}
        </div>
      </div>
      {/* Profile Details Modal */}
      <EditAdminProfileModal
        isOpen={showProfileModal}
        onClose={() => setShowProfileModal(false)}
        adminData={adminData}
        onBack={() => {
          setShowProfileModal(false);
          setShowProfileMenu(true);
        }}
      />
    </header>
  );
};

export default Header;
