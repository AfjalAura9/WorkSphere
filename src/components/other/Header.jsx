import React, { useState } from "react";
import { FiMenu } from "react-icons/fi";
import Sidebar from "../other/Sidebar";
import NotificationBell from "../common/NotificationBell";

const Header = ({ changeUser, data, activePage, setActivePage }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State to toggle sidebar visibility

  const logOutUser = () => {
    if (changeUser) changeUser(null);
  };

  return (
    <>
      {/* Header */}
      <header className="flex items-center justify-between bg-white shadow-md p-4 md:p-6 rounded-lg mb-4">
        {/* Left Section: Hamburger Menu and Greeting */}
        <div className="flex items-center gap-4">
          {/* Hamburger Menu */}
          <button
            className="text-gray-600 text-2xl md:hidden"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
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
          {/* Notification Bell */}
          <NotificationBell />

          {/* Log Out Button (Visible only on larger screens) */}
          <button
            onClick={logOutUser}
            className="hidden md:block bg-red-500 text-white text-sm md:text-base py-2 px-4 rounded-lg hover:bg-red-600 transition"
          >
            Log Out
          </button>
        </div>
      </header>

      {/* Sidebar for Small Screens */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Sidebar */}
          <Sidebar
            activePage={activePage}
            setActivePage={(page) => {
              setActivePage(page);
              setIsSidebarOpen(false); // Close sidebar after selecting a page
            }}
            isOpen={isSidebarOpen}
            setIsOpen={setIsSidebarOpen}
            logOutUser={logOutUser} // Pass logOutUser to Sidebar
          />

          {/* Overlay */}
          <div
            className="flex-1 bg-black bg-opacity-50"
            onClick={() => setIsSidebarOpen(false)}
          ></div>
        </div>
      )}
    </>
  );
};

export default Header;
