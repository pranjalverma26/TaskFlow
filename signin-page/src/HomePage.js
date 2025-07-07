// src/HomePage.js
import React from "react";

const HomePage = () => {
  return (
    <div style={{
      backgroundColor: "#1e1e1e",
      color: "#ffffff",
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column"
    }}>
      <h1 style={{ fontSize: "2rem" }}>Welcome to Project Manager</h1>
      <p style={{ fontSize: "1.2rem", color: "#ccc" }}>
        You are successfully signed in!
      </p>
    </div>
  );
};

export default HomePage;
