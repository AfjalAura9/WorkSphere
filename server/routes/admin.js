import express from "express";
import Admin from "../models/Admin.js";

const router = express.Router();

// Admin login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log("Login attempt:", email, password);
  const admin = await Admin.findOne({ email });
  console.log("Admin found:", admin);
  if (!admin) return res.status(401).json({ error: "Invalid credentials" });
  if (admin.password !== password)
    return res.status(401).json({ error: "Invalid credentials" });
  res.json(admin);
});

// Get admin profile by ID
router.get("/profile/:id", async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id);
    if (!admin) return res.status(404).json({ error: "Not found" });
    res.json(admin);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch admin profile" });
  }
});

// Update admin profile by ID
router.put("/profile/:id", async (req, res) => {
  try {
    const updated = await Admin.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) return res.status(404).json({ error: "Not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Failed to update admin profile" });
  }
});

export default router;
