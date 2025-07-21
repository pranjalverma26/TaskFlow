import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaTachometerAlt, FaTasks, FaCheckCircle,  FaFolderPlus, FaFolderOpen } from 'react-icons/fa'; // ⬅ Added FaFolderOpen icon
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar-modern">
      <div className="top-section">
        <div className="logo-area">
          <span role="img" aria-label="bolt">⚡</span>
          <span className="logo-text">TaskFlow</span>
        </div>

        <div className="nav-links">
          <NavLink to="/" end className="nav-link">
            <FaTachometerAlt /> Dashboard
          </NavLink>
          <NavLink to="/pending" className="nav-link">
            <FaTasks /> Pending Tasks
          </NavLink>
          <NavLink to="/completed" className="nav-link">
            <FaCheckCircle /> Completed Tasks
          </NavLink>
        </div>

        {/* Projects Section */}
        <div className="projects-section" style={{ marginTop: '2rem' }}>
          <div style={{ fontWeight: 'bold', fontSize: '0.9rem', marginBottom: '0.8rem', color: '#6c2bd9' }}>
            PROJECTS
          </div>
          <NavLink to="/add-project" className="nav-link">
            <FaFolderPlus /> Add Project
          </NavLink>

          {/* ✅ View Projects Link */}
          <NavLink to="/projects" className="nav-link">
            <FaFolderOpen /> View Projects
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
