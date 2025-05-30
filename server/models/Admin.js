import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  position: String,
  location: String,
  profilePic: String,
  password: String, // <-- This is required for login!
});

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;
