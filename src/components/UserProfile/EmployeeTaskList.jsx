// src/components/UserProfile/EmployeeTaskList.jsx
import React from 'react';

const EmployeeTaskList = ({ tasks }) => {
  return (
    <div>
      <h2>Employee View of Active Tasks</h2>
      {/* Render tasks with employee-specific details */}
      {tasks.map((task) => (
        <div key={task.id}>
          <h3>{task.title}</h3>
          {/* Add more employee-specific details here */}
        </div>
      ))}
    </div>
  );
};

export default EmployeeTaskList;
