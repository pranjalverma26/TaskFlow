import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaTachometerAlt, FaTasks, FaCheckCircle, FaPlus } from 'react-icons/fa';
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
          <NavLink to="/add-task" className="nav-link">
            <FaPlus /> Add Task
          </NavLink>
        </div>
      </div>

      
    </div>
  );
};

export default Sidebar;
