import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import { getTasks } from './api';
import { FaClipboardList, FaCheckCircle, FaHourglassHalf, FaChartPie } from 'react-icons/fa';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getTasks();
        setTasks(data);
        setFilteredTasks(data);
      } catch (err) {
        console.error("Failed to fetch tasks", err);
      }
    };
    fetchTasks();
  }, []);

  useEffect(() => {
    const now = new Date();
    const thisWeek = new Date();
    thisWeek.setDate(now.getDate() + 7);

    let filtered = [...tasks];
    if (filter === 'Today') {
      filtered = tasks.filter(t => new Date(t.deadline).toDateString() === now.toDateString());
    } else if (filter === 'Week') {
      filtered = tasks.filter(t => new Date(t.deadline) <= thisWeek);
    } else if (['High', 'Medium', 'Low'].includes(filter)) {
      filtered = tasks.filter(t => t.priority === filter);
    }
    setFilteredTasks(filtered);
  }, [filter, tasks]);

  const totalTasks = tasks.length;
  const completed = tasks.filter(task => task.status === 'Completed');
  const pending = tasks.filter(task => task.status !== 'Completed');

  const low = tasks.filter(t => t.priority === 'Low').length;
  const med = tasks.filter(t => t.priority === 'Medium').length;
  const high = tasks.filter(t => t.priority === 'High').length;

  const completionRate = totalTasks === 0 ? 0 : Math.round((completed.length / totalTasks) * 100);

  return (
    <div className="dashboard-container">
      <div className="summary-cards">
        <Card title="Total Tasks" count={totalTasks} icon={<FaClipboardList />} />
        <Card title="Low Priority" count={low} color="green" />
        <Card title="Medium Priority" count={med} color="orange" />
        <Card title="High Priority" count={high} color="red" />
      </div>

      <div className="filters">
        {['All', 'Today', 'Week', 'High', 'Medium', 'Low'].map((f) => (
          <button
            key={f}
            className={filter === f ? 'active' : ''}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="main-content">
        <div className="task-list">
          {filteredTasks.map(task => (
            <TaskCard
              key={task._id}
              title={task.title}
              tag={task.priority}
              due={task.deadline}
              note={task.description}
              status={task.status === "Completed" ? "Done" : "Pending"}
            />
          ))}
        </div>

        <div className="task-stats-cards side-grid">
          <Card title="Total Tasks" count={totalTasks} color="blue" icon={<FaClipboardList />} />
          <Card title="Completed" count={completed.length} color="green" icon={<FaCheckCircle />} />
          <Card title="Pending" count={pending.length} color="orange" icon={<FaHourglassHalf />} />
          <Card title="Completion Rate" count={`${completionRate}%`} color="purple" icon={<FaChartPie />} />
        </div>
      </div>
    </div>
  );
};
const Card = ({ title, count, color = 'purple', icon }) => (
  <div className={`card card-${color}`}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <span>{title}</span>
      {icon && <span>{icon}</span>}
    </div>
    <h3>{count}</h3>

    {/* Only show progress bar for Completion Rate */}
    {title === 'Completion Rate' && (
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: count }}></div>
      </div>
    )}
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
