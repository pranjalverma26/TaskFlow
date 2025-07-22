import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./SignIn.css"; // Using the same CSS file as SignIn
import loginImage from "../assets/login-illustration.png"; // same image

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await axios.post("http://localhost:5000/api/signup", formData);
      navigate("/signin");
    } catch (err) {
      setError(err.response?.data?.message || "Sign up failed");
    }
  };

  return (
    <div className="signin-container">
      <div className="signin-card">
        <div className="signin-left">
          <img src={loginImage} alt="Sign up illustration" className="signin-image" />
        </div>
        <div className="signin-right">
          <h2 className="signin-title">Create Account</h2>
          <p className="signin-subtitle">Sign up to start your journey</p>
          <form onSubmit={handleSubmit} className="signin-form">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter your name"
            />
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
            />
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Create a password"
            />
            {error && <p className="signin-error">{error}</p>}
            <button type="submit" className="signin-button">Sign Up</button>
          </form>
          <p className="signup-prompt">
            Already have an account?{" "}
            <span className="signup-link" onClick={() => navigate("/signin")}>
              Sign In
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
