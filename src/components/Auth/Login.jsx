import React, { useState } from "react";

const Login = ({ handleLogin, setIsAdmin, isAdmin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    handleLogin(email, password);
    setEmail("");
    setPassword("");
  };

  return (
    <div className="flex w-screen h-screen">
      {/* Right: Illustration */}
      <div className="w-1/2 hidden md:flex items-center justify-center bg-gradient-to-r from-blue-100 to-blue-200">
        {/* Conditionally render the illustrations based on isAdmin */}
        <img
  src={isAdmin ? "/Admin_illustration.png" : "/Employee_illustration.png"}
  alt="Illustration"
  className="w-3/4 h-auto object-contain"
/>
      </div>

      {/* Left: Login Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white p-8">
        <div className="w-full max-w-md shadow-xl rounded-lg p-6 bg-white">
          <div className="flex justify-center mb-4">
            <img
              src="/public/Logo.svg"
              alt="Company Logo"
              className="h-20 w-auto object-contain"
            />
          </div>
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Employee Management System
          </h2>

          {/* Role Toggle */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center gap-10 text-lg font-medium">
              <button
                type="button"
                onClick={() => setIsAdmin(false)}
                className={`relative pb-1 transition-all duration-300 ${
                  !isAdmin
                    ? "text-blue-600 font-semibold after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-full after:bg-blue-600"
                    : "text-gray-400 hover:text-gray-600"
                }`}
              >
                Employee
              </button>
              <button
                type="button"
                onClick={() => setIsAdmin(true)}
                className={`relative pb-1 transition-all duration-300 ${
                  isAdmin
                    ? "text-blue-600 font-semibold after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-full after:bg-blue-600"
                    : "text-gray-400 hover:text-gray-600"
                }`}
              >
                Admin
              </button>
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={submitHandler} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="text-black mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder={
                  isAdmin ? "Enter admin email" : "Enter employee email"
                }
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="text-black mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder={
                    isAdmin ? "Enter admin password" : "Enter employee password"
                  }
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-blue-600 hover:text-blue-800 focus:outline-none"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Log In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;