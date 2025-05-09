// src/components/UserProfile/UserTaskDetails.jsx
import React from 'react';
import TaskListByStatus from './TaskListByStatus';
import AdminTaskList from '../TaskList/AdminTaskList';

const UserTaskDetails = ({ user }) => {
  const role = user?.role || 'employee'; // default to 'employee' if role is undefined

  return (
    <div className="mt-6">
      {role === 'admin' ? (
        <AdminTaskList tasks={user.assignedTasks} />
      ) : (
        <TaskListByStatus tasks={user.activeTasks} />
      )}
    </div>
  );
};

export default UserTaskDetails;
