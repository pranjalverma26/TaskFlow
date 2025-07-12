import React, { useState, useEffect } from "react";
import { addTask, updateTask } from "./api";
import "./AddTask.css";

const AddTask = ({ initialData = null, onUpdate = null }) => {
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "Low",
    deadline: "",
    status: "In Progress",
  });

  useEffect(() => {
    if (initialData) {
      setForm(initialData);
      setShowModal(true);
    }
  }, [initialData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res;
      if (initialData && initialData._id) {
        res = await updateTask(initialData._id, form);
      } else {
        res = await addTask(form);
      }

      if (res.success || res.task) {
        console.log("Task Saved/Updated:", res.task || form);
        setShowModal(false);
        setForm({
          title: "",
          description: "",
          priority: "Low",
          deadline: "",
          status: "In Progress",
        });
        if (onUpdate) onUpdate(); 
      } else {
        alert("Failed to save changes.");
      }
    } catch (err) {
      console.error("Error saving task:", err);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="add-task-container">
      {!initialData && (
        <button className="add-task-button" onClick={() => setShowModal(true)}>
          + Add Task
        </button>
      )}

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <div className="modal-header">
              <span className="modal-title">
                {initialData ? "✏️ Edit Task" : "+ Create New Task"}
              </span>
              <button className="close-btn" onClick={() => setShowModal(false)}>
                ×
              </button>
            </div>

            <form className="modal-form" onSubmit={handleSubmit}>
              <label>Task Title</label>
              <input
                type="text"
                name="title"
                placeholder="Task Title"
                value={form.title}
                onChange={handleChange}
                required
              />

              <label>Description</label>
              <textarea
                name="description"
                placeholder="Task Description"
                value={form.description}
                onChange={handleChange}
                required
              ></textarea>

              <div className="form-row">
                <div className="form-group">
                  <label>Priority</label>
                  <select name="priority" value={form.priority} onChange={handleChange}>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Due Date</label>
                  <input
                    type="date"
                    name="deadline"
                    value={form.deadline}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <label>Status</label>
              <div className="status-options">
                <label>
                  <input
                    type="radio"
                    name="status"
                    value="Completed"
                    checked={form.status === "Completed"}
                    onChange={handleChange}
                  />{" "}
                  Completed
                </label>
                <label>
                  <input
                    type="radio"
                    name="status"
                    value="In Progress"
                    checked={form.status === "In Progress"}
                    onChange={handleChange}
                  />{" "}
                  In Progress
                </label>
              </div>

              <button type="submit" className="submit-btn">
                {initialData ? "✏️ Update Task" : "+ Create Task"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddTask;
