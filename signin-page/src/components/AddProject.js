import React, { useState } from "react";
import { addProject } from "../api";
import "./AddProject.css";

const AddProject = ({ onProjectAdded }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");

  const handleAddProject = async () => {
    if (!projectName.trim()) return alert("Enter project name");

    try {
      const res = await addProject({ name: projectName, description: projectDescription });

      if (res && res.success) {
        setProjectName("");
        setProjectDescription("");
        setIsModalOpen(false);
        onProjectAdded();

        // Wait for modal to visually close before alerting
        requestAnimationFrame(() => {
          setTimeout(() => {
            alert("Project added!");
          }, 0);
        });
      } else {
        alert(res?.message || "Project creation failed");
      }
    } catch (err) {
      console.error("Add Project Error:", err);
      alert("Server error");
    }
  };

  return (
    <>
      <div className="add-project-card" onClick={() => setIsModalOpen(true)}>
        <span className="add-plus">+ Add Project</span>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-card">
            <h2>Add New Project</h2>
            <input
              type="text"
              placeholder="Project Name"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
            />
            <textarea
              placeholder="Project Description"
              value={projectDescription}
              onChange={(e) => setProjectDescription(e.target.value)}
              rows={4}
            />
            <div className="modal-buttons">
              <button className="add-btn" onClick={handleAddProject}>Add</button>
              <button className="cancel-btn" onClick={() => setIsModalOpen(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddProject;
