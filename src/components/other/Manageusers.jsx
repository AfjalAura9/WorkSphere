import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";
import Modal from "../common/Modal";
import ConfirmModal from "../common/ConfirmModal";
import axios from "axios";

const ManageUsers = ({ onBack }) => {
  const [userData, setUserData] = useContext(AuthContext);
  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const refreshUsers = async () => {
    try {
      const response = await axios.get("/api/employees");
      setUserData(response.data);
    } catch (err) {
      console.error("Failed to refresh users:", err);
    }
  };

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
    setErrorMessage("");
  };

  const resetForm = () => {
    setFormState({ firstName: "", lastName: "", email: "" });
    setEditId(null);
    setIsModalOpen(false);
    setErrorMessage("");
  };

  const handleAddUser = async () => {
    const duplicateUser = userData.find(
      (user) => user.email.toLowerCase() === formState.email.toLowerCase()
    );
    if (duplicateUser) {
      setErrorMessage("User with this email already exists.");
      return;
    }
    try {
      await axios.post("/api/employees", {
        ...formState,
        password: "123",
        taskCounts: {
          active: 0,
          newTask: 0,
          completed: 0,
          failed: 0,
        },
        tasks: [],
      });
      await refreshUsers();
      resetForm();
    } catch (err) {
      setErrorMessage("Failed to add user.");
    }
  };

  const handleEdit = (user) => {
    setFormState({
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      email: user.email || "",
    });
    setEditId(user._id || user.id);
    setIsModalOpen(true);
  };

  const handleUpdateUser = async () => {
    try {
      await axios.put(`/api/employees/${editId}`, formState);
      await refreshUsers();
      resetForm();
    } catch (err) {
      setErrorMessage("Failed to update user.");
    }
  };

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setIsConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`/api/employees/${deleteId}`);
      await refreshUsers();
      setIsConfirmOpen(false);
      setDeleteId(null);
    } catch (err) {
      setErrorMessage("Failed to delete user.");
    }
  };

  const handleCancelDelete = () => {
    setIsConfirmOpen(false);
    setDeleteId(null);
  };

  const filteredUsers = userData.filter((user) => {
    const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
    const email = user.email.toLowerCase();
    const term = searchTerm.toLowerCase();
    return fullName.includes(term) || email.includes(term);
  });

  return (
    <div className="p-8 bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 min-h-screen rounded-lg shadow-lg">
      <button
        className="mb-6 text-blue-600 hover:underline font-semibold text-lg"
        onClick={onBack}
      >
        ← Back
      </button>
      <div className="bg-white rounded-xl shadow-lg p-8 mb-10">
        <h2 className="text-2xl font-bold mb-6 text-blue-700 flex items-center gap-2">
          <span className="inline-block bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-base">Add User</span>
        </h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAddUser();
          }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4"
        >
          <input
            type="text"
            name="firstName"
            value={formState.firstName}
            onChange={handleChange}
            placeholder="First Name"
            className="border border-blue-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="text"
            name="lastName"
            value={formState.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            className="border border-blue-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="email"
            name="email"
            value={formState.email}
            onChange={handleChange}
            placeholder="Email"
            className="border border-blue-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-400"
            required
          />
          <div className="md:col-span-3 flex flex-col md:flex-row gap-4 items-center mt-2">
            {errorMessage && (
              <p className="text-red-500 text-sm flex-1">{errorMessage}</p>
            )}
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition w-full md:w-auto"
            >
              Add User
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-blue-700 flex items-center gap-2">
          <span className="inline-block bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-base">Manage Users</span>
        </h2>
        <input
          type="text"
          placeholder="Search by name or email"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-blue-300 p-3 rounded-lg w-full mb-6 focus:ring-2 focus:ring-blue-400"
        />
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow">
            <thead>
              <tr>
                <th className="py-3 px-4 text-left text-blue-700 font-semibold">Name</th>
                <th className="py-3 px-4 text-left text-blue-700 font-semibold">Email</th>
                <th className="py-3 px-4 text-left text-blue-700 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={3} className="text-center text-gray-400 py-6">
                    No users found.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr
                    key={user._id || user.id}
                    className="border-b hover:bg-blue-50 transition"
                  >
                    <td className="py-3 px-4 font-medium text-gray-800">
                      {user.firstName} {user.lastName}
                    </td>
                    <td className="py-3 px-4 text-gray-600">{user.email}</td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => handleEdit(user)}
                        className="text-blue-600 hover:underline font-semibold mr-4"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteClick(user._id || user.id)}
                        className="text-red-600 hover:underline font-semibold"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit User Modal */}
      <Modal isOpen={isModalOpen} onClose={resetForm}>
        <h3 className="text-xl font-bold mb-4 text-blue-700">Edit User</h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleUpdateUser();
          }}
          className="space-y-4"
        >
          <input
            type="text"
            name="firstName"
            value={formState.firstName}
            onChange={handleChange}
            placeholder="First Name"
            className="border border-blue-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="text"
            name="lastName"
            value={formState.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            className="border border-blue-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="email"
            name="email"
            value={formState.email}
            onChange={handleChange}
            placeholder="Email"
            className="border border-blue-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-400"
            required
          />
          <div className="flex justify-end space-x-2">
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Update
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>

      {/* Confirm Delete Modal */}
      <ConfirmModal
        isOpen={isConfirmOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        message="Are you sure you want to delete this user?"
      />
    </div>
  );
};

export default ManageUsers;