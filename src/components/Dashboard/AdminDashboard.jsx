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
      <div className="flex-1 bg-white p-4 md:p-7 overflow-y-auto ml-64">
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
                  <CreateTask />
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
