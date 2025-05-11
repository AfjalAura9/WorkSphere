import React from "react";
import AcceptTask from "./AcceptTask";
import NewTask from "./NewTask";
import CompleteTask from "./CompleteTask";
import FailedTask from "./FailedTask";

const TaskList = ({ tasks, selectedFilter, updateTaskStatus }) => {
  const filterTasks = (tasks) => {
    switch (selectedFilter) {
      case "New Tasks":
        return tasks.filter((task) => task.newTask);
      case "Completed":
        return tasks.filter((task) => task.completed);
      case "Accepted":
        return tasks.filter((task) => task.active);
      case "Failed":
        return tasks.filter((task) => task.failed);
      default:
        return tasks;
    }
  };

  const filteredTasks = filterTasks(tasks);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredTasks.map((task) => {
        if (task.active)
          return (
            <AcceptTask
              key={task.id}
              data={task}
              updateTaskStatus={updateTaskStatus}
            />
          );
        if (task.newTask)
          return (
            <NewTask
              key={task.id}
              data={task}
              updateTaskStatus={updateTaskStatus}
            />
          );
        if (task.completed)
          return <CompleteTask key={task.id} data={task} />;
        if (task.failed) return <FailedTask key={task.id} data={task} />;
        return null;
      })}
    </div>
  );
};

export default TaskList;
