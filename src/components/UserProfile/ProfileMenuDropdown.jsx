import React from "react";
import { FiLogOut } from "react-icons/fi";

const ProfileMenuDropdown = ({
  isOpen,
  onClose,
  userData,
  onProfile,
  logOutUser,
  anchorRef,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-lg z-50 border border-gray-100"
      style={{ minWidth: 320 }}
      tabIndex={-1}
    >
      <button
        className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl"
        onClick={onClose}
        aria-label="Close"
        type="button"
      >
        &times;
      </button>
      <div className="flex flex-col items-center pt-8 pb-4">
        <img
          src={userData?.profilePic || "/default-profile.png"}
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover"
        />
        <div className="mt-4 text-center">
          <div className="text-xl font-semibold text-gray-800">
            {userData?.firstName || "Your name"}
          </div>
          <div className="text-gray-400 text-sm">
            {userData?.email || "yourname@gmail.com"}
          </div>
        </div>
      </div>
      <hr className="my-4 border-gray-200" />
      <div className="px-6 pb-6">
        <button
          className="flex items-center w-full px-4 py-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition mb-2"
          onClick={onProfile}
        >
          <svg
            className="w-6 h-6 text-gray-700 mr-3"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <circle cx="12" cy="8" r="4" />
            <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
          </svg>
          <span className="text-lg font-medium text-gray-800">My Profile</span>
          <svg
            className="ml-auto w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
        <button
          onClick={() => {
            if (typeof logOutUser === "function") {
              logOutUser();
            } else {A
              window.location.href = "/login";
            }
          }}
          className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg shadow transition"
        >
          <FiLogOut size={18} />
          Log Out
        </button>
      </div>
    </div>
  );
};

export default ProfileMenuDropdown;
