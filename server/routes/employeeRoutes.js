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

export default router;
