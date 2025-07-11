import React from 'react';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      {/* Top Summary Cards */}
      <div className="summary-cards">
        <Card title="Total Tasks" count={2} />
        <Card title="Low Priority" count={2} color="green" />
        <Card title="Medium Priority" count={0} color="orange" />
        <Card title="High Priority" count={0} color="red" />
      </div>

      {/* Filters */}
      <div className="filters">
        {['All', 'Today', 'Week', 'High', 'Medium', 'Low'].map((filter) => (
          <button key={filter}>{filter}</button>
        ))}
      </div>

      {/* Content Area */}
      <div className="main-content">
        {/* Left: Task List */}
        <div className="task-list">
          <TaskCard title="Task 2" tag="Low" due="May 05" note="ASAP DO IT NOW" status="Pending" />
          <TaskCard title="Task New" tag="Low" due="May 01" note="ASAP" status="Done" />
        </div>

        {/* Right: Statistics */}
        <div className="task-stats">
          <div className="stat-box">
            <h4>Task Statistics</h4>
            <div className="stat-item"><span>Total Tasks</span><span>2</span></div>
            <div className="stat-item"><span>Completed</span><span>1</span></div>
            <div className="stat-item"><span>Pending</span><span>1</span></div>
            <div className="stat-item"><span>Completion Rate</span><span>50%</span></div>
            <div className="progress-bar">
              <div className="progress" style={{ width: '50%' }} />
            </div>
          </div>

          <div className="stat-box">
            <h4>Recent Activity</h4>
            <div className="activity-item"><strong>Task 2</strong><span>Pending</span></div>
            <div className="activity-item"><strong>Task New</strong><span>Done</span></div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Card = ({ title, count, color = 'purple' }) => (
  <div className={`card card-${color}`}>
    <span>{title}</span>
    <h3>{count}</h3>
  </div>
);

const TaskCard = ({ title, tag, due, note, status }) => (
  <div className="task-card">
    <div>
      <h4>{title} <span className={`tag tag-${tag.toLowerCase()}`}>{tag}</span></h4>
      <p>{note}</p>
    </div>
    <div className="task-footer">
      <span>📅 {due}</span>
      <span className={`status ${status.toLowerCase()}`}>{status}</span>
    </div>
  </div>
);

export default Dashboard;
