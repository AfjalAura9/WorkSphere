import React, { useState } from "react";
import { FiMenu, FiLogOut } from "react-icons/fi";
import NotificationBell from "../common/NotificationBell";
import Sidebar from "../other/Sidebar";

const Header = ({
  changeUser,
  data,
  activePage,
  setActivePage,
  logOutUser,
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <header className="flex items-center justify-between px-8 py-5 bg-white shadow-lg">
        <div className="flex items-center">
          <img src="/Logo.png" alt="Logo" className="h-12 w-12 mr-3" />
          <span className="text-2xl font-extrabold text-blue-800 tracking-wide">
            WorkSphere
          </span>
        </div>
        <div className="flex items-center">
          <span className="mr-6 text-gray-800 font-semibold text-lg">
            Hello, {data?.firstName || "User"}
          </span>
          <NotificationBell />
          {/* Hamburger menu for mobile */}
          <button
            className="md:hidden p-2 rounded hover:bg-gray-100 ml-2"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            aria-label="Open menu"
          >
            <FiMenu className="h-7 w-7" />
          </button>
          {/* Logout for desktop */}
          <button
            className="hidden md:flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg font-bold ml-6 shadow transition"
            onClick={changeUser}
          >
            <FiLogOut size={18} />
            Logout
          </button>
        </div>
      </header>
      {/* Sidebar for mobile */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 flex">
          <Sidebar
            activePage={activePage}
            setActivePage={(page) => {
              setActivePage(page);
              setIsSidebarOpen(false);
            }}
            isOpen={isSidebarOpen}
            setIsOpen={setIsSidebarOpen}
            logOutUser={logOutUser}
          />
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
