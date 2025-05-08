
import React, { useState } from "react";
import Header from "../other/Header";
import Sidebar from "../other/Sidebar";
import ManageUsers from "../other/ManageUsers";
import CreateTask from "../other/CreateTask";
import AllTask from "../other/AllTask";

const AdminDashboard = (props) => {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  // 🔄 New state to track active admin tab
  const [activePage, setActivePage] = useState("assign-task"); // default to Assign Task

  return (
    <div className="flex h-screen">
      {/* 📌 Sidebar for navigation */}
      <Sidebar activePage={activePage} setActivePage={setActivePage} />

      {/* 🔲 Main content area */}
      <div className="flex-1 bg-white p-7 overflow-y-auto">
        {/* 🧢 Keep your existing header */}
        <Header changeUser={props.changeUser} data={props.data} />

        {/* 🔁 Show components conditionally based on sidebar click */}
        {activePage === "assign-task" && (
          <>
            <CreateTask />
            <AllTask />
          </>
        )}

        {activePage === "manage-users" && <ManageUsers />}
      </div>
    </div>
  );
};

export default AdminDashboard;