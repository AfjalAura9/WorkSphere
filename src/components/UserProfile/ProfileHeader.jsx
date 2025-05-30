import React, { useState, useEffect } from "react";

const ProfileHeader = ({ user, updateUser }) => {
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState(user);

  useEffect(() => {
    setForm(user);
  }, [user]);

  const handleSave = () => {
    updateUser(form);
    setEdit(false);
  };

  return (
    <div className="flex flex-col sm:flex-row items-center sm:space-x-6 space-y-4 sm:space-y-0 p-4">
      <img
        src={form.profilePic || "/default-profile.png"}
        alt="User Avatar"
        className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 border-gray-300"
      />
      <div className="text-center sm:text-left">
        {edit ? (
          <div className="flex flex-col gap-2">
            <input
              value={form.firstName}
              onChange={(e) => setForm({ ...form, firstName: e.target.value })}
              className="border rounded px-2 py-1"
              placeholder="First Name"
            />
            <input
              value={form.lastName}
              onChange={(e) => setForm({ ...form, lastName: e.target.value })}
              className="border rounded px-2 py-1"
              placeholder="Last Name"
            />
            <input
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="border rounded px-2 py-1"
              placeholder="Email"
            />
            <button
              onClick={handleSave}
              className="mt-2 px-3 py-1 bg-blue-600 text-white rounded"
            >
              Save
            </button>
          </div>
        ) : (
          <>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
              {user.firstName} {user.lastName}
            </h2>
            <p className="text-gray-600">{user.role}</p>
            <p className="text-gray-500">{user.email}</p>
            <button
              onClick={() => setEdit(true)}
              className="mt-2 px-3 py-1 bg-gray-200 rounded"
            >
              Edit
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ProfileHeader;
