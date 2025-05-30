import express from "express";
import mongoose from "mongoose";
import Employee from "../models/Employee.js";

const router = express.Router();

// GET /api/employees
router.get("/", async (req, res) => {
  try {
    const employees = await Employee.find({});
    res.json(employees);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch employees" });
  }
});

// GET /api/employees/:id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ error: "Invalid employee ID" });
    }
    const employee = await Employee.findById(id).populate("tasks");
    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }
    res.json(employee);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch employee details" });
  }
});

// POST /api/employees
router.post("/", async (req, res) => {
  try {
    const { firstName, lastName, email, password, taskCounts, tasks } =
      req.body;
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    // Check for duplicate email
    const existing = await Employee.findOne({ email });
    if (existing) {
      return res.status(409).json({ error: "Email already exists" });
    }
    const employee = await Employee.create({
      firstName,
      lastName,
      email,
      password,
      taskCounts: taskCounts || {
        new: 0,
        active: 0,
        completed: 0,
        failed: 0,
      },
      tasks: tasks || [],
    });
    res.status(201).json(employee);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to create employee", details: err.message });
  }
});
// POST /api/employees/login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const employee = await Employee.findOne({ email });
  if (!employee || employee.password !== password) {
    return res.status(401).json({ error: "Invalid credentials" });
  }
  res.json(employee);
});

// PUT /api/employees/:id
router.put("/:id", async (req, res) => {
  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedEmployee) {
      return res.status(404).json({ error: "Employee not found" });
    }
    res.status(200).json(updatedEmployee);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to update employee", details: err.message });
  }
});

// DELETE /api/employees/:id
router.delete("/:id", async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }
    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to delete employee", details: err.message });
  }
});

export default router;
