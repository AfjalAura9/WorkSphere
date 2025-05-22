import React from "react";

const Notification = ({ message, onClose }) => (
  <div className="fixed top-6 right-6 z-50 bg-blue-600 text-white px-6 py-4 rounded shadow-lg flex items-center gap-4">
    <span>{message}</span>
    <button onClick={onClose} className="ml-4 text-white font-bold text-lg">
      &times;
    </button>
  </div>
);

export default Notification;
