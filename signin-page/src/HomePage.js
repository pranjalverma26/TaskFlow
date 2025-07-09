import React from "react";
import Sidebar from "./Sidebar";

const HomePage = () => {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div
        style={{
          marginLeft: "220px", // sidebar width
          paddingTop: "80px",  // space below navbar
          paddingLeft: "30px",
          paddingRight: "30px",
          boxSizing: "border-box",
          width: "100%",
        }}
      >
        <h1>Welcome to ProjectUp</h1>
        <p>This is your project management dashboard.</p>
      </div>
    </div>
  );
};

export default HomePage;
