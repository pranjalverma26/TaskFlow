import React, { useEffect, useState } from "react";
import { getTasks, updateTask } from "../api";
import "./PendingProjects.css"; // Your styles including modal styles below

// Modal component to edit a task
const EditTaskModal = ({ task, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: task.name || "",
    description: task.description || "",
    deadline: task.deadline ? task.deadline.substring(0, 10) : "", // format yyyy-mm-dd
    priority: task.priority || "Low",
    status: task.status || "Pending",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <div className="modal-header">
          <h3 className="modal-title">Edit Task</h3>
          <button className="close-btn" onClick={onClose}>
            &times;
          </button>
        </div>

        <form className="modal-form" onSubmit={handleSubmit}>
          <label>
            Task Name
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Description
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </label>

          <label>
            Deadline
            <input
              type="date"
              name="deadline"
              value={formData.deadline}
              onChange={handleChange}
            />
          </label>

          <label>
            Priority
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </label>

          <label>
            Status
            <select name="status" value={formData.status} onChange={handleChange}>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </label>

          <button type="submit" className="submit-btn">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

const PendingProjects = () => {
  const [tasks, setTasks] = useState([]);
  const [editTask, setEditTask] = useState(null);

  const fetchTasks = async () => {
    try {
      const data = await getTasks();
      const pending = data.filter((task) => task.status !== "Completed");
      setTasks(pending);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleSave = async (updatedData) => {
    try {
      await updateTask(editTask._id, updatedData);
      setEditTask(null);
      fetchTasks();
    } catch (err) {
      console.error("Failed to update task:", err);
    }
  };

  return (
    <div className="pending-task-page">
      <h2>Pending Tasks</h2>
      {tasks.length === 0 ? (
        <p>No pending tasks.</p>
      ) : (
        tasks.map((task) => (
          <div className="task-card" key={task._id}>
            <h4>
              {task.name}{" "}
              <span className={`priority ${task.priority?.toLowerCase()}`}>
                {task.priority}
              </span>
            </h4>
            <p>{task.description}</p>
            <small>
              Due:{" "}
              {task.deadline
                ? new Date(task.deadline).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : "No deadline"}
            </small>
            <br />
            <button onClick={() => setEditTask(task)}>✏️ Edit</button>
          </div>
        ))
      )}

      {editTask && (
        <EditTaskModal
          task={editTask}
          onClose={() => setEditTask(null)}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default PendingProjects;
