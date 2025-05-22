import React, { useContext, useState } from "react";
import { NotificationContext } from "../../context/NotificationContext";

const NotificationBell = () => {
  const { notifications, markAllRead, markAsRead } =
    useContext(NotificationContext);
  const [open, setOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleOpen = () => {
    setOpen(!open);
    if (!open) markAllRead();
  };

  return (
    <div className="relative">
      <button
        className="relative focus:outline-none"
        onClick={handleOpen}
        aria-label="Notifications"
      >
        {/* SVG Bell Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 text-blue-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          />
        </svg>
        {/* Red Dot for Unread Notifications */}
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-3 h-3"></span>
        )}
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-80 bg-white shadow-lg rounded-lg z-50 max-h-96 overflow-y-auto">
          <div className="p-4 border-b font-bold text-gray-700 flex justify-between items-center">
            <span>Notifications</span>
            <button
              className="text-blue-600 text-xs underline"
              onClick={markAllRead}
            >
              Mark all as read
            </button>
          </div>
          {notifications.length === 0 ? (
            <div className="p-4 text-gray-400 text-center">
              No notifications
            </div>
          ) : (
            notifications.map((notif) => (
              <div
                key={notif.id}
                className={`p-4 border-b last:border-b-0 flex justify-between items-center ${
                  notif.read ? "bg-white" : "bg-blue-50"
                }`}
              >
                <div>
                  <div className="font-medium">
                    {notif.title || "Notification"}
                  </div>
                  <div className="text-sm text-gray-600">{notif.message}</div>
                  <div className="text-xs text-gray-400 mt-1">
                    {notif.time
                      ? new Date(notif.time).toLocaleString()
                      : new Date(notif.id).toLocaleString()}
                  </div>
                </div>
                {!notif.read && (
                  <button
                    className="ml-4 text-blue-500 text-xs underline"
                    onClick={() => markAsRead(notif.id)}
                  >
                    Mark as read
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
