import React from 'react';
import { FaUserCircle } from 'react-icons/fa';

const Navbar = () => {
  return (
    <div style={{
      height: '60px',
      backgroundColor: '#fff',
      borderBottom: '1px solid #e5e7eb',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 24px'
    }}>
      <h3 style={{ color: '#7c3aed', fontWeight: '700' }}>Hey, Hexagon</h3>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#374151' }}>
        <FaUserCircle size={22} />
        <span style={{ fontSize: '14px' }}>hexagon@gmail.com</span>
      </div>
    </div>
  );
};

export default Navbar;
