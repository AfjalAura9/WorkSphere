import React, { useState, useEffect } from "react";
import axios from "axios";
import RichTextDescriptionBox from "./RichTextDescriptionBox";
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";

const CATEGORY_OPTIONS = [
  "Design",
  "Development",
  "Meeting",
  "Testing",
  "Documentation",
  "Research",
  "Other",
];

const defaultTemplate = "";

const CreateTask = ({ onTaskAssigned }) => {
  const [formState, setFormState] = useState({
    heading: "",
    description: "",
    dueDate: "",
    category: "",
    assignedTo: "",
  });
  const [employees, setEmployees] = useState([]);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchEmployees = async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/employees`
      );
      setEmployees(res.data);
    };
    fetchEmployees();
  }, []);

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
    setErrorMsg("");
    setSuccessMsg("");
  };

  const handleDescriptionChange = (value) => {
    setFormState((prev) => ({ ...prev, description: value }));
    setErrorMsg("");
    setSuccessMsg("");
  };

  // Show confirmation modal instead of submitting directly
  const submitHandler = (e) => {
    e.preventDefault();
    setShowConfirm(true);
  };

  // Actually submit after confirmation
  const confirmSubmit = async () => {
    setIsSubmitting(true);
    setSuccessMsg("");
    setErrorMsg("");
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/tasks/assign`,
        formState
      );
      setSuccessMsg("Task assigned successfully!");
      setFormState({
        heading: "",
        description: defaultTemplate,
        dueDate: "",
        category: "",
        assignedTo: "",
      });
      setShowConfirm(false);
      if (onTaskAssigned) onTaskAssigned();
    } catch (err) {
      setErrorMsg("Failed to assign task. Please check all fields.");
    }
    setIsSubmitting(false);
  };

  // Helper to get employee name
  const getEmployeeName = (id) => {
    const emp = employees.find((e) => e._id === formState.assignedTo);
    return emp ? `${emp.firstName} ${emp.lastName}` : "";
  };

  return (
    <div className="w-full min-h-[500px] mx-auto mt-6 mb-12 bg-white rounded-lg shadow-md p-8 flex flex-col border border-gray-200">
      <form
        onSubmit={submitHandler}
        className="flex flex-col md:flex-row gap-8"
      >
        {/* Left: Fields */}
        <div className="flex flex-col gap-6 w-full max-w-xs">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Heading
            </label>
            <input
              type="text"
              name="heading"
              value={formState.heading}
              onChange={handleChange}
              placeholder="Task Heading"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 transition font-sans"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Due Date
            </label>
            <input
              type="date"
              name="dueDate"
              value={formState.dueDate}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 transition font-sans"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Category
            </label>
            <select
              name="category"
              value={formState.category}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 transition font-sans"
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
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Assign To
            </label>
            <select
              name="assignedTo"
              value={formState.assignedTo}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 transition font-sans"
              required
            >
              <option value="">Select Employee</option>
              {employees.map((user) => (
                <option key={user._id || user.id} value={user._id || user.id}>
                  {user.firstName} {user.lastName} ({user.email})
                </option>
              ))}
            </select>
          </div>
        </div>
        {/* Right: Description and Button */}
        <div className="flex-1 flex flex-col">
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Description
          </label>
          <div className="border border-gray-300 rounded-xl bg-white">
            <RichTextDescriptionBox
              value={formState.description}
              onChange={handleDescriptionChange}
            />
          </div>
          <div className="flex-1" />
          <div className="mt-6 flex flex-col gap-2">
            {successMsg && (
              <div className="flex items-center justify-center gap-2 text-green-600 font-semibold text-center">
                <CheckCircleIcon className="h-5 w-5" />
                {successMsg}
              </div>
            )}
            {errorMsg && (
              <div className="flex items-center justify-center gap-2 text-red-600 font-semibold text-center">
                <ExclamationTriangleIcon className="h-5 w-5" />
                {errorMsg}
              </div>
            )}
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold text-lg shadow transition duration-300 w-full font-sans"
            >
              Assign Task
            </button>
          </div>
        </div>
      </form>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-2xl animate-fade-in">
            <div className="flex items-center gap-3 mb-4">
              <ExclamationTriangleIcon className="h-7 w-7 text-yellow-500" />
              <h2 className="bg-white rounded-lg text-xl md:text-2xl font-bold text-blue-600 mb-4 text-center">
                Assign New Task
              </h2>
            </div>
            <div className="mb-6 text-gray-600">
              Please review and edit the task details below before assigning.
              You can make changes directly here.
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                confirmSubmit();
              }}
            >
              <div className="bg-gray-50 rounded-xl p-4 mb-4 border border-gray-200 shadow-inner flex flex-col md:flex-row gap-6">
                {/* Left: Fields */}
                <div className="flex-1 flex flex-col gap-3 min-w-[200px]">
                  <div className="flex flex-col">
                    <label className="font-semibold text-gray-700 mb-1">
                      Heading:
                    </label>
                    <input
                      type="text"
                      className="px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400 transition"
                      value={formState.heading}
                      onChange={(e) =>
                        setFormState((f) => ({ ...f, heading: e.target.value }))
                      }
                      required
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="font-semibold text-gray-700 mb-1">
                      Due Date:
                    </label>
                    <input
                      type="date"
                      className="px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400 transition"
                      value={formState.dueDate}
                      onChange={(e) =>
                        setFormState((f) => ({ ...f, dueDate: e.target.value }))
                      }
                      required
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="font-semibold text-gray-700 mb-1">
                      Category:
                    </label>
                    <select
                      className="px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400 transition"
                      value={formState.category}
                      onChange={(e) =>
                        setFormState((f) => ({
                          ...f,
                          category: e.target.value,
                        }))
                      }
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
                  <div className="flex flex-col">
                    <label className="font-semibold text-gray-700 mb-1">
                      Assign To:
                    </label>
                    <select
                      className="px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400 transition"
                      value={formState.assignedTo}
                      onChange={(e) =>
                        setFormState((f) => ({
                          ...f,
                          assignedTo: e.target.value,
                        }))
                      }
                      required
                    >
                      <option value="">Select Employee</option>
                      {employees.map((user) => (
                        <option
                          key={user._id || user.id}
                          value={user._id || user.id}
                        >
                          {user.firstName} {user.lastName}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                {/* Right: Description */}
                <div className="w-[400px] max-w-full flex flex-col">
                  <label className="font-semibold text-gray-700 mb-1">
                    Description:
                  </label>
                  <RichTextDescriptionBox
                    value={formState.description}
                    onChange={(val) =>
                      setFormState((f) => ({ ...f, description: val }))
                    }
                  />
                </div>
              </div>
              <div className="flex gap-4 mt-6 justify-end">
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold shadow transition"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Assigning..." : "Confirm & Assign"}
                </button>
                <button
                  type="button"
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-2 rounded-lg font-semibold shadow transition"
                  onClick={() => setShowConfirm(false)}
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <style>
        {`
          .animate-fade-in {
            animation: fadeIn 0.25s ease;
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px);}
            to { opacity: 1; transform: translateY(0);}
          }
        `}
      </style>
    </div>
  );
};

export default CreateTask;
