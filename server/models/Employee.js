import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }], // Reference to tasks
  taskCounts: {
    newTask: { type: Number, default: 0 },
    active: { type: Number, default: 0 },
    completed: { type: Number, default: 0 },
    failed: { type: Number, default: 0 },
  },
});

const Employee = mongoose.model("Employee", employeeSchema);

export default Employee;
