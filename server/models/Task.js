const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  priority: { type: String, enum: ["Low", "Medium", "High"], default: "Low" },
 status: {
  type: String,
  enum: ["Pending", "In Progress", "Completed"],  // ✅ added "In Progress"
  default: "Pending"
},

  deadline: Date,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Task", TaskSchema);
