import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";
import Modal from "../common/Modal";
import ConfirmModal from "../common/ConfirmModal";
import { FiEdit2 } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

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
      const response = await axios.get(`${API_URL}/api/employees`);
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
      await axios.post(`${API_URL}/api/employees`, {
        ...formState,
        password: "123",
        taskCounts: {
          active: 0,
          new: 0,
          completed: 0,
          failed: 0,
        },
        tasks: [],
      });
      await refreshUsers();
      resetForm();
    } catch (err) {
      setErrorMessage("Failed to add employee.");
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
      await axios.put(`${API_URL}/api/employees/${editId}`, formState);
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
      await axios.delete(`${API_URL}/api/employees/${deleteId}`);
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 px-0 py-8 md:px-0 flex flex-col items-center">
      {/* Add employee Card */}
      <div className="w-full max-w-7xl bg-white rounded-lg shadow-lg p-4 md:p-8 mb-8 border border-blue-100">
        <h2 className="text-2xl md:text-3xl font-bold text-blue-700 mb-2 text-left">
          Add an Employee
        </h2>
        <p className="text-gray-500 mb-6 text-sm">
          Fill in the details below to add a new employee.
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAddUser();
          }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2"
        >
          <input
            type="text"
            name="firstName"
            value={formState.firstName}
            onChange={handleChange}
            placeholder="First Name"
            className="border border-blue-200 bg-blue-50 p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-400 transition text-base"
            required
          />
          <input
            type="text"
            name="lastName"
            value={formState.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            className="border border-blue-200 bg-blue-50 p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-400 transition text-base"
            required
          />
          <input
            type="email"
            name="email"
            value={formState.email}
            onChange={handleChange}
            placeholder="Email"
            className="border border-blue-200 bg-blue-50 p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-400 transition text-base"
            required
          />
        </form>
        <div className="flex flex-col md:flex-row gap-4 items-end mt-4">
          {errorMessage && (
            <p className="text-red-500 text-sm flex-1">{errorMessage}</p>
          )}
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 rounded-lg font-semibold shadow transition w-full md:w-auto text-base"
            onClick={handleAddUser}
          >
            Add User
          </button>
        </div>
      </div>

      {/* Manage Users Card */}
      <div className="w-full max-w-7xl bg-white rounded-lg shadow-lg p-4 md:p-8 border border-blue-100">
        <h2 className="text-2xl md:text-3xl font-bold text-blue-700 mb-2 text-left sticky top-0 z-10 bg-white">
          Manage Employees
        </h2>
        <p className="text-gray-500 mb-6 text-sm">
          Search, edit, or remove employees from your organization.
        </p>
        <input
          type="text"
          placeholder="Search by name or email"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-6 border border-blue-200 bg-blue-50 p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-400 transition text-base"
        />

        {/* Table for md+ screens */}
        <div className="hidden md:block overflow-x-auto rounded-lg border border-gray-100">
          <table className="min-w-full bg-white rounded-lg text-base">
            <thead>
              <tr className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                <th className="py-3 px-4 text-left font-semibold text-base">
                  Name
                </th>
                <th className="py-3 px-4 text-left font-semibold text-base">
                  Email
                </th>
                <th className="py-3 px-4 text-left font-semibold text-base">
                  Actions
                </th>
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
                    <td className="py-3 px-4 font-medium text-gray-800 text-base">
                      {user.firstName} {user.lastName}
                    </td>
                    <td className="py-3 px-4 text-gray-500 text-base">
                      {user.email}
                    </td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => handleEdit(user)}
                        className="text-blue-600 hover:bg-blue-100 rounded-full p-2 transition mr-2"
                        title="Edit"
                      >
                        <FiEdit2 size={18} />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(user._id || user.id)}
                        className="text-red-600 hover:bg-red-50 rounded-full p-2 transition"
                        title="Delete"
                      >
                        <MdDeleteOutline size={20} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Card/List UI */}
        <div className="md:hidden space-y-4">
          {filteredUsers.length === 0 ? (
            <div className="text-center text-gray-400 py-6 text-base">
              No users found.
            </div>
          ) : (
            filteredUsers.map((user) => (
              <div
                key={user._id || user.id}
                className="bg-gray-50 shadow border border-blue-100 rounded-lg p-4"
              >
                <h3 className="text-lg font-semibold text-blue-800 mb-1">
                  {user.firstName} {user.lastName}
                </h3>
                <p className="text-gray-600 mb-3 break-all text-sm">
                  <span className="font-medium">Email:</span> {user.email}
                </p>
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => handleEdit(user)}
                    className="text-blue-600 hover:bg-blue-100 rounded-full p-2 transition"
                    title="Edit"
                  >
                    <FiEdit2 size={18} />
                  </button>
                  <button
                    onClick={() => handleDeleteClick(user._id || user.id)}
                    className="text-red-600 hover:bg-red-50 rounded-full p-2 transition"
                    title="Delete"
                  >
                    <MdDeleteOutline size={20} />
                  </button>
                </div>
              </div>
            ))
          )}
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
            className="border border-blue-200 bg-blue-50 p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-400 transition text-base"
            required
          />
          <input
            type="text"
            name="lastName"
            value={formState.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            className="border border-blue-200 bg-blue-50 p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-400 transition text-base"
            required
          />
          <input
            type="email"
            name="email"
            value={formState.email}
            onChange={handleChange}
            placeholder="Email"
            className="border border-blue-200 bg-blue-50 p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-400 transition text-base"
            required
          />
          <div className="flex justify-end space-x-2">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-base"
            >
              Update
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 text-base"
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

      {/* Back Button */}
      <div className="w-full max-w-6xl flex justify-end mt-10">
        <button
          className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold shadow hover:bg-blue-700 transition text-base"
          onClick={onBack}
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default ManageUsers;
