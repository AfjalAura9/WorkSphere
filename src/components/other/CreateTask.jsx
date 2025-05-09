import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";

const CreateTask = () => {
  const [userData, setUserData] = useContext(AuthContext);

  const [taskTitle, setTaskTitle] = useState("");
  const [taskDate, setTaskDate] = useState("");
  const [assignTo, setAssignTo] = useState("");
  const [category, setCategory] = useState("");
  const [taskDescription, setTaskDescription] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();

    const newTask = {
      taskTitle,
      taskDescription,
      taskDate,
      category,
      active: false,
      newTask: true,
      failed: false,
      completed: false,
    };

    const updatedUserData = userData.map((user) =>
      user.firstName === assignTo
        ? {
            ...user,
            tasks: [...user.tasks, newTask],
            taskCounts: {
              ...user.taskCounts,
              newTask: user.taskCounts.newTask + 1,
            },
          }
        : user
    );

    setUserData(updatedUserData);
    setTaskTitle("");
    setCategory("");
    setAssignTo("");
    setTaskDate("");
    setTaskDescription("");
  };

  return (
    <div className="bg-white p-8 rounded-lg mt-6 shadow-lg border-2 border-gray-300">
      <h2 className="text-xl font-bold text-gray-800 mb-6">Assign New Task</h2>
      <form onSubmit={submitHandler} className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/2 space-y-4">
          <Input
            label="Task Title"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            type="text"
            placeholder="e.g., Design Login Page"
          />
          <Input
            label="Date"
            value={taskDate}
            onChange={(e) => setTaskDate(e.target.value)}
            type="date"
          />
          <Select
            label="Assign To"
            value={assignTo}
            onChange={(e) => setAssignTo(e.target.value)}
            options={userData.map((user) => user.firstName)}
          />
          <Select
            label="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            options={["UI/UX", "Development", "Testing", "DevOps", "Security"]}
          />
        </div>

        <div className="w-full md:w-1/2 flex flex-col">
          <label className="block text-gray-800 font-medium mb-1 text-sm">
            Description
          </label>
          <textarea
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            rows={10}
            className="rounded-lg border border-gray-800 h-[210px] focus:outline-none focus:ring-2 focus:ring-blue-500 overflow-auto mb-6 p-2 bg-white"
            placeholder="Enter task description here..."
          />
          <button
            type="submit"
            className="mt-3 bg-blue-500 text-white font-medium py-3 px-6 rounded-lg hover:bg-blue-600 transition duration-300 w-full"
          >
            Assign Task
          </button>
        </div>
      </form>
    </div>
  );
};

// Input and Select components
const Input = ({ label, ...props }) => (
  <div>
    <label className="block text-sm font-medium text-gray-800 mb-1">
      {label}
    </label>
    <input
      required
      className="w-full px-4 py-3 text-sm rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      {...props}
    />
  </div>
);

const Select = ({ label, value, onChange, options }) => (
  <div>
    <label className="block text-sm font-medium text-gray-800 mb-1">
      {label}
    </label>
    <select
      required
      value={value}
      onChange={onChange}
      className="w-full px-4 py-3 text-sm rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value="" disabled>
        Select {label}
      </option>
      {options.map((option, idx) => (
        <option key={idx} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);

export default CreateTask;
