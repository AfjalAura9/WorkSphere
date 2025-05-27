import React from "react";
import { FiMenu } from "react-icons/fi";
import { IoNotificationsOutline } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";

const Header = ({ data, onHamburgerClick }) => {
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
        <button
          className="p-2 rounded-full hover:bg-gray-100 transition"
          aria-label="Notifications"
        >
          <IoNotificationsOutline className="h-6 w-6 text-gray-700" />
        </button>
        <button
          className="p-2 rounded-full hover:bg-gray-100 transition"
          aria-label="Profile"
        >
          <FaUserCircle className="h-7 w-7 text-gray-700" />
        </button>
      </div>
    </header>
  );
};

export default Header;
