import React from "react";
import { FiUserPlus, FiClipboard, FiLogOut, FiX } from "react-icons/fi";

const Sidebar = ({
  activePage,
  setActivePage,
  isOpen,
  setIsOpen,
  logOutUser,
}) => {
  const navItems = [
    {
      label: "Assign Task",
      icon: <FiClipboard size={20} />,
      key: "assign-task",
    },
    {
      label: "Manage Users",
      icon: <FiUserPlus size={20} />,
      key: "manage-users",
    },
  ];

  return (
    <>
      {/* Overlay for mobile */}
      <div
        className={`fixed inset-0 z-30 bg-black bg-opacity-40 transition-opacity duration-300 ${
          isOpen ? "block md:hidden" : "hidden"
        }`}
        onClick={() => setIsOpen(false)}
        aria-label="Close sidebar overlay"
      ></div>
      <aside
        className={`fixed top-0 left-0 h-full bg-gradient-to-b from-blue-800 to-blue-900 z-40 transform
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 transition-transform duration-300 w-48 shadow-2xl`}
      >
        <div className="flex flex-col h-full pt-6">
          {/* Close button for mobile */}
          <div className="flex justify-end md:hidden px-4">
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-300 hover:text-white transition"
              aria-label="Close sidebar"
            >
              <FiX size={24} />
            </button>
          </div>
          <ul className="space-y-2 flex-1 mt-2">
            {navItems.map((item) => (
              <li
                key={item.key}
                onClick={() => setActivePage(item.key)}
                className={`flex items-center gap-3 px-5 py-3 cursor-pointer rounded-lg font-medium text-base transition-all duration-200
                  ${
                    activePage === item.key
                      ? "bg-blue-600 text-white shadow border-l-4 border-blue-300"
                      : "text-blue-200 hover:bg-blue-700 hover:text-white"
                  }
                `}
              >
                {item.icon}
                <span>{item.label}</span>
              </li>
            ))}
          </ul>
          <div className="p-5">
            <button
              onClick={logOutUser}
              className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg shadow transition"
            >
              <FiLogOut size={18} />
              Log Out
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
