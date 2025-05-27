import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import axios from "axios";

const CATEGORY_OPTIONS = [
  "Design",
  "Development",
  "Meeting",
  "Testing",
  "Documentation",
  "Research",
  "Other",
];

const CreateTask = () => {
  const [userData] = useContext(AuthContext);
  const [formState, setFormState] = useState({
    title: "",
    description: "",
    dueDate: "",
    category: "",
    assignedTo: "",
  });
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
    setErrorMsg("");
    setSuccessMsg("");
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/tasks/assign`,
        formState
      );
      setSuccessMsg("Task assigned successfully!");
      setFormState({
        title: "",
        description: "",
        dueDate: "",
        category: "",
        assignedTo: "",
      });
    } catch (err) {
      setErrorMsg("Failed to assign task. Please check all fields.");
    }
  };

  return (
    <div className="w-full mx-auto mt-10 mb-12 bg-white rounded-2xl shadow-2xl p-10 flex flex-col">
      <h2 className="text-3xl font-extrabold text-blue-900 mb-8 text-center tracking-wide">
        Assign New Task
      </h2>
      <form
        onSubmit={submitHandler}
        className="flex flex-col md:flex-row gap-10"
      >
        {/* Left Side: Fields */}
        <div className="flex flex-col gap-7 w-full md:w-1/2">
          <div>
            <label className="block text-base font-semibold text-gray-700 mb-2">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formState.title}
              onChange={handleChange}
              className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 transition text-lg"
              placeholder="Task Title"
              required
            />
          </div>
          <div>
            <label className="block text-base font-semibold text-gray-700 mb-2">
              Due Date
            </label>
            <input
              type="date"
              name="dueDate"
              value={formState.dueDate}
              onChange={handleChange}
              className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 transition text-lg"
              required
            />
          </div>
          <div>
            <label className="block text-base font-semibold text-gray-700 mb-2">
              Category
            </label>
            <select
              name="category"
              value={formState.category}
              onChange={handleChange}
              className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 transition text-lg"
              required
            >
              <option value="">Select Category</option>
              {CATEGORY_OPTIONS.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-base font-semibold text-gray-700 mb-2">
              Assign To
            </label>
            <select
              name="assignedTo"
              value={formState.assignedTo}
              onChange={handleChange}
              className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 transition text-lg"
              required
            >
              <option value="">Select Employee</option>
              {userData.map((user) => (
                <option key={user._id || user.id} value={user._id || user.id}>
                  {user.firstName} {user.lastName} ({user.email})
                </option>
              ))}
            </select>
          </div>
        </div>
        {/* Right Side: Description */}
        <div className="flex-1 flex flex-col">
          <label className="block text-base font-semibold text-gray-700 mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={formState.description}
            onChange={handleChange}
            placeholder="Task Description"
            className="w-full h-full min-h-[220px] px-5 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 transition text-lg resize-none"
            required
          />
          <div className="mt-6 flex flex-col gap-2">
            {successMsg && (
              <div className="text-green-600 font-semibold text-center">
                {successMsg}
              </div>
            )}
            {errorMsg && (
              <div className="text-red-600 font-semibold text-center">
                {errorMsg}
              </div>
            )}
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold text-lg shadow transition duration-300 w-full"
            >
              Assign Task
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateTask;
