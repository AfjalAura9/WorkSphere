import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";

const Login = ({ handleLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData] = useContext(AuthContext); // Access employee data from AuthContext
  const [isAdminLogin, setIsAdminLogin] = useState(true); // Toggle between Admin and Employee login

  const submitHandler = (e) => {
    e.preventDefault();

    if (isAdminLogin) {
      // Admin login
      if (email === "admin@me.com" && password === "123") {
        handleLogin("admin", { firstName: "Admin" }); // <-- Pass admin name here
      } else {
        alert("Invalid Admin Credentials.");
      }
    } else {
      // Employee login
      const employee = userData.find(
        (user) => user.email === email && user.password === password
      );

      if (employee) {
        handleLogin("employee", employee); // Pass employee data to App
      } else {
        alert("Invalid Employee Credentials.");
      }
    }

    setEmail("");
    setPassword("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300">
      <div className="bg-white shadow-2xl rounded-2xl px-10 py-12 w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <img src="/Logo.png" alt="Logo" className="w-32 h-32 mb-2" />
          <h2 className="text-3xl font-bold text-blue-700 mb-2">
            Welcome Back!
          </h2>
          <p className="text-gray-500 text-sm">
            Sign in to your {isAdminLogin ? "Admin" : "Employee"} account
          </p>
        </div>

        {/* Toggle Buttons */}
        <div className="flex justify-center mb-6">
          <button
            onClick={() => setIsAdminLogin(true)}
            className={`px-4 py-2 rounded-l-lg ${
              isAdminLogin
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Admin Login
          </button>
          <button
            onClick={() => setIsAdminLogin(false)}
            className={`px-4 py-2 rounded-r-lg ${
              !isAdminLogin
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Employee Login
          </button>
        </div>

        {/* Login Form */}
        <form onSubmit={submitHandler} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-semibold text-lg shadow transition duration-300"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
