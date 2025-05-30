// server/models/taskModel.js
import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  heading: { type: String, required: true },
  description: { type: String, required: true },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "Employee" },
  dueDate: { type: Date, required: true },
  category: { type: String, required: true },
  status: { type: String, default: "new" }, // <-- default is "new"
});

const Task = mongoose.model("Task", taskSchema);

export default Task;
