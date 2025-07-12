const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  priority: { type: String, enum: ["Low", "Medium", "High"], default: "Low" },
  deadline: String,
  status: { type: String, enum: ["Pending", "In Progress", "Completed"], default: "Pending" },
});

module.exports = mongoose.model("Task", taskSchema);
