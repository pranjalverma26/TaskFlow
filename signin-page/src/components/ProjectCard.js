// signin-page/src/components/ProjectCard.js
import React, { useState } from "react";
import AddTask from "./AddTask";
import "./ProjectCard.css"; // you can reuse the AddTask styles

const ProjectCard = ({ project }) => {
  const [refresh, setRefresh] = useState(false);

  const handleUpdate = () => {
    // Trigger re-fetch of tasks or project data if needed
    setRefresh((prev) => !prev);
  };

  return (
    <div className="project-card">
      <h2 className="project-title">{project.name}</h2>

      {/* Display other project details here if needed */}
      <p className="project-desc">{project.description || "No description"}</p>

      {/* Reuse AddTask component for modal */}
      <AddTask projectId={project._id} onUpdate={handleUpdate} />
    </div>
  );
};

export default ProjectCard;
