import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Header from "../other/Header";
import Sidebar from "../other/Sidebar";
import ManageUsers from "../other/Manageusers";
import CreateTask from "../other/CreateTask";
import AllTask from "../other/AllTask";
import UserProfile from "../UserProfile/UserProfile";
import { io } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_API_URL;

const DEFAULT_SIDEBAR_WIDTH = 192;
const COLLAPSED_SIDEBAR_WIDTH = 64;

const AdminDashboard = ({ changeUser, data, ...props }) => {
  const [activePage, setActivePage] = useState("assign-task");
  const [selectedUser, setSelectedUser] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false); // default closed on mobile
  const [sidebarWidth, setSidebarWidth] = useState(DEFAULT_SIDEBAR_WIDTH);
  const [adminData, setAdminData] = useState(null);

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const socketRef = useRef(null);

  useEffect(() => {
    let adminId = data?._id;
    let fallbackAdmin = null;
    if (!adminId) {
      try {
        const stored = JSON.parse(localStorage.getItem("loggedInUserData"));
        adminId = stored?._id;
        fallbackAdmin = stored;
      } catch {}
    }
    if (!adminId) return;

    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/admin/profile/${adminId}`
        );
        setAdminData(res.data);
      } catch (err) {
        setAdminData(fallbackAdmin || data);
      }
    };
    fetchProfile();
  }, [data]);

  useEffect(() => {
    socketRef.current = io(SOCKET_URL, { transports: ["websocket"] });
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

  // Responsive sidebar handler
  const handleSidebarChange = (page) => {
    setActivePage(page);
    setSelectedUser(null);
    if (isMobile) setSidebarOpen(false); // close sidebar on mobile after nav
  };

  // Keep sidebar width in sync with open/close state (for desktop)
  useEffect(() => {
    setSidebarWidth(
      sidebarOpen ? DEFAULT_SIDEBAR_WIDTH : COLLAPSED_SIDEBAR_WIDTH
    );
  }, [sidebarOpen]);

  // Detect mobile screen
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar: 
          - On desktop: always visible
          - On mobile: visible only if sidebarOpen
      */}
      {isMobile && sidebarOpen && (
        <Sidebar
          activePage={activePage}
          setActivePage={handleSidebarChange}
          isOpen={true}
          setIsOpen={setSidebarOpen}
          sidebarWidth={DEFAULT_SIDEBAR_WIDTH}
          setSidebarWidth={setSidebarWidth}
          defaultWidth={DEFAULT_SIDEBAR_WIDTH}
          collapsedWidth={COLLAPSED_SIDEBAR_WIDTH}
          logOutUser={changeUser}
        />
      )}
      {!isMobile && (
        <Sidebar
          activePage={activePage}
          setActivePage={handleSidebarChange}
          isOpen={sidebarOpen}
          setIsOpen={setSidebarOpen}
          sidebarWidth={sidebarWidth}
          setSidebarWidth={setSidebarWidth}
          defaultWidth={DEFAULT_SIDEBAR_WIDTH}
          collapsedWidth={COLLAPSED_SIDEBAR_WIDTH}
          logOutUser={changeUser}
        />
      )}
      <div
        className="flex-1 flex flex-col transition-all duration-300"
        style={{
          marginLeft: !isMobile ? sidebarWidth : 0,
          minWidth: 0,
        }}
      >
        <Header
          data={adminData}
          adminData={adminData}
          setAdminData={setAdminData}
          onHamburgerClick={() => setSidebarOpen(true)}
          isSidebarOpen={sidebarOpen}
          logOutUser={changeUser}
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
                    <h2 className="bg-white rounded-lg text-lg md:text-2xl font-bold text-blue-600 mb-4 text-center">
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
