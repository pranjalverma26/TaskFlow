const express = require("express");
const jwt = require("jsonwebtoken");
const Task = require("../models/Task");
const Project = require("../models/Project");

const router = express.Router();

// Middleware to verify JWT and attach user ID
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

router.use(authMiddleware);

// 1️⃣ GET all tasks for the logged-in user OR tasks without user
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find({
      $or: [
        { user: req.userId },
        { user: { $exists: false } }
      ]
    });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks", error });
  }
});

// 2️⃣ GET all tasks for a specific project OR tasks without user
router.get("/:projectId", async (req, res) => {
  try {
    const tasks = await Task.find({
      project: req.params.projectId,
      $or: [
        { user: req.userId },
        { user: { $exists: false } }
      ]
    });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks", error });
  }
});

// 3️⃣ Create Task under a project
router.post("/:projectId", async (req, res) => {
  try {
    const { projectId } = req.params;

    const task = new Task({
      ...req.body,
      user: req.userId,
      project: projectId,
    });

    await task.save();

    // Add task ID to the project document
    await Project.findByIdAndUpdate(
      projectId,
      { $push: { tasks: task._id } },
      { new: true }
    );

    res.status(201).json({ success: true, task });
  } catch (error) {
    console.error("Task creation failed:", error);
    res.status(500).json({ success: false, message: "Task creation failed", error });
  }
});

// 4️⃣ Update Task
router.put("/:id", async (req, res) => {
  try {
    const updatedTask = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      req.body,
      { new: true }
    );
    if (!updatedTask)
      return res.status(404).json({ msg: "Task not found or not authorized" });

    res.json({ success: true, task: updatedTask });
  } catch (error) {
    res.status(500).json({ success: false, message: "Update failed", error });
  }
});

// 5️⃣ Delete Task
// 5️⃣ Delete Task
router.delete("/:id", async (req, res) => {
  try {
    // Find task by ID first
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ msg: "Task not found" });
    }

    // Optional: Check user authorization only if task has user field
    if (task.user && task.user.toString() !== req.userId) {
      return res.status(403).json({ msg: "Not authorized to delete this task" });
    }

    // Delete the task
    await Task.findByIdAndDelete(req.params.id);

    // Remove task ID from its project.tasks array (if project exists)
    if (task.project) {
      await Project.findByIdAndUpdate(task.project, {
        $pull: { tasks: task._id },
      });
    }

    res.json({ msg: "Task deleted successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});


module.exports = router;
