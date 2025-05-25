import React, { useState } from "react";
import { FiMenu, FiX, FiUserPlus, FiClipboard } from "react-icons/fi";

const Sidebar = ({ activePage, setActivePage }) => {
  const [isOpen, setIsOpen] = useState(false); // State to toggle the sidebar on mobile

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
      {/* Hamburger Menu Button (Visible on small screens) */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-gray-900 text-white p-2 rounded-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-gray-900 text-white z-40 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 w-64`}
      >
        <div className="flex flex-col h-full pt-8">
          <ul className="space-y-4 flex-1">
            {navItems.map((item) => (
              <li
                key={item.key}
                onClick={() => {
                  setActivePage(item.key);
                  setIsOpen(false); // Close sidebar on mobile after clicking
                }}
                className={`flex items-center gap-4 px-4 py-3 cursor-pointer rounded-lg transition ${
                  activePage === item.key ? "bg-blue-500" : "hover:bg-gray-700"
                }`}
              >
                {item.icon}
                <span className="hidden sm:inline">{item.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      {/* Overlay for mobile (closes sidebar when clicking outside) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
