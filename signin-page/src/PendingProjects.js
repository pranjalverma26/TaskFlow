import React, { useEffect, useState } from "react";
import { getTasks } from "./api";
import AddTask from "./AddTask"; // ⬅ import your modal component
import "./PendingProjects.css";

const PendingProjects = () => {
  const [tasks, setTasks] = useState([]);
  const [editTask, setEditTask] = useState(null);

  const fetchTasks = async () => {
    const data = await getTasks();
    const pending = data.filter((task) => task.status !== "Completed");
    setTasks(pending);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="pending-task-page">
      <h2>Pending Tasks</h2>
      {tasks.length === 0 ? (
        <p>No pending tasks.</p>
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
            <br />
            <button onClick={() => setEditTask(task)}>✏️ Edit</button>
          </div>
        ))
      )}

      {/* Modal for editing task */}
      {editTask && (
        <AddTask
          initialData={editTask}
          onUpdate={() => {
            fetchTasks();
            setEditTask(null); // close modal after update
          }}
        />
      )}
    </div>
  );
};

export default PendingProjects;
