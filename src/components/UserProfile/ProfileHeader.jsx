import React from "react";

const ProfileHeader = ({ user }) => {
  return (
    <div className="flex flex-col sm:flex-row items-center sm:space-x-6 space-y-4 sm:space-y-0">
      <img
        src="../../../public/Logo.png"
        alt="User Avatar"
        className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 border-gray-300"
      />
      <div className="text-center sm:text-left">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
          {user.firstName} {user.lastName}
        </h2>
        <p className="text-gray-600">{user.role}</p>
        <p className="text-gray-500">{user.email}</p>
      </div>
    </div>
  );
};

export default ProfileHeader;
