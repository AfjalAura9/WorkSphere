import React from 'react';

const BioSection = ({ user }) => {
  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold text-gray-800">About Me</h3>
      <p className="text-gray-700 mt-2">{user.bio}</p>
      <p className="text-gray-600 mt-2">Location: {user.location}</p>
      <div className="flex space-x-4 mt-2">
        <a href={user.linkedin} className="text-blue-600 hover:underline">
          LinkedIn
        </a>
        <a href={user.github} className="text-gray-800 hover:underline">
          GitHub
        </a>
      </div>
    </div>
  );
};

export default BioSection;
