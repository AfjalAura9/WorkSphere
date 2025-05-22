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
      <Sidebar activePage={activePage} setActivePage={handleSidebarChange} />
      <div className="flex-1 bg-white p-7 overflow-y-auto">
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
                <CreateTask onTaskAssigned={handleTaskChange} />
                <AllTask
                  onUserClick={setSelectedUser}
                  refreshTrigger={refreshTrigger}
                />
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
