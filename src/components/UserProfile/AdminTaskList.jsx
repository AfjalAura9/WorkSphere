// src/components/TaskList/AdminTaskList.jsx
import React from 'react';

const AdminTaskList = ({ tasks = [] }) => {
  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Assigned Tasks</h2>
      <ul className="space-y-2">
        {tasks.map((task) => (
          <li key={task.id} className="border p-3 rounded">
            <div className="font-medium">{task.title}</div>
            <div>Status: {task.status}</div>
            <div>Due: {task.dueDate}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminTaskList;
