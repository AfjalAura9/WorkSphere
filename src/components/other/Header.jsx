import React from "react";
import { FiMenu, FiBell } from "react-icons/fi";

const Header = ({ changeUser, data }) => {
  const logOutUser = () => {
    if (changeUser) changeUser(null);
  };

  return (
    <header className="flex items-center justify-between bg-white shadow-md p-4 md:p-6 rounded-lg mb-4">
      {/* Left Section: Hamburger Menu and Greeting */}
      <div className="flex items-center gap-4">
        {/* Hamburger Menu */}
        <button className="text-gray-600 text-2xl md:hidden">
          <FiMenu />
        </button>

        {/* Greeting */}
        <div className="flex flex-col">
          <h1 className="text-lg md:text-xl font-bold text-gray-800">
            Hello,{" "}
            <span className="text-blue-600">{data?.name || "Admin"}</span>
          </h1>
          <span className="text-sm text-gray-500 hidden md:block">
            Welcome back!
          </span>
        </div>
      </div>

      {/* Right Section: Notification and Log Out */}
      <div className="flex items-center gap-4">
        {/* Notification Icon */}
        <button className="text-gray-600 text-xl relative">
          <FiBell />
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full px-1">
            3
          </span>
        </button>

        {/* Log Out Button */}
        <button
          onClick={logOutUser}
          className="bg-red-500 text-white text-sm md:text-base py-2 px-4 rounded-lg hover:bg-red-600 transition"
        >
          Log Out
        </button>
      </div>
    </header>
  );
};

export default Header;
