import React from "react";
import AcceptTask from "./AcceptTask";
import NewTask from "./NewTask";
import CompleteTask from "./CompleteTask";
import FailedTask from "./FailedTask";

const TaskList = ({ tasks, selectedFilter, updateTaskStatus = () => {} }) => {
  // Map filter keys to status values
  const statusMap = {
    new: "new",
    active: "active",
    completed: "completed",
    failed: "failed",
    All: "all",
  };

  // Filter tasks based on selected filter
  const filteredTasks =
    selectedFilter === "All"
      ? tasks
      : tasks.filter(
          (task) =>
            task.status === statusMap[selectedFilter] ||
            task.status === selectedFilter
        );

  // Sort tasks by due date (soonest first, empty dueDate last)
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (!a.dueDate) return 1;
    if (!b.dueDate) return -1;
    return new Date(a.dueDate) - new Date(b.dueDate);
  });

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold text-gray-700 mb-6">
        {selectedFilter === "All" ? "All Tasks" : selectedFilter + " Tasks"}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {sortedTasks.length === 0 ? (
          <div className="col-span-full text-center text-gray-400 py-8">
            No tasks found.
          </div>
        ) : (
          sortedTasks.map((task) => {
            if (task.status === "active")
              return (
                <AcceptTask
                  key={task._id}
                  data={task}
                  updateTaskStatus={updateTaskStatus}
                />
              );
            if (task.status === "new")
              return (
                <NewTask
                  key={task._id}
                  data={task}
                  updateTaskStatus={updateTaskStatus}
                />
              );
            if (task.status === "completed")
              return <CompleteTask key={task._id} data={task} />;
            if (task.status === "failed")
              return <FailedTask key={task._id} data={task} />;
            return null;
          })
        )}
      </div>
    </div>
  );
};

export default TaskList;
