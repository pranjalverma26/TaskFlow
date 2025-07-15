const API = "http://localhost:5000/api";

// Utility to get the token header for auth-protected routes
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
  console.log("SIGNIN RESPONSE:", data); // ✅ Debugging
  return data;
};

// 📝 Add a new task
export const addTask = async (payload) => {
  const res = await fetch(`${API}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeader(), // 🔐 Auth header
    },
    body: JSON.stringify(payload),
  });
  return res.json();
};

// 📄 Get all tasks for the current user
export const getTasks = async () => {
  const res = await fetch(`${API}/tasks`, {
    headers: {
      ...getAuthHeader(), // 🔐 Auth header
    },
  });
  return res.json();
};

// ✏️ Update a specific task by ID
export const updateTask = async (id, payload) => {
  const res = await fetch(`${API}/tasks/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeader(), // 🔐 Auth header
    },
    body: JSON.stringify(payload),
  });
  return res.json();
};

// 🗑️ Delete a specific task by ID
export const deleteTask = async (id) => {
  try {
    const res = await fetch(`${API}/tasks/${id}`, {
      method: "DELETE",
      headers: {
        ...getAuthHeader(), // 🔐 Auth header
      },
    });
    return await res.json();
  } catch (err) {
    console.error("Failed to delete task", err);
    return { msg: "Deletion failed" };
  }
};
