import React, { useState } from "react";
import axios from "axios";

const statusColors = {
  new: "bg-blue-100 border-blue-400",
  newTask: "bg-blue-100 border-blue-400",
  active: "bg-yellow-100 border-yellow-400",
  completed: "bg-green-100 border-green-400",
  failed: "bg-red-100 border-red-400",
};

const statusLabels = {
  new: "New",
  newTask: "New",
  active: "Active",
  completed: "Completed",
  failed: "Failed",
};

const AdminTaskList = ({ tasks = [], onTaskUpdated }) => {
  const [editTask, setEditTask] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [deleteId, setDeleteId] = useState(null);

  // Handle Edit
  const openEdit = (task) => {
    setEditTask(task);
    setEditForm({
      title: task.title,
      description: task.description,
      dueDate: task.dueDate ? task.dueDate.slice(0, 10) : "",
      category: task.category,
    });
  };
  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };
  const submitEdit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/tasks/${editTask._id}`, editForm);
      setEditTask(null);
      if (onTaskUpdated) onTaskUpdated();
    } catch (err) {
      console.error("Failed to update task:", err);
      alert("Failed to update task. Please try again.");
    }
  };

  // Handle Delete
  const confirmDelete = async () => {
    try {
      console.log("Deleting task with ID:", deleteId); // Debugging
      await axios.delete(`/api/tasks/${deleteId}`);
      setDeleteId(null);
      if (onTaskUpdated) onTaskUpdated(); // Notify parent to refresh tasks
    } catch (err) {
      console.error("Failed to delete task:", err);
      alert("Failed to delete task. Please try again.");
    }
  };

  // Handle Remind
  const handleRemind = async (task) => {
    try {
      console.log("Sending reminder for task:", task._id); // Debugging
      await axios.post(`/api/tasks/${task._id}/remind`);
      alert("Reminder sent!");
      if (onTaskUpdated) onTaskUpdated();
    } catch (err) {
      console.error("Failed to send reminder:", err);
      alert("Failed to send reminder. Please try again.");
    }
  };

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        Assigned Tasks
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tasks.length === 0 && (
          <div className="col-span-full text-gray-500 text-center py-8">
            No tasks assigned.
          </div>
        )}
        {tasks.map((task, index) => {
          const status = task.status || "new";
          const color = statusColors[status] || "bg-gray-100 border-gray-300";
          const label = statusLabels[status] || status;

          return (
            <div
              key={task._id || task.id || index}
              className={`min-w-[300px] ${color} border-l-4 p-6 rounded-lg shadow-lg flex flex-col justify-between`}
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-semibold uppercase tracking-wide text-gray-600">
                  {task.category || "General"}
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold ${
                    status === "completed"
                      ? "bg-green-500 text-white"
                      : status === "active"
                      ? "bg-yellow-400 text-white"
                      : status === "failed"
                      ? "bg-red-500 text-white"
                      : "bg-blue-500 text-white"
                  }`}
                >
                  {label}
                </span>
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-1">
                {task.title || "No Title"}
              </h3>
              <p className="text-sm text-gray-700 mb-3">
                {task.description || "No description provided."}
              </p>
              <div className="flex justify-between items-center text-xs text-gray-500 mt-auto">
                <span>
                  Due:{" "}
                  {task.dueDate
                    ? new Date(task.dueDate).toLocaleDateString()
                    : "N/A"}
                </span>
                <span>
                  Task ID:{" "}
                  <span className="font-mono">
                    {task._id?.toString().slice(-6) || "N/A"}
                  </span>
                </span>
              </div>
              <div className="flex gap-2 mt-4">
                <button
                  className="bg-yellow-500 text-white px-3 py-1 rounded text-xs"
                  onClick={() => openEdit(task)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded text-xs"
                  onClick={() => setDeleteId(task._id)}
                >
                  Delete
                </button>
                <button
                  className="bg-blue-500 text-white px-3 py-1 rounded text-xs"
                  onClick={() => handleRemind(task)}
                >
                  Send a Reminder
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Edit Modal */}
      {editTask && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <form
            onSubmit={submitEdit}
            className="bg-white p-6 rounded shadow-lg w-full max-w-md"
          >
            <h3 className="text-lg font-bold mb-4">Edit Task</h3>
            <input
              type="text"
              name="title"
              value={editForm.title}
              onChange={handleEditChange}
              placeholder="Title"
              className="w-full mb-2 p-2 border rounded"
              required
            />
            <textarea
              name="description"
              value={editForm.description}
              onChange={handleEditChange}
              placeholder="Description"
              className="w-full mb-2 p-2 border rounded"
              required
            />
            <input
              type="date"
              name="dueDate"
              value={editForm.dueDate}
              onChange={handleEditChange}
              className="w-full mb-2 p-2 border rounded"
              required
            />
            <input
              type="text"
              name="category"
              value={editForm.category}
              onChange={handleEditChange}
              placeholder="Category"
              className="w-full mb-2 p-2 border rounded"
              required
            />
            <div className="flex gap-2 mt-2">
              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                Save
              </button>
              <button
                type="button"
                className="bg-gray-400 text-white px-4 py-2 rounded"
                onClick={() => setEditTask(null)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Delete Confirm Modal */}
      {deleteId && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-xs">
            <h3 className="text-lg font-bold mb-4">Delete Task?</h3>
            <p className="mb-4">Are you sure you want to delete this task?</p>
            <div className="flex gap-2">
              <button
                className="bg-red-600 text-white px-4 py-2 rounded"
                onClick={confirmDelete}
              >
                Delete
              </button>
              <button
                className="bg-gray-400 text-white px-4 py-2 rounded"
                onClick={() => setDeleteId(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminTaskList;
