import React from 'react';

const StatsOverview = ({ stats = {} }) => {
  const {
    projectsCompleted = 0,
    ongoingProjects = 0,
    experience = 0,
  } = stats;

  return (
    <div className="grid grid-cols-3 gap-4 mt-6">
      <div className="bg-blue-100 p-4 rounded-lg text-center">
        <p className="text-2xl font-bold text-blue-600">{projectsCompleted}</p>
        <p className="text-gray-700">Projects Completed</p>
      </div>
      <div className="bg-yellow-100 p-4 rounded-lg text-center">
        <p className="text-2xl font-bold text-yellow-600">{ongoingProjects}</p>
        <p className="text-gray-700">Ongoing Projects</p>
      </div>
      <div className="bg-green-100 p-4 rounded-lg text-center">
        <p className="text-2xl font-bold text-green-600">{experience} yrs</p>
        <p className="text-gray-700">Experience</p>
      </div>
    </div>
  );
};

export default StatsOverview;
