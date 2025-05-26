import React, { useState } from "react";
import Header from "../other/Header";
import Sidebar from "../other/Sidebar";
import ManageUsers from "../other/Manageusers";
import CreateTask from "../other/CreateTask";
import AllTask from "../other/AllTask";
import UserProfile from "../UserProfile/UserProfile";

const AdminDashboard = (props) => {
  const [activePage, setActivePage] = useState("assign-task");
  const [selectedUser, setSelectedUser] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleBackFromManageUsers = () => setActivePage("assign-task");
  const handleBackFromProfile = () => setSelectedUser(null);

  const handleTaskChange = () => {
    setRefreshTrigger((prev) => prev + 1); // Increment to trigger refresh
  };

  const handleSidebarChange = (page) => {
    setActivePage(page);
    setSelectedUser(null); // Reset selected user when switching pages
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar activePage={activePage} setActivePage={handleSidebarChange} />

      {/* Main Content */}
      <div className="flex-1 bg-white p-4 md:p-7 overflow-y-auto ml-0 md:ml-64">
        <Header changeUser={props.changeUser} data={props.data} />
        {selectedUser ? (
          <UserProfile
            user={selectedUser}
            isAdmin={true}
            onBack={handleBackFromProfile}
            onTaskChanged={handleTaskChange}
          />
        ) : (
          <>
            {activePage === "assign-task" && (
              <>
                {/* Assign New Task Section */}
                <div className="bg-blue-100 p-4 md:p-8 rounded-lg shadow-md mb-8">
                  <h2 className="text-lg md:text-2xl font-bold text-blue-600 mb-4 text-center">
                    Assign New Task
                  </h2>
                  <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Left Column */}
                    <div className="space-y-4">
                      {/* Title */}
                      <div>
                        <label className="block text-gray-700 font-medium mb-2">
                          Title
                        </label>
                        <input
                          type="text"
                          placeholder="Task Title"
                          className="w-full p-2 border rounded-lg"
                        />
                      </div>

                      {/* Due Date */}
                      <div>
                        <label className="block text-gray-700 font-medium mb-2">
                          Due Date
                        </label>
                        <input
                          type="date"
                          placeholder="dd-mm-yyyy"
                          className="w-full p-2 border rounded-lg"
                        />
                      </div>

                      {/* Category */}
                      <div>
                        <label className="block text-gray-700 font-medium mb-2">
                          Category
                        </label>
                        <select className="w-full p-2 border rounded-lg">
                          <option>Select Category</option>
                        </select>
                      </div>

                      {/* Assign To */}
                      <div>
                        <label className="block text-gray-700 font-medium mb-2">
                          Assign To
                        </label>
                        <select className="w-full p-2 border rounded-lg">
                          <option>Select Employee</option>
                        </select>
                      </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-4">
                      {/* Description */}
                      <div>
                        <label className="block text-gray-700 font-medium mb-2">
                          Description
                        </label>
                        <textarea
                          placeholder="Task Description"
                          className="w-full p-2 border rounded-lg"
                          rows="6"
                        ></textarea>
                      </div>

                      {/* Assign Task Button */}
                      <div>
                        <button
                          type="submit"
                          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
                        >
                          Assign Task
                        </button>
                      </div>
                    </div>
                  </form>
                </div>

                {/* Assigned Tasks Section */}
                <div className="bg-white p-4 md:p-8 rounded-lg shadow-md">
                  <h2 className="text-lg md:text-2xl font-bold text-blue-600 mb-4 text-center">
                    Assigned Tasks
                  </h2>
                  <AllTask
                    onUserClick={setSelectedUser}
                    refreshTrigger={refreshTrigger}
                  />
                </div>
              </>
            )}
            {activePage === "manage-users" && (
              <ManageUsers onBack={handleBackFromManageUsers} />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
