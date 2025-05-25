import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";
import axios from "axios";
import { io } from "socket.io-client";
const SOCKET_URL = import.meta.env.VITE_API_URL; // <-- update this

const AllTask = ({ onUserClick, refreshTrigger }) => {
  const [userData, setUserData] = useContext(AuthContext);
  const [employees, setEmployees] = useState(userData || []);
  const socketRef = useState(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/employees`
      );
      setEmployees(res.data);
      setUserData(res.data);
    };
    fetchEmployees();
  }, [refreshTrigger]); // Reload when refreshTrigger changes

  useEffect(() => {
    socketRef.current = io(SOCKET_URL);

    // Listen for taskStatusUpdated event
    socketRef.current.on("taskStatusUpdated", () => {
      const fetchEmployees = async () => {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/employees`
        );
        setEmployees(res.data);
        setUserData(res.data);
      };
      fetchEmployees();
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  const handleUserClick = async (user) => {
    try {
      const res = await axios.get(`/api/employees/${user._id || user.id}`);
      onUserClick(res.data);
    } catch (err) {
      alert("Failed to load employee details.");
    }
  };

  return (
    <div className="p-6 rounded-lg mt-6 shadow-lg border-2 border-gray-300">
      <h2 className="text-xl font-bold text-gray-800 mb-6">Assigned Tasks</h2>
      <div className="grid grid-cols-5 gap-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold text-sm py-3 px-4 rounded-lg mb-4">
        <h2 className="text-center">Employee Name</h2>
        <h3 className="text-center">New</h3>
        <h3 className="text-center">Active</h3>
        <h3 className="text-center">Completed</h3>
        <h3 className="text-center">Failed</h3>
      </div>

      <div className="space-y-3">
        {employees?.length > 0 ? (
          employees.map((user, index) => (
            <div
              key={user._id || user.id || index}
              onClick={() => handleUserClick(user)}
              className="cursor-pointer grid grid-cols-5 gap-4 items-center text-sm text-gray-100 bg-gray-800 hover:bg-gray-700 transition-all px-4 py-3 rounded-lg border border-gray-700"
            >
              <h2 className="text-center font-medium text-white">
                {user.firstName}
              </h2>
              <h3 className="text-center text-blue-400 font-semibold">
                {user.taskCounts.newTask || 0}
              </h3>
              <h3 className="text-center text-yellow-400 font-semibold">
                {user.taskCounts.active || 0}
              </h3>
              <h3 className="text-center text-green-400 font-semibold">
                {user.taskCounts.completed || 0}
              </h3>
              <h3 className="text-center text-red-500 font-semibold">
                {user.taskCounts.failed || 0}
              </h3>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-400 py-4">
            No task data found for employees.
          </div>
        )}
      </div>
    </div>
  );
};

export default AllTask;
