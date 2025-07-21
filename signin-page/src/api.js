const API = "http://localhost:5000/api";

// 🔐 Utility to get the token header
const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// 🔐 Sign Up a new user
export const signup = async (payload) => {
  const res = await fetch(`${API}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return res.json();
};

// 🔐 Sign In an existing user
export const signin = async (payload) => {
  const res = await fetch(`${API}/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  console.log("SIGNIN RESPONSE:", data);
  return data;
};

// 📝 Add Task
export const addTask = async (projectId, payload) => {
  const res = await fetch(`${API}/tasks/${projectId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeader(),
    },
    body: JSON.stringify(payload),
  });

  return res.json();
};


// 📥 Get all tasks
export const getTasks = async () => {
  const res = await fetch(`${API}/tasks`, {
    headers: { ...getAuthHeader() },
  });
  const data = await res.json();
  if (!Array.isArray(data)) {
    console.error("Invalid tasks response:", data);
    return [];
  }
  return data;
};

// 🗑️ Delete project
export const deleteProject = async (projectId) => {
  const res = await fetch(`${API}/projects/${projectId}`, {
    method: "DELETE",
    headers: {
      ...getAuthHeader(),
    },
  });
  return res.json();
};

// ✏️ Update Project
export const updateProject = async (projectId, payload) => {
  const res = await fetch(`${API}/projects/${projectId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeader(),
    },
    body: JSON.stringify(payload),
  });

  return res.json();
};


// ✏️ Update task
export const updateTask = async (id, payload) => {
  const res = await fetch(`${API}/tasks/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeader(),
    },
    body: JSON.stringify(payload),
  });
  return res.json();
};

// 🗑️ Delete task
export const deleteTask = async (id) => {
  try {
    const res = await fetch(`${API}/tasks/${id}`, {
      method: "DELETE",
      headers: {
        ...getAuthHeader(),
      },
    });
    return await res.json();
  } catch (err) {
    console.error("Failed to delete task", err);
    return { msg: "Deletion failed" };
  }
};

// 📁 Add Project
export const addProject = async (payload) => {
  const res = await fetch(`${API}/projects`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeader(),
    },
    body: JSON.stringify(payload),
  });
  return res.json();
};

export const getProjects = async () => {
  const res = await fetch(`${API}/projects`, {
    headers: {
      ...getAuthHeader(),
    },
  });

  const data = await res.json();

  // Add safety check
  if (Array.isArray(data)) return data;
  if (Array.isArray(data.projects)) return data.projects; // in case it's nested

  console.error("Unexpected projects response:", data);
  return [];
};
