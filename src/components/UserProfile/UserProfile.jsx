// src/components/UserProfile/UserProfile.jsx
import React, { useState } from "react";
import ProfileHeader from "./ProfileHeader";
import SkillsEndorsements from "./SkillsEndorsements";
import AdminTaskList from "./AdminTaskList";
import EmployeeTaskList from "./EmployeeTaskList";
import axios from "axios";

const UserProfile = ({ user = {}, isAdmin, onBack, onTaskChanged }) => {
  const [currentUser, setCurrentUser] = useState(user);

  // Refresh user data after task update
  const refreshUser = async () => {
    const res = await axios.get(`/api/employees/${user._id || user.id}`);
    setCurrentUser(res.data);
    if (onTaskChanged) onTaskChanged();
  };

  const handleBack = onBack || (() => window.history.back());

  return (
    <div className="p-6 rounded-lg mt-6 shadow-lg border-2 border-gray-300">
      <button
        onClick={handleBack}
        className="mb-4 text-blue-500 hover:underline"
      >
        ← Back
      </button>
      <ProfileHeader user={currentUser} />
      <SkillsEndorsements skills={currentUser.skills} />
      {isAdmin ? (
        <AdminTaskList tasks={currentUser.tasks} onTaskUpdated={refreshUser} />
      ) : (
        <EmployeeTaskList tasks={currentUser.tasks} />
      )}
    </div>
  );
};

export default UserProfile;
