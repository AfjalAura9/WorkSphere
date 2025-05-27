import React, { useState } from "react";
import { FiMenu } from "react-icons/fi";
import NotificationBell from "../common/NotificationBell";
import Sidebar from "../other/Sidebar";

const Header = ({
  changeUser,
  data,
  activePage,
  setActivePage,
  logOutUser,
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State to toggle sidebar visibility

  return (
    <>
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 bg-white shadow">
        <div className="flex items-center">
          <img src="/Logo.png" alt="Logo" className="h-10 w-10 mr-2" />
          <span className="text-xl font-bold text-blue-700">WorkSphere</span>
        </div>
        <div className="flex items-center">
          <span className="mr-4 text-gray-700 font-semibold">
            Hello, {data?.firstName || "User"}
          </span>
          {/* Notification Bell */}
          <NotificationBell />

          {/* Log Out Button (Visible only on larger screens) */}
          {/* <button
            onClick={logOutUser} // Connect logOutUser function
            className="hidden md:inline-block bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded ml-4"
          >
            Logout
          </button> */}

          {/* Hamburger Menu */}
          <button
            className="md:hidden p-2 rounded hover:bg-gray-100"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            aria-label="Open menu"
          >
            <FiMenu className="h-6 w-6" />
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
