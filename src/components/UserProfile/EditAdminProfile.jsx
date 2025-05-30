import React, { useRef, useState, useEffect } from "react";
import axios from "axios";

const EditAdminProfileModal = ({
  isOpen,
  onClose,
  adminData,
  onSave,
  onBack,
}) => {
  const [form, setForm] = useState({
    firstName: adminData?.firstName || "",
    lastName: adminData?.lastName || "",
    email: adminData?.email || "",
    phone: adminData?.phone || "",
    position: adminData?.position || "",
    location: adminData?.location || "",
    profilePic: adminData?.profilePic || "",
    _id: adminData?._id || adminData?.id || "",
  });
  const [preview, setPreview] = useState(adminData?.profilePic || "");
  const fileInputRef = useRef();

  // Sync form with adminData when modal opens or adminData changes
  useEffect(() => {
    setForm({
      firstName: adminData?.firstName || "",
      lastName: adminData?.lastName || "",
      email: adminData?.email || "",
      phone: adminData?.phone || "",
      position: adminData?.position || "",
      location: adminData?.location || "",
      profilePic: adminData?.profilePic || "",
      _id: adminData?._id || adminData?.id || "",
    });
    setPreview(adminData?.profilePic || "");
  }, [adminData, isOpen]);

  if (!isOpen || !adminData) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm((prev) => ({ ...prev, profilePic: reader.result }));
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form._id) {
      alert("Admin ID is missing. Cannot update profile.");
      return;
    }
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/admin/profile/${form._id}`,
        form
      );
      if (onSave) onSave(res.data); // Update parent state with latest data from DB
    } catch (err) {
      alert("Failed to update profile. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-lg p-0 relative">
        <button
          className="absolute top-6 right-6 text-gray-400 hover:text-gray-700 text-2xl"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>
        <div className="flex flex-col items-center pt-10 pb-4">
          <div className="relative">
            <img
              src={preview || "/default-profile.png"}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border-4 border-white shadow"
            />
            <button
              type="button"
              className="absolute bottom-0 right-0 bg-white border border-gray-200 text-blue-600 rounded-full p-2 shadow hover:bg-blue-50"
              onClick={() => fileInputRef.current.click()}
              title="Change Profile Picture"
            >
              <svg
                width="20"
                height="20"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M4 16v2h12v-2H4zm10.293-9.707l-1.586-1.586A1 1 0 0 0 11.586 4H8.414a1 1 0 0 0-.707.293l-1.586 1.586A1 1 0 0 0 6 7v7a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V7a1 1 0 0 0-.293-.707zM10 13a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
              </svg>
            </button>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
          <div className="mt-4 text-center">
            <div className="text-xl font-semibold text-gray-800">
              {form.firstName || "Your name"}
            </div>
            <div className="text-gray-400 text-sm">
              {form.email || "yourname@gmail.com"}
            </div>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="px-10 pb-8">
          <div className="divide-y divide-gray-100">
            <div className="flex items-center py-4">
              <div className="w-1/2 text-gray-500 font-medium">Name</div>
              <div className="w-1/2 text-right text-gray-700">
                <input
                  type="text"
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  placeholder="your name"
                  className="bg-transparent border-none text-right w-full focus:outline-none"
                  required
                />
              </div>
            </div>
            <div className="flex items-center py-4">
              <div className="w-1/2 text-gray-500 font-medium">
                Email account
              </div>
              <div className="w-1/2 text-right text-gray-700">
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="yourname@gmail.com"
                  className="bg-transparent border-none text-right w-full focus:outline-none"
                  required
                />
              </div>
            </div>
            <div className="flex items-center py-4">
              <div className="w-1/2 text-gray-500 font-medium">Role</div>
              <div className="w-1/2 text-right text-gray-700">
                <input
                  type="text"
                  name="position"
                  value={form.position}
                  onChange={handleChange}
                  placeholder="Admin"
                  className="bg-transparent border-none text-right w-full focus:outline-none"
                />
              </div>
            </div>
            <div className="flex items-center py-4">
              <div className="w-1/2 text-gray-500 font-medium">Location</div>
              <div className="w-1/2 text-right text-gray-700">
                <input
                  type="text"
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  placeholder="USA"
                  className="bg-transparent border-none text-right w-full focus:outline-none"
                />
              </div>
            </div>
          </div>
          <div className="flex justify-start mt-8 gap-4">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold shadow hover:bg-blue-700 transition"
            >
              Save Change
            </button>
            {onBack && (
              <button
                type="button"
                className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg font-semibold shadow hover:bg-gray-300 transition"
                onClick={onBack}
              >
                Back
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditAdminProfileModal;
