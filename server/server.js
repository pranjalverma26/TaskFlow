const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const taskRoutes = require("./routes/tasks"); // Ensure this file exists

const app = express();
app.use(cors());
app.use(express.json());

// Your actual backend routes
app.use("/api", authRoutes);
app.use("/api/tasks", taskRoutes);  // 👈 Make sure this is present

// Connect DB and Start Server
mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("MongoDB connected");
  app.listen(5000, () => console.log("Server running on port 5000"));
}).catch(err => console.error(err));
