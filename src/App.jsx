import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./components/Auth/Login";
import EmployeeDashboard from "./components/Dashboard/EmployeeDashboard";
import AdminDashboard from "./components/Dashboard/AdminDashboard";
import { NotificationProvider } from "./context/NotificationContext";

const noop = () => {};

const App = () => {
  const [user, setUser] = useState(() => localStorage.getItem("userRole"));
  const [isAdmin, setIsAdmin] = useState(
    () => localStorage.getItem("userRole") === "admin"
  );
  const [loggedInUserData, setLoggedInUserData] = useState(() => {
    const stored = localStorage.getItem("loggedInUserData");
    return stored ? JSON.parse(stored) : { firstName: "Admin" };
  });

  const navigate = useNavigate();

  const handleLogin = (role, userData) => {
    setUser(role);
    setIsAdmin(role === "admin");
    setLoggedInUserData(userData);
    localStorage.setItem("userRole", role);
    localStorage.setItem("loggedInUserData", JSON.stringify(userData));
    if (role === "admin") {
      navigate("/dashboard/admin");
    } else {
      navigate("/dashboard/employee");
    }
  };

  const handleLogout = () => {
    setUser(null);
    setIsAdmin(false);
    setLoggedInUserData(null);
    localStorage.removeItem("userRole");
    localStorage.removeItem("loggedInUserData");
    localStorage.removeItem("notifications");
    navigate("/login");
  };

  useEffect(() => {
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
                onTaskUpdated={noop}
              />
            ) : (
              <EmployeeDashboard
                changeUser={handleLogout}
                data={loggedInUserData}
                onTaskUpdated={noop}
              />
            )
          }
        />
        <Route
          path="/dashboard/admin"
          element={<AdminDashboard onTaskUpdated={noop} />}
        />
        <Route
          path="/dashboard/employee"
          element={<EmployeeDashboard onTaskUpdated={noop} />}
        />
        <Route path="*" element={<Login />} />
      </Routes>
    </NotificationProvider>
  );
};

export default App;
