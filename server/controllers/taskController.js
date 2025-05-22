const mongoose = require("mongoose"); // 🟢 Add this at the top if not already

// Assign a new task
exports.createTask = async (req, res) => {
  try {
    const { title, description, assignedTo, dueDate, category } = req.body;

    // 🛡️ Validate assignedTo
    if (!assignedTo || !mongoose.Types.ObjectId.isValid(assignedTo)) {
      return res
        .status(400)
        .json({ message: "Invalid or missing assignedTo user ID" });
    }

    const newTask = new Task({
      title,
      description,
      assignedTo,
      dueDate,
      category,
    });
    const saved = await newTask.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get tasks for one employee
exports.getTasksByEmployee = async (req, res) => {
  try {
    const tasks = await Task.find({ assignedTo: req.params.id }).sort({
      createdAt: -1,
    });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a task’s status
exports.updateTaskStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const updated = await Task.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Task not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
