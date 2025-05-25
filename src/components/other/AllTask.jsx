import React, { useContext, useEffect, useState, useRef } from "react";
import { AuthContext } from "../../context/AuthProvider";
import axios from "axios";
import { io } from "socket.io-client";
const SOCKET_URL = import.meta.env.VITE_API_URL;

const AllTask = ({ onUserClick, refreshTrigger }) => {
  const [userData, setUserData] = useContext(AuthContext);
  const [employees, setEmployees] = useState(userData || []);
  const socketRef = useRef(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/employees`
      );
      setEmployees(res.data);
      setUserData(res.data);
    };
    fetchEmployees();
  }, [refreshTrigger]);

  useEffect(() => {
    socketRef.current = io(SOCKET_URL);

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
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/employees/${user._id || user.id}`
      );
      onUserClick(res.data);
    } catch (err) {
      alert("Failed to load employee details.");
    }
  };

  return (
    <div className="p-6 rounded-lg mt-6 shadow-lg border-2 border-gray-300 bg-white">
      <h2 className="text-lg md:text-2xl font-bold text-blue-600 mb-4 text-center">
        Assigned Tasks
      </h2>

      {/* Cards Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {employees?.length > 0 ? (
          employees.map((user, index) => (
            <div
              key={user._id || user.id || index}
              onClick={() => handleUserClick(user)}
              className="cursor-pointer bg-gray-100 hover:bg-gray-200 transition-all p-4 rounded-lg shadow-md border border-gray-300"
            >
              {/* Employee Name */}
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                {user.firstName}
              </h3>

              {/* Task Counts */}
              <div className="flex justify-between items-center text-sm text-gray-600">
                <span>New:</span>
                <span className="text-blue-500 font-semibold">
                  {user.taskCounts.newTask || 0}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm text-gray-600">
                <span>Active:</span>
                <span className="text-yellow-500 font-semibold">
                  {user.taskCounts.active || 0}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm text-gray-600">
                <span>Completed:</span>
                <span className="text-green-500 font-semibold">
                  {user.taskCounts.completed || 0}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm text-gray-600">
                <span>Failed:</span>
                <span className="text-red-500 font-semibold">
                  {user.taskCounts.failed || 0}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-400 py-4 col-span-full">
            No task data found for employees.
          </div>
        )}
      </div>
    </div>
  );
};

export default AllTask;
