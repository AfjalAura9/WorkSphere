import React from 'react';
import AcceptTask from '../TaskList/AcceptTask';
import CompleteTask from '../TaskList/CompleteTask';
import FailedTask from '../TaskList/FailedTask';

const TaskListByStatus = ({ tasks = [], status }) => {
  const filteredTasks = tasks.filter((task) => {
    if (status === 'active') return task.active;
    if (status === 'completed') return task.completed;
    if (status === 'failed') return task.failed;
    return false;
  });

  const renderTaskComponent = (task, idx) => {
    if (status === 'active') return <AcceptTask key={idx} data={task} />;
    if (status === 'completed') return <CompleteTask key={idx} data={task} />;
    if (status === 'failed') return <FailedTask key={idx} data={task} />;
    return null;
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredTasks.length > 0 ? (
        filteredTasks.map((task, idx) => renderTaskComponent(task, idx))
      ) : (
        <p className="text-gray-600">No tasks found for this status.</p>
      )}
    </div>
  );
};

export default TaskListByStatus;
