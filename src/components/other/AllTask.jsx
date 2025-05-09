import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";

const AllTask = ({ onUserClick }) => {
  const [userData] = useContext(AuthContext);

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
        {userData?.length > 0 ? (
          userData.map((user, index) => (
            <div
              key={index}
              onClick={() => onUserClick(user)}
              className="cursor-pointer grid grid-cols-5 gap-4 items-center text-sm text-gray-100 bg-gray-800 hover:bg-gray-700 transition-all px-4 py-3 rounded-lg border border-gray-700"
            >
              <h2 className="text-center font-medium text-white">
                {user.firstName}
              </h2>
              <h3 className="text-center text-blue-400 font-semibold">
                {user.taskCounts.newTask}
              </h3>
              <h3 className="text-center text-yellow-400 font-semibold">
                {user.taskCounts.active}
              </h3>
              <h3 className="text-center text-green-400 font-semibold">
                {user.taskCounts.completed}
              </h3>
              <h3 className="text-center text-red-500 font-semibold">
                {user.taskCounts.failed}
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
