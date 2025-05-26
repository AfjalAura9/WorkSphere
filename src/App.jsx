GitHub\WorkSphere\src\App.jsx
import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Auth/Login";
import EmployeeDashboard from "./components/Dashboard/EmployeeDashboard";
import AdminDashboard from "./components/Dashboard/AdminDashboard";
import { NotificationProvider } from "./context/NotificationContext";

const App = () => {
  const [user, setUser] = useState(() => localStorage.getItem("userRole"));
  const [isAdmin, setIsAdmin] = useState(
    () => localStorage.getItem("userRole") === "admin"
  );
  const [loggedInUserData, setLoggedInUserData] = useState(() => {
    const stored = localStorage.getItem("loggedInUserData");
    return stored ? JSON.parse(stored) : { firstName: "Admin" };
  });

  const handleLogin = (role, userData) => {
    setUser(role);
    setIsAdmin(role === "admin");
    setLoggedInUserData(userData);
    localStorage.setItem("userRole", role);
    localStorage.setItem("loggedInUserData", JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    setIsAdmin(false);
    setLoggedInUserData(null);
    localStorage.removeItem("userRole");
    localStorage.removeItem("loggedInUserData");
    localStorage.removeItem("notifications"); // Optional: clear notifications on logout
  };

  useEffect(() => {
    // Optionally, listen for storage changes in other tabs
    const syncLogout = () => {
      if (!localStorage.getItem("userRole")) {
        setUser(null);
        setIsAdmin(false);
        setLoggedInUserData(null);
      }
    };
    window.addEventListener("storage", syncLogout);
    return () => window.removeEventListener("storage", syncLogout);
  }, []);

  return (
    <NotificationProvider>
      <Routes>
        <Route
          path="/login"
          element={
            !user ? (
              <Login
                handleLogin={handleLogin}
                setIsAdmin={setIsAdmin}
                isAdmin={isAdmin}
              />
            ) : user === "admin" ? (
              <AdminDashboard
                changeUser={handleLogout}
                data={loggedInUserData}
              />
            ) : (
              <EmployeeDashboard
                changeUser={handleLogout}
                data={loggedInUserData}
              />
            )
          }
        />
        <Route path="/dashboard/admin" element={<AdminDashboard />} />
        <Route path="/dashboard/employee" element={<EmployeeDashboard />} />
        <Route path="*" element={<Login />} /> {/* Redirect undefined routes to login */}
      </Routes>
    </NotificationProvider>
  );
};

export default App;