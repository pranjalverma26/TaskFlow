import React, { useEffect, useState } from "react";
import { getTasks, deleteTask } from "./api";
import "./CompletedProjects.css";

const CompletedProjects = () => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const data = await getTasks();
    const completed = data.filter((task) => task.status === "Completed");
    setTasks(completed);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDelete = async (id) => {
    await deleteTask(id);
    fetchTasks(); // Refresh the list
  };

  return (
    <div className="completed-task-page">
      <h2>Completed Tasks</h2>
      {tasks.length === 0 ? (
        <p>No completed tasks.</p>
      ) : (
        tasks.map((task) => (
          <div className="task-card" key={task._id}>
            <div className="task-header">
              <h4>
                {task.title}{" "}
                <span className={`priority ${task.priority.toLowerCase()}`}>
                  {task.priority}
                </span>
              </h4>
              <button
                className="delete-btn"
                onClick={() => handleDelete(task._id)}
              >
                ❌
              </button>
            </div>
            <p>{task.description}</p>
            <small>Due: {task.deadline}</small>
          </div>
        ))
      )}
    </div>
  );
};

export default CompletedProjects;
