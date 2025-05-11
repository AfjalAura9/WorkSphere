import React, { useState } from "react";
import Header from "../other/Header";
import TaskListNumbers from "../other/TaskListNumbers";
import TaskList from "../TaskList/TaskList";

const EmployeeDashboard = ({ changeUser, data }) => {
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [tasks, setTasks] = useState(data.tasks);
  const [taskCounts, setTaskCounts] = useState(data.taskCounts);

  const updateTaskStatus = (taskId, newStatus) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              newTask: newStatus === "newTask",
              active: newStatus === "active",
              completed: newStatus === "completed",
              failed: newStatus === "failed",
            }
          : task
      )
    );

    setTaskCounts((prevCounts) => {
      const updatedCounts = { ...prevCounts };

      // Decrement count from previous status
      const task = tasks.find((t) => t.id === taskId);
      if (task.newTask) updatedCounts.newTask -= 1;
      if (task.active) updatedCounts.active -= 1;
      if (task.completed) updatedCounts.completed -= 1;
      if (task.failed) updatedCounts.failed -= 1;

      // Increment count for new status
      updatedCounts[newStatus] += 1;

      return updatedCounts;
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <Header changeUser={changeUser} data={data} />
      <TaskListNumbers
        taskCounts={taskCounts}
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
      />
      <TaskList
        tasks={tasks}
        selectedFilter={selectedFilter}
        updateTaskStatus={updateTaskStatus}
      />
    </div>
  );
};

export default EmployeeDashboard;
