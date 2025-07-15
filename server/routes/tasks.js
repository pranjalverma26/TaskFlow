const express = require("express");
const jwt = require("jsonwebtoken");
const Task = require("../models/Task");

const router = express.Router();

// 🔐 Middleware to verify JWT and attach user ID
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ msg: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch {
    res.status(401).json({ msg: "Invalid token" });
  }
};

// Apply auth middleware to all task routes
router.use(authMiddleware);

// 📝 Create Task
router.post("/", async (req, res) => {
  try {
    console.log("🔧 Creating task for user:", req.userId);
    console.log("📦 Request body:", req.body);

    const task = new Task({ ...req.body, user: req.userId });
    await task.save();

    res.status(201).json({ success: true, task });
  } catch (error) {
    console.error("❌ Task creation failed:", error);
    res.status(500).json({ success: false, message: "Task creation failed", error });
  }
});


// 📄 Get All Tasks for the logged-in user
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.userId });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks", error });
  }
});

// ✏️ Update Task
router.put("/:id", async (req, res) => {
  try {
    const updatedTask = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      req.body,
      { new: true }
    );
    if (!updatedTask) return res.status(404).json({ msg: "Task not found or not authorized" });
    res.json({ success: true, task: updatedTask });
  } catch (error) {
    res.status(500).json({ success: false, message: "Update failed", error });
  }
});

// 🗑️ Delete Task
router.delete("/:id", async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.userId });
    if (!task) return res.status(404).json({ msg: "Task not found or not authorized" });
    res.json({ msg: "Task deleted successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
