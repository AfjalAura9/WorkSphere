import React, { useState } from "react";
import { FiMenu, FiBell } from "react-icons/fi";
import Sidebar from "../other/Sidebar";

const Header = ({ changeUser, data, activePage, setActivePage }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State to toggle sidebar visibility
  const [notifications, setNotifications] = useState([
    "Task 1 is due soon",
    "New task assigned to you",
    "Task 3 has been completed",
  ]); // Example notifications
  const [isNotificationOpen, setIsNotificationOpen] = useState(false); // State to toggle notification dropdown

  const logOutUser = () => {
    if (changeUser) changeUser(null);
  };

  const toggleNotificationDropdown = () => {
    setIsNotificationOpen(!isNotificationOpen);
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
        <div className="flex items-center gap-4 relative">
          {/* Notification Icon */}
          <button
            className="text-gray-600 text-xl relative"
            onClick={toggleNotificationDropdown}
          >
            <FiBell />
            {notifications.length > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full px-1">
                {notifications.length}
              </span>
            )}
          </button>

          {/* Notification Dropdown */}
          {isNotificationOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-lg overflow-hidden z-50">
              <ul className="divide-y divide-gray-200">
                {notifications.length > 0 ? (
                  notifications.map((notification, index) => (
                    <li
                      key={index}
                      className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      {notification}
                    </li>
                  ))
                ) : (
                  <li className="px-4 py-2 text-sm text-gray-500">
                    No new notifications
                  </li>
                )}
              </ul>
            </div>
          )}

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
