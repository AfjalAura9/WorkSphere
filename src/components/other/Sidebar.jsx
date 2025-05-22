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
    <div
      className={`bg-gray-900 text-white h-screen transition-all duration-300 ${
        isOpen ? "w-60" : "w-20"
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

      {/* Navigation Items */}
      <ul className="space-y-4">
        {navItems.map((item) => (
          <li
            key={item.key}
            onClick={() => setActivePage(item.key)}
            className={`flex items-center gap-4 px-4 py-3 cursor-pointer rounded-lg transition ${
              activePage === item.key ? "bg-blue-500" : "hover:bg-gray-700"
            }`}
          >
            {item.icon}
            {isOpen && <span>{item.label}</span>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
