const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth");
const Project = require("../models/Project");
const Task = require("../models/Task");

// ✅ CREATE A NEW PROJECT
router.post("/", authMiddleware, async (req, res) => {
  const { name, description } = req.body;

  if (!name) return res.status(400).json({ error: "Project name is required" });

  try {
    const newProject = new Project({
      name,
      description,
      createdBy: req.user.id,
    });

    await newProject.save();
    res.status(201).json({ message: "Project created", project: newProject });
  } catch (error) {
    console.error("Error creating project:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ UPDATE PROJECT NAME OR DESCRIPTION
router.put("/:projectId", authMiddleware, async (req, res) => {
  try {
    const { projectId } = req.params;
    const { name, description } = req.body;

    const project = await Project.findOneAndUpdate(
      { _id: projectId, createdBy: req.user.id },
      { name, description },
      { new: true }
    );

    if (!project) {
      return res.status(404).json({ message: "Project not found or unauthorized" });
    }

    res.status(200).json({ message: "Project updated", project });
  } catch (error) {
    console.error("Error updating project:", error);
    res.status(500).json({ message: "Server error" });
  }
});



// ✅ GET ALL PROJECTS (WITH TASKS)
router.get("/", authMiddleware, async (req, res) => {
  try {
    const projects = await Project.find({ createdBy: req.user.id }).populate("tasks");
    res.json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ ADD TASK TO A PROJECT (USING ENUM STATUS AND PRIORITY)
router.post("/:projectId/tasks", authMiddleware, async (req, res) => {
  try {
    const { projectId } = req.params;
    const { name, priority, status, description, deadline } = req.body;

    // Create new task with enum-compliant values
    const newTask = new Task({
      name,
      priority,        // enum: ["Low", "Medium", "High"]
      status,          // enum: ["Pending", "In Progress", "Completed"]
      description,
      deadline,
      project: projectId,
    });

    await newTask.save();

    // Link task to project
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    project.tasks.push(newTask._id);
    await project.save();

    res.status(201).json({ message: "Task added to project", task: newTask });
  } catch (err) {
    console.error("Error adding task to project:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ DELETE A PROJECT (AND ITS TASKS)
router.delete("/:projectId", authMiddleware, async (req, res) => {
  try {
    const { projectId } = req.params;

    // Step 1: Find the project
    const project = await Project.findOne({ _id: projectId, createdBy: req.user.id });

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Step 2: Delete all tasks associated with the project
    await Task.deleteMany({ project: projectId });

    // Step 3: Delete the project itself
    await Project.findByIdAndDelete(projectId);

    res.status(200).json({ success: true, message: "Project and its tasks deleted" });
  } catch (error) {
    console.error("Error deleting project:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});


module.exports = router;
