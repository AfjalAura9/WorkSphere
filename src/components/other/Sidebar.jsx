import React, { useRef } from "react";
import {
  FiUserPlus,
  FiClipboard,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";

const Sidebar = ({
  activePage,
  setActivePage,
  isOpen,
  setIsOpen,
  sidebarWidth,
  setSidebarWidth,
  defaultWidth = 192,
  collapsedWidth = 64,
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

  const dragging = useRef(false);

  const handleMouseDown = (e) => {
    dragging.current = true;
    document.body.style.cursor = "ew-resize";
    e.preventDefault();
  };

  const handleMouseMove = (e) => {
    if (dragging.current) {
      const newWidth = Math.max(collapsedWidth, Math.min(320, e.clientX));
      setSidebarWidth(newWidth);
      setIsOpen(newWidth > (defaultWidth + collapsedWidth) / 2);
    }
  };

  const handleMouseUp = () => {
    if (dragging.current) {
      dragging.current = false;
      document.body.style.cursor = "";
    }
  };

  React.useEffect(() => {
    if (dragging.current) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      };
    }
  });

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
        className={`
          fixed top-0 left-0 h-full bg-gradient-to-b from-gray-800 to-gray-900 z-40
          transition-all duration-300 shadow-2xl flex flex-col
        `}
        style={{
          width: sidebarWidth,
          minWidth: collapsedWidth,
          maxWidth: 320,
        }}
      >
        {/* Navigation Items at the top, left-aligned */}
        <ul className="mt-6 flex flex-col items-start space-y-2">
          {navItems.map((item) => (
            <li
              key={item.key}
              onClick={() => setActivePage(item.key)}
              title={item.label}
              className={`
                flex items-center w-full cursor-pointer font-semibold text-lg transition-all duration-200 whitespace-nowrap
                ${
                  activePage === item.key
                    ? "bg-blue-600 text-white shadow"
                    : "text-blue-100 hover:bg-blue-100 hover:text-blue-800"
                }
                ${isOpen ? "px-3 py-3 gap-3" : "p-3 justify-center"}
              `}
              style={{ userSelect: "none" }}
            >
              <span className="flex items-center">{item.icon}</span>
              {isOpen && <span className="ml-3">{item.label}</span>}
            </li>
          ))}
        </ul>
        {/* Collapse/Expand Button at the bottom, centered in a box */}
        <div className="mt-auto flex justify-center items-center pb-4">
          <div className="bg-white shadow px-2 py-2 flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-blue-700 hover:text-blue-900 transition"
              aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
              style={{ outline: "none", display: "flex", alignItems: "center" }}
            >
              {isOpen ? (
                <FiChevronLeft size={24} />
              ) : (
                <FiChevronRight size={24} />
              )}
            </button>
          </div>
        </div>
        {/* Drag handle */}
        <div
          className="absolute top-0 right-0 h-full w-3 cursor-ew-resize z-50"
          onMouseDown={handleMouseDown}
          style={{ background: "transparent" }}
        ></div>
      </aside>
    </>
  );
};

export default Sidebar;
