import React, { useEffect, useState, useCallback } from "react";
import {
  getProjects,
  deleteProject,
  deleteTask,
  updateProject,
  addTask,
  updateTask,
} from "../api";

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
    try {
      await deleteProject(projectId);
      fetchProjects();
    } catch (err) {
      console.error("Failed to delete project:", err);
    }
  };

  const handleEditTaskClick = (task) => {
    setSelectedTask(task);
    setIsNewTask(false);
    setShowEditTaskModal(true);
  };

  const handleAddTaskClick = (projectId) => {
    const project = projects.find((p) => p._id === projectId);
    setSelectedProject(project);
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
    try {
      await deleteTask(taskId);
      fetchProjects();
    } catch (err) {
      console.error("Failed to delete task:", err);
    }
  };

  const handleSaveProject = async (formData) => {
    try {
      await updateProject(selectedProject._id, formData);
      setShowEditProjectModal(false);
      fetchProjects();
    } catch (err) {
      console.error("Failed to update project:", err);
    }
  };

  const handleSaveTask = async (formData) => {
    try {
      if (isNewTask) {
        await addTask(selectedProject._id, formData);
      } else {
        await updateTask(selectedTask._id, formData);
      }
      setShowEditTaskModal(false);
      fetchProjects();
    } catch (err) {
      console.error("Failed to save task:", err);
    }
  };

  return (
    <div className="projects-container">
      {projects.map((project) => (
        <div key={project._id} className="project-card">
          <div className="project-header">
            <h3>{project.name}</h3>
            <div className="action-buttons">
              <button className="btn" onClick={() => handleEditProjectClick(project)}>
                Edit Project
              </button>
              <button
                className="btn btn-danger"
                onClick={() => handleDeleteProject(project._id)}
              >
                Delete Project
              </button>
            </div>
          </div>
          <p>{project.description}</p>
          <div className="task-list">
            {project.tasks?.map((task) => (
              <div key={task._id} className="task-card">
                <div className="task-info">
                  <h4>{task.name}</h4>
                  <p>{task.description}</p>
                  <p>Priority: {task.priority}</p>
                  <p>Status: {task.status}</p>
                  <p>Due: {task.deadline?.slice(0, 10)}</p>
                </div>
                <div className="action-buttons">
                  <button className="btn" onClick={() => handleEditTaskClick(task)}>
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDeleteTask(project._id, task._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
            <button className="btn add-task-btn" onClick={() => handleAddTaskClick(project._id)}>
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
