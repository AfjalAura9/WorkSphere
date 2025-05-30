import React from "react";

const ProfileMenuDropdown = ({
  isOpen,
  onClose,
  userData,
  onProfile,
  logOutUser,
}) => {
  if (!isOpen) return null;

  return (
    <div className="absolute right-4 top-20 bg-white shadow-lg rounded-lg p-4 min-w-[220px] z-50">
      <div className="flex items-center gap-3 mb-2">
        <img
          src={userData.profilePic || "/default-profile.png"}
          alt="User"
          className="w-10 h-10 rounded-full border object-cover"
        />
        <div>
          <div className="font-semibold">
            {userData.firstName} {userData.lastName}
          </div>
          <div className="text-xs text-gray-500">{userData.email}</div>
        </div>
      </div>
      <hr className="my-2" />
      <button
        className="block w-full text-left px-2 py-1 hover:bg-gray-100 rounded"
        onClick={onProfile}
      >
        View Profile
      </button>
      <button
        className="block w-full text-left px-2 py-1 hover:bg-gray-100 rounded text-red-600"
        onClick={logOutUser}
      >
        Log Out
      </button>
      <button
        className="block w-full text-left px-2 py-1 hover:bg-gray-100 rounded text-gray-500"
        onClick={onClose}
      >
        Close
      </button>
    </div>
  );
};

export default ProfileMenuDropdown;
