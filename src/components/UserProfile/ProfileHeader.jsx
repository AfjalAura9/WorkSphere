import React from 'react';

const ProfileHeader = ({ user }) => {
  return (
    <div className="flex items-center space-x-6">
      <img
        src="../../../public/Logo.png"
        alt="User Avatar"
        className="w-24 h-24 rounded-full border-2 border-gray-300"
      />
      <div>
        <h2 className="text-2xl font-bold text-gray-800">
          {user.firstName} {user.lastName}
        </h2>
        <p className="text-gray-600">{user.role}</p>
        <p className="text-gray-500">{user.email}</p>
      </div>
    </div>
  );
};

export default ProfileHeader;
