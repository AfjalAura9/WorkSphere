import React from "react";
import { FiUserPlus, FiClipboard, FiLogOut } from "react-icons/fi";

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
      className={`fixed top-0 left-0 h-full bg-gradient-to-b from-blue-900 to-blue-800 text-white z-40 transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0 transition-transform duration-300 w-64 shadow-xl`}
    >
      <div className="flex flex-col h-full pt-8">
        <ul className="space-y-2 flex-1">
          {navItems.map((item) => (
            <li
              key={item.key}
              onClick={() => {
                setActivePage(item.key);
                setIsOpen(false);
              }}
              className={`flex items-center gap-4 px-6 py-3 cursor-pointer rounded-lg font-semibold text-base transition
                ${
                  activePage === item.key
                    ? "bg-blue-700 text-white border-l-4 border-blue-400 shadow"
                    : "hover:bg-blue-800 hover:text-blue-200 text-blue-200"
                }
              `}
            >
              {item.icon}
              <span>{item.label}</span>
            </li>
          ))}
        </ul>
        {/* Logout: only on mobile */}
        <div className="p-6 md:hidden">
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
  );
};

export default Sidebar;
