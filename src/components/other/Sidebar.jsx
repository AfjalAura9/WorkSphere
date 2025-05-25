import React from "react";
import { FiUserPlus, FiClipboard } from "react-icons/fi";

const Sidebar = ({ activePage, setActivePage }) => (
  <aside
    className="bg-gray-900 text-white h-screen w-56 fixed md:static top-0 left-0 z-40 flex flex-col transition-all duration-300
    md:w-56 w-4/5 sm:w-1/2"
  >
    <div className="flex flex-col h-full pt-8">
      <ul className="space-y-4 flex-1">
        <li
          onClick={() => setActivePage("assign-task")}
          className={`flex items-center gap-4 px-4 py-3 cursor-pointer rounded-lg transition ${
            activePage === "assign-task" ? "bg-blue-500" : "hover:bg-gray-700"
          }`}
        >
          <FiClipboard size={20} />
          <span className="hidden sm:inline">Assign Task</span>
        </li>
        <li
          onClick={() => setActivePage("manage-users")}
          className={`flex items-center gap-4 px-4 py-3 cursor-pointer rounded-lg transition ${
            activePage === "manage-users" ? "bg-blue-500" : "hover:bg-gray-700"
          }`}
        >
          <FiUserPlus size={20} />
          <span className="hidden sm:inline">Manage Users</span>
        </li>
      </ul>
    </div>
  </aside>
);

export default Sidebar;
