import React, { useState, useEffect, useRef } from "react";
import Header from "../other/Header";
import Sidebar from "../other/Sidebar";
import ManageUsers from "../other/Manageusers";
import CreateTask from "../other/CreateTask";
import AllTask from "../other/AllTask";
import UserProfile from "../UserProfile/UserProfile";
import { io } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_API_URL;

const AdminDashboard = ({ changeUser, data, ...props }) => {
  const [activePage, setActivePage] = useState("assign-task");
  const [selectedUser, setSelectedUser] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const socketRef = useRef(null);

  // Listen for task events for live updates
  useEffect(() => {
    socketRef.current = io(SOCKET_URL, { transports: ["websocket"] });

    // Refresh assigned tasks on relevant events
    const refresh = () => setRefreshTrigger((v) => v + 1);

    socketRef.current.on("taskAssigned", refresh);
    socketRef.current.on("taskStatusUpdated", refresh);
    socketRef.current.on("taskEdited", refresh);
    socketRef.current.on("taskDeleted", refresh);

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  const handleBackFromManageUsers = () => setActivePage("assign-task");
  const handleBackFromProfile = () => setSelectedUser(null);

  const handleTaskChange = () => setRefreshTrigger((prev) => prev + 1);

  const handleSidebarChange = (page) => {
    setActivePage(page);
    setSelectedUser(null);
    setSidebarOpen(false); // Close sidebar on mobile after navigation
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <Sidebar
        activePage={activePage}
        setActivePage={handleSidebarChange}
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
        logOutUser={changeUser}
      />
      {/* Main Content */}
      <div className="flex-1 flex flex-col md:ml-48 transition-all duration-300">
        {/* Header */}
        <Header
          data={data}
          onHamburgerClick={() => setSidebarOpen(true)}
          isSidebarOpen={true}
        />
        <div className="flex-1 bg-gray-100 p-4 md:p-7 overflow-y-auto">
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
                  <div className="bg-white p-4 md:p-8 rounded-lg shadow-md mb-8">
                    <h2 className="text-lg md:text-2xl font-bold text-blue-600 mb-4 text-center">
                      Assign New Task
                    </h2>
                    <CreateTask onTaskAssigned={handleTaskChange} />
                  </div>
                  <div className="bg-white p-4 md:p-8 rounded-lg shadow-md">
                    <h2 className="text-lg md:text-2xl font-bold text-blue-600 text-center">
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
    </div>
  );
};

export default AdminDashboard;
