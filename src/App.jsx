import React, { useContext, useEffect, useState } from "react";
import Login from "./components/Auth/Login";
import EmployeeDashboard from "./components/Dashboard/EmployeeDashboard";
import AdminDashboard from "./components/Dashboard/AdminDashboard";
import { AuthContext } from "./context/AuthProvider";

const App = () => {
  const [user, setUser] = useState(null);
  const [loggedInUserData, setLoggedInUserData] = useState(null);
  const [userData, SetUserData] = useContext(AuthContext);
  const [isAdmin, setIsAdmin] = useState(false); // Track current tab selection

  // Load user from local storage on initial render
  useEffect(() => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) {
      const userData = JSON.parse(loggedInUser);
      setUser(userData.role);
      setLoggedInUserData(userData.data || null);
    }
  }, []);

  // Handle login based on selected role
  const handleLogin = (email, password) => {
    if (isAdmin) {
      // Admin login
      if (email === "admin@me.com" && password === "123") {
        setUser("admin");
        localStorage.setItem("loggedInUser", JSON.stringify({ role: "admin" }));
      } else {
        alert("Invalid Admin Credentials or wrong role selected.");
      }
    } else {
      // Employee login
      if (userData) {
        const employee = userData.find(
          (e) => email === e.email && e.password === password
        );
        if (employee) {
          setUser("employee");
          setLoggedInUserData(employee);
          localStorage.setItem(
            "loggedInUser",
            JSON.stringify({ role: "employee", data: employee })
          );
        } else {
          alert("Invalid Employee Credentials or wrong role selected.");
        }
      } else {
        alert("Invalid Credentials");
      }
    }
  };

  return (
    <>
      {!user ? (
        <Login
          handleLogin={handleLogin}
          isAdmin={isAdmin}
          setIsAdmin={setIsAdmin}
        />
      ) : null}

      {user === "admin" ? (
        <AdminDashboard changeUser={setUser} />
      ) : user === "employee" ? (
        <EmployeeDashboard changeUser={setUser} data={loggedInUserData} />
      ) : null}
    </>
  );
};

export default App;
