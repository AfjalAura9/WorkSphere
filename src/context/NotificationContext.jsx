import React, { createContext, useState, useEffect } from "react";
import Notification from "../components/common/Notification";

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState(() => {
    const stored = localStorage.getItem("notifications");
    return stored ? JSON.parse(stored) : [];
  });
  const [popupMessage, setPopupMessage] = useState(null);

  useEffect(() => {
    localStorage.setItem("notifications", JSON.stringify(notifications));
  }, [notifications]);

  const addNotification = (notif) => {
    setNotifications((prev) => [
      { ...notif, id: Date.now(), read: false },
      ...prev,
    ]);
    setPopupMessage(notif.message); // Trigger pop-up
  };

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  return (
    <NotificationContext.Provider
      value={{ notifications, addNotification, markAllRead, markAsRead }}
    >
      {children}
      {popupMessage && (
        <Notification
          message={popupMessage}
          onClose={() => setPopupMessage(null)}
        />
      )}
    </NotificationContext.Provider>
  );
};
