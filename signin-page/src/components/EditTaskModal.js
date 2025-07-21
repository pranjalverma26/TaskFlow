// src/components/EditTaskModal.js
import React, { useState, useEffect } from "react";
import "./EditTaskModal.css";

const EditTaskModal = ({ task, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: "", // changed from title to name
    description: "",
    priority: "Low",
    status: "Pending",
    deadline: "", // changed from dueDate to deadline
  });

  useEffect(() => {
    if (task) {
      setFormData({
        name: task.name || "", // changed from title
        description: task.description || "",
        priority: task.priority || "Low",
        status: task.status || "Pending",
        deadline: task.deadline ? task.deadline.slice(0, 10) : "", // changed from dueDate
      });
    }
  }, [task]);

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
          <h2 className="modal-title">Edit Task</h2>
          <button className="close-btn" onClick={onClose}>
            &times;
          </button>
        </div>
        <form className="modal-form" onSubmit={handleSubmit}>
          <label>Task Name</label>
          <input
            type="text"
            name="name" // changed from title
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
          />

          <label>Priority</label>
          <select name="priority" value={formData.priority} onChange={handleChange}>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>

          <label>Status</label>
          <select name="status" value={formData.status} onChange={handleChange}>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>

          <label>Deadline</label>
          <input
            type="date"
            name="deadline" // changed from dueDate
            value={formData.deadline}
            onChange={handleChange}
          />

          <button type="submit" className="submit-btn">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditTaskModal;
