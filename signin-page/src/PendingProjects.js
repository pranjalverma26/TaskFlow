import React from 'react';

const PendingProjects = () => {
  return (
    <div style={{ display: 'flex', gap: '20px' }}>
      {/* Left: Tasks */}
      <div style={{ flex: 3 }}>
        <h2>Pending Task</h2>
        <p>1 task needing your attention</p>
        <div style={{
          border: '2px dashed #d1d5db',
          padding: '20px',
          margin: '20px 0',
          borderRadius: '10px',
          textAlign: 'center',
          color: '#7c3aed',
          cursor: 'pointer'
        }}>
          + Add New Task
        </div>
        <div style={{
          background: 'white',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0 1px 5px rgba(0,0,0,0.1)'
        }}>
          <strong>Task 2 <span style={{ background: '#d1fae5', color: '#065f46', padding: '2px 8px', borderRadius: '10px', fontSize: '12px' }}>Low</span></strong>
          <p>ASAP DO IT NOW</p>
        </div>
      </div>

      {/* Right: Task stats */}
      <div style={{ flex: 2 }}>
        <div style={{
          background: 'white',
          padding: '20px',
          borderRadius: '10px',
          marginBottom: '20px',
          boxShadow: '0 1px 5px rgba(0,0,0,0.1)'
        }}>
          <h3>Task Statistics</h3>
          <p>Total Tasks: 2</p>
          <p>Completed: 1</p>
          <p>Pending: 1</p>
          <p>Completion Rate: 50%</p>
          <div style={{ height: '8px', background: '#e5e7eb', borderRadius: '4px', marginTop: '10px' }}>
            <div style={{ width: '50%', height: '100%', background: '#7c3aed', borderRadius: '4px' }}></div>
          </div>
        </div>

        <div style={{
          background: 'white',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0 1px 5px rgba(0,0,0,0.1)'
        }}>
          <h3>Recent Activity</h3>
          <p>Task 2 - <span style={{ color: '#f59e0b' }}>Pending</span></p>
          <p>Task New - <span style={{ color: '#10b981' }}>Done</span></p>
        </div>
      </div>
    </div>
  );
};

export default PendingProjects;
