import React from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';

const DashboardLayout = () => {
  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: '#f9f5ff' }}>
   
      <Sidebar />

      {}
      <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        {}
        <Navbar />

        {}
        <div
          style={{
            padding: '1.5rem',
            flexGrow: 1,
            overflowY: 'auto',
            backgroundColor: '#f9f5ff',
          }}
        >
          {}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
