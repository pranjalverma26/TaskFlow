import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaClock, FaCheckCircle } from 'react-icons/fa';

const linkStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  padding: '12px 16px',
  textDecoration: 'none',
  borderRadius: '8px',
  fontWeight: '500',
  color: '#4b5563',
  transition: 'all 0.2s ease'
};

const activeStyle = {
  backgroundColor: '#ede9fe',
  color: '#7c3aed',
  fontWeight: '600'
};

const Sidebar = () => {
  return (
    <div style={{
      width: '250px',
      backgroundColor: '#fff',
      borderRight: '1px solid #e5e7eb',
      display: 'flex',
      flexDirection: 'column',
      padding: '20px'
    }}>
      <h2 style={{ color: '#7c3aed', marginBottom: '30px' }}>TaskFlow</h2>

      <NavLink to="/" style={({ isActive }) => isActive ? { ...linkStyle, ...activeStyle } : linkStyle}>
        <FaHome /> Dashboard
      </NavLink>
      <NavLink to="/pending" style={({ isActive }) => isActive ? { ...linkStyle, ...activeStyle } : linkStyle}>
        <FaClock /> Pending Tasks
      </NavLink>
      <NavLink to="/completed" style={({ isActive }) => isActive ? { ...linkStyle, ...activeStyle } : linkStyle}>
        <FaCheckCircle /> Completed Tasks
      </NavLink>

      {/* Optional Pro Tip Section */}
      <div style={{
        marginTop: '40px',
        backgroundColor: '#f3f4f6',
        padding: '12px',
        borderRadius: '8px',
        fontSize: '12px',
        color: '#6b7280'
      }}>
        <strong>Pro Tip</strong><br />
        Use keyboard shortcuts to boost productivity!
      </div>
    </div>
  );
};

export default Sidebar;
