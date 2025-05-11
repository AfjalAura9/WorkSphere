// src/components/UserProfile/UserProfile.jsx
import React from 'react';
import useGoBack from '../../hooks/useGoBack';
import ProfileHeader from './ProfileHeader';
import SkillsEndorsements from './SkillsEndorsements';
import AdminTaskList from './AdminTaskList';
import EmployeeTaskList from './EmployeeTaskList';

const UserProfile = ({ user = {}, isAdmin }) => {
  const goBack = useGoBack('/create-task'); // Updated fallback route

  return (
    <div className="p-6 rounded-lg mt-6 shadow-lg border-2 border-gray-300">
      <button onClick={goBack} className="mb-4 text-blue-500 hover:underline">
        ← Back
      </button>
      <ProfileHeader user={user} />
      <SkillsEndorsements skills={user.skills} />
      {isAdmin ? (
        <AdminTaskList tasks={user.tasks} />
      ) : (
        <EmployeeTaskList tasks={user.tasks} />
      )}
    </div>
  );
};

export default UserProfile;
