import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";
import Modal from "../common/Modal";
import ConfirmModal from "../common/ConfirmModal";

const ManageUsers = () => {
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

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
    setErrorMessage(""); // Clear error message on input change
  };

  const resetForm = () => {
    setFormState({ firstName: "", lastName: "", email: "" });
    setEditId(null);
    setIsModalOpen(false);
    setErrorMessage("");
  };

  const handleAddUser = () => {
    // Check for duplicate email
    const duplicateUser = userData.find(
      (user) => user.email.toLowerCase() === formState.email.toLowerCase()
    );
    if (duplicateUser) {
      setErrorMessage("User with this email already exists.");
      return;
    }

    const newUser = {
      id: Date.now(),
      ...formState,
      password: "123",
      taskCounts: {
        active: 0,
        newTask: 0,
        completed: 0,
        failed: 0,
      },
      tasks: [],
    };
    const updatedUsers = [...userData, newUser];
    setUserData(updatedUsers);
    localStorage.setItem("employees", JSON.stringify(updatedUsers));
    resetForm();
  };

  const handleEdit = (user) => {
    setFormState({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    });
    setEditId(user.id);
    setIsModalOpen(true);
  };

  const handleUpdateUser = () => {
    const updatedUsers = userData.map((user) =>
      user.id === editId ? { ...user, ...formState } : user
    );
    setUserData(updatedUsers);
    localStorage.setItem("employees", JSON.stringify(updatedUsers));
    resetForm();
  };

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setIsConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    const updatedUsers = userData.filter((user) => user.id !== deleteId);
    setUserData(updatedUsers);
    localStorage.setItem("employees", JSON.stringify(updatedUsers));
    setIsConfirmOpen(false);
    setDeleteId(null);
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
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Add User</h2>
      {/* Add User Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAddUser();
        }}
        className="space-y-4 mb-6"
      >
        <input
          type="text"
          name="firstName"
          value={formState.firstName}
          onChange={handleChange}
          placeholder="First Name"
          className="border p-2 rounded w-full"
          required
        />
        <input
          type="text"
          name="lastName"
          value={formState.lastName}
          onChange={handleChange}
          placeholder="Last Name"
          className="border p-2 rounded w-full"
          required
        />
        <input
          type="email"
          name="email"
          value={formState.email}
          onChange={handleChange}
          placeholder="Email"
          className="border p-2 rounded w-full"
          required
        />
        {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add User
        </button>
      </form>
      <h2 className="text-2xl font-bold mb-4">Manage Users</h2>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search by name or email"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border p-2 rounded w-full mb-4"
      />
      {/* User List */}
      <ul className="space-y-3">
        {filteredUsers.map((user) => (
          <li
            key={user.id}
            className="p-3 bg-gray-100 rounded flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">
                {user.firstName} {user.lastName}
              </p>
              <p className="text-sm text-gray-600">{user.email}</p>
            </div>
            <div className="space-x-2">
              <button
                onClick={() => handleEdit(user)}
                className="text-blue-500 hover:underline"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteClick(user.id)}
                className="text-red-500 hover:underline"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Edit User Modal */}
      <Modal isOpen={isModalOpen} onClose={resetForm}>
        <h3 className="text-xl font-bold mb-4">Edit User</h3>
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
            className="border p-2 rounded w-full"
            required
          />
          <input
            type="text"
            name="lastName"
            value={formState.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            className="border p-2 rounded w-full"
            required
          />
          <input
            type="email"
            name="email"
            value={formState.email}
            onChange={handleChange}
            placeholder="Email"
            className="border p-2 rounded w-full"
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
