import React from "react";
import { FiUserPlus, FiClipboard } from "react-icons/fi";

const Sidebar = ({ activePage, setActivePage, isOpen, setIsOpen }) => {
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
                <span>{item.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
