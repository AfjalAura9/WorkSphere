import React, { useState } from "react";
import Header from "../other/Header";
import Sidebar from "../other/Sidebar";
import ManageUsers from "../other/ManageUsers";
import CreateTask from "../other/CreateTask";
import AllTask from "../other/AllTask";
import UserProfile from "../UserProfile/UserProfile";

const AdminDashboard = (props) => {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  const [activePage, setActivePage] = useState("assign-task");
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <div className="flex h-screen">
      <Sidebar activePage={activePage} setActivePage={setActivePage} />

      <div className="flex-1 bg-white p-7 overflow-y-auto">
        <Header changeUser={props.changeUser} data={props.data} />

        {selectedUser ? (
          <UserProfile user={selectedUser} isAdmin={true} />
        ) : (
          <>
            {activePage === "assign-task" && (
              <>
                <CreateTask />
                <AllTask onUserClick={setSelectedUser} />
              </>
            )}

            {activePage === "manage-users" && <ManageUsers />}
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
