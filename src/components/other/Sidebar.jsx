import React from "react";
import { FiUserPlus, FiClipboard } from "react-icons/fi";

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
    <aside
      className={`fixed top-0 left-0 h-full bg-white text-gray-800 z-40 transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0 transition-transform duration-300 w-64 shadow-lg`}
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
                activePage === item.key
                  ? "bg-blue-100 text-blue-600 font-semibold"
                  : "hover:bg-gray-100"
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </li>
          ))}
        </ul>

        {/* Log Out Button */}
        <div className="p-4">
          <button
            onClick={logOutUser}
            className="w-full bg-red-500 text-white text-sm py-2 px-4 rounded-lg hover:bg-red-600 transition"
          >
            Log Out
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
