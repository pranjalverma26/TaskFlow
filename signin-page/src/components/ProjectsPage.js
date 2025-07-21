import React, { useEffect, useState, useCallback } from "react";
import {
  getProjects,
  deleteProject,
  deleteTask,
  updateProject,
  addTask,
  updateTask,
} from "../api"; // adjust the path if needed

import "./ProjectsPage.css";
import EditProjectModal from "./EditProjectModal";
import EditTaskModal from "./EditTaskModal";

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showEditProjectModal, setShowEditProjectModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showEditTaskModal, setShowEditTaskModal] = useState(false);
  const [isNewTask, setIsNewTask] = useState(false);

  const fetchProjects = useCallback(async () => {
    try {
      const data = await getProjects();
      setProjects(data);
    } catch (err) {
      console.error("Error fetching projects:", err);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const handleEditProjectClick = (project) => {
    setSelectedProject(project);
    setShowEditProjectModal(true);
  };

  const handleDeleteProject = async (projectId) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;
    await deleteProject(projectId);
    fetchProjects();
  };

  const handleEditTaskClick = (task) => {
    setSelectedTask(task);
    setIsNewTask(false);
    setShowEditTaskModal(true);
  };

  const handleAddTaskClick = (projectId) => {
    setSelectedProject(projects.find((p) => p._id === projectId));
    setSelectedTask({
      name: "",
      description: "",
      priority: "Low",
      status: "Pending",
      deadline: "",
    });
    setIsNewTask(true);
    setShowEditTaskModal(true);
  };

  const handleDeleteTask = async (projectId, taskId) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    await deleteTask(taskId);
    fetchProjects();
  };

  const handleSaveProject = async (formData) => {
    await updateProject(selectedProject._id, formData);
    setShowEditProjectModal(false);
    fetchProjects();
  };

  const handleSaveTask = async (formData) => {
    if (isNewTask) {
      await addTask(selectedProject._id, formData);
    } else {
      await updateTask(selectedTask._id, formData);
    }
    setShowEditTaskModal(false);
    fetchProjects();
  };

  return (
    <div className="projects-container">
      {projects.map((project) => (
        <div key={project._id} className="project-card">
          <div className="project-header">
            <h3>{project.name}</h3>
            <div className="project-actions">
              <button onClick={() => handleEditProjectClick(project)}>Edit Project</button>
              <button onClick={() => handleDeleteProject(project._id)} className="delete-project-btn">
                Delete Project
              </button>
            </div>
          </div>
          <p>{project.description}</p>
          <div className="task-list">
            {project.tasks?.map((task) => (
              <div key={task._id} className="task-card">
                <div className="task-info">
                  <h4>{task.name}</h4> {/* ✅ Changed from task.title */}
                  <p>{task.description}</p>
                  <p>Priority: {task.priority}</p>
                  <p>Status: {task.status}</p>
                  <p>Due: {task.deadline?.slice(0, 10)}</p>
                </div>
                <div className="task-actions">
                  <button onClick={() => handleEditTaskClick(task)}>Edit</button>
                  <button
                    onClick={() => handleDeleteTask(project._id, task._id)}
                    className="delete-task-btn"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
            <button className="add-task-btn" onClick={() => handleAddTaskClick(project._id)}>
              + Add Task
            </button>
          </div>
        </div>
      ))}

      {showEditProjectModal && (
        <EditProjectModal
          project={selectedProject}
          onClose={() => setShowEditProjectModal(false)}
          onSave={handleSaveProject}
        />
      )}

      {showEditTaskModal && (
        <EditTaskModal
          task={selectedTask}
          onClose={() => setShowEditTaskModal(false)}
          onSave={handleSaveTask}
        />
      )}
    </div>
  );
};

export default ProjectsPage;
