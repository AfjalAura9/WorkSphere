import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import Login from "./components/Auth/Login";
import EmployeeDashboard from "./components/Dashboard/EmployeeDashboard";
import AdminDashboard from "./components/Dashboard/AdminDashboard";
import { NotificationProvider } from "./context/NotificationContext";
import EditAdminProfile from "./components/UserProfile/EditAdminProfile";

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
    // Redirect after login
    if (role === "admin") {
      navigate("/dashboard/admin", { replace: true });
    } else {
      navigate("/dashboard/employee", { replace: true });
    }
  };

  const handleLogout = () => {
    setUser(null);
    setIsAdmin(false);
    setLoggedInUserData(null);
    localStorage.removeItem("userRole");
    localStorage.removeItem("loggedInUserData");
    localStorage.removeItem("notifications");
    navigate("/login", { replace: true });
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

  // Route protection
  const RequireAuth = ({ children, role }) => {
    if (!user) return <Navigate to="/login" replace />;
    if (role && user !== role) return <Navigate to="/login" replace />;
    return children;
  };

  return (
    <NotificationProvider>
      <Routes>
        <Route
          path="/login"
          element={
            <Login
              handleLogin={handleLogin}
              setIsAdmin={setIsAdmin}
              isAdmin={isAdmin}
            />
          }
        />
        <Route
          path="/dashboard/admin"
          element={
            <RequireAuth role="admin">
              <AdminDashboard
                changeUser={handleLogout}
                data={loggedInUserData}
                onTaskUpdated={noop}
              />
            </RequireAuth>
          }
        />
        <Route
          path="/dashboard/employee"
          element={
            <RequireAuth role="employee">
              <EmployeeDashboard
                changeUser={handleLogout}
                data={loggedInUserData}
                onTaskUpdated={noop}
              />
            </RequireAuth>
          }
        />
        <Route
          path="/dashboard/admin/profile"
          element={
            <EditAdminProfile
              adminData={loggedInUserData}
              onSave={(updated) => {
                // Save logic here (API call or local update)
                // Optionally update localStorage and redirect back
                alert("Profile updated!");
                navigate("/dashboard/admin");
              }}
              onCancel={() => navigate("/dashboard/admin")}
            />
          }
        />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </NotificationProvider>
  );
};

export default App;
