const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    required: true,
  },
  status: {
    type: String,
    enum: ['new', 'active', 'completed', 'failed'],
    default: 'new',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  dueDate: Date,
});

module.exports = mongoose.model('Task', taskSchema);
