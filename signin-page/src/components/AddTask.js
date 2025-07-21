// signin-page/src/components/AddTask.js
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "./AddTask.css"; // Reuse your modal styles
import axios from "axios";

const AddTask = ({ projectId: propProjectId, onUpdate }) => {
  const { projectId: urlProjectId } = useParams();
  const projectId = propProjectId || urlProjectId;

  const [showPopup, setShowPopup] = useState(false);
  const [form, setForm] = useState({
    name: "",
    priority: "Low",
    status: "To Do",
    description: "",
    deadline: "",
  });

  const togglePopup = () => {
    setShowPopup((prev) => !prev);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `http://localhost:5000/api/projects/${projectId}/tasks`,
        form,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log("Task added:", res.data);
      togglePopup(); // close modal
      setForm({ name: "", priority: "Low", status: "To Do", description: "", deadline: "" });
      if (onUpdate) onUpdate(); // inform parent to refresh
    } catch (err) {
      console.error("Error adding task:", err.response?.data || err.message);
      alert(err.response?.data?.error || "Failed to add task");
    }
  };

  return (
    <div>
      <button className="add-task-btn" onClick={togglePopup}>
        + Add Task
      </button>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-card">
            <h2 className="popup-title">Add New Task</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Task Name"
                required
              />

              <select name="priority" value={form.priority} onChange={handleChange}>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>

              <select name="status" value={form.status} onChange={handleChange}>
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>

              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Description"
              />

              <input
                type="date"
                name="deadline"
                value={form.deadline}
                onChange={handleChange}
              />

              <div className="popup-buttons">
                <button type="submit">Add Task</button>
                <button type="button" onClick={togglePopup}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddTask;
