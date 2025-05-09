// src/components/UserProfile/UserProfile.jsx
import React from 'react';
import ProfileHeader from './ProfileHeader';
import BioSection from './BioSection';
import StatsOverview from './StatsOverview';
import SkillsEndorsements from './SkillsEndorsements';
import AdminTaskList from './AdminTaskList';
import EmployeeTaskList from './EmployeeTaskList';

const UserProfile = ({ user = {}, isAdmin }) => {
  return (
    <div className="p-6 rounded-lg mt-6 shadow-lg border-2 border-gray-300">
      <ProfileHeader user={user} />
      {/* <BioSection user={user} />
      <StatsOverview stats={user.stats} /> */}
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
