import React, { useEffect, useState } from "react";
import { getTasks } from "./api";
import "./CompletedProjects.css";

const CompletedProjects = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const data = await getTasks();
      const completed = data.filter((task) => task.status === "Completed");
      setTasks(completed);
    };
    fetchTasks();
  }, []);

  return (
    <div className="completed-task-page">
      <h2>Completed Tasks</h2>
      {tasks.length === 0 ? (
        <p>No completed tasks.</p>
      ) : (
        tasks.map((task) => (
          <div className="task-card" key={task._id}>
            <h4>
              {task.title}{" "}
              <span className={`priority ${task.priority.toLowerCase()}`}>
                {task.priority}
              </span>
            </h4>
            <p>{task.description}</p>
            <small>Due: {task.deadline}</small>
          </div>
        ))
      )}
    </div>
  );
};

export default CompletedProjects;
