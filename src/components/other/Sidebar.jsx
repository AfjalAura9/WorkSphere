import React, { useState } from "react";
import {
  FiUserPlus,
  FiClipboard,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";

const Sidebar = ({ activePage, setActivePage }) => {
  const [isOpen, setIsOpen] = useState(true);

  const navItems = [
    { label: "Assign Task", icon: <FiClipboard size={20} />, key: "assign-task" },
    { label: "Manage Users", icon: <FiUserPlus size={20} />, key: "manage-users" },
  ];

  return (
    <div
      className={`bg-gray-900 text-white h-screen transition-all duration-300 ${
        isOpen ? "w-64" : "w-34"
      }`}
    >
      {/* Toggle Button */}
      <div className="flex justify-end mb-6">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white text-xl focus:outline-none"
        >
          {isOpen ? <FiChevronLeft /> : <FiChevronRight />}
        </button>
      </div>

      {/* Navigation */}
      <ul className="space-y-2">
        {navItems.map((item) => {
          const isActive = activePage === item.key;

          return (
            <li
              key={item.key}
              onClick={() => setActivePage(item.key)}
              className={`flex items-center gap-3 cursor-pointer p-3 transition-all duration-200
                ${isActive ? "bg-white text-blue-500" : "text-white hover:bg-gray-700"}
                ${!isOpen ? "justify-center" : ""}`}
            >
              <div className="flex justify-center items-center">{item.icon}</div>
              {isOpen && <span className="text-sm font-medium">{item.label}</span>}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
