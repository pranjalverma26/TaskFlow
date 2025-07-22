import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import "./SignIn.css";
import loginImage from "../assets/login-illustration.png"; // Ensure this image exists at src/assets/

const SignIn = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/signin", formData); // ✅ Corrected endpoint
      login(res.data.user, res.data.token);
      navigate("/");

    } catch (err) {
      console.error(err);
      setError("Invalid email or password");
    }
  };

  return (
    <div className="signin-container">
      <div className="signin-card">
        <div className="signin-left">
          <img src={loginImage} alt="Sign in illustration" className="signin-image" />
        </div>
        <div className="signin-right">
          <h2 className="signin-title">Welcome Back</h2>
          <p className="signin-subtitle">Sign in to stay productive</p>
          <form onSubmit={handleSubmit} className="signin-form">
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
              placeholder="Enter your password"
            />
            {error && <p className="signin-error">{error}</p>}
            <button type="submit" className="signin-button">Sign In</button>
          </form>
          <p className="signup-prompt">
            Don't have an account? <span className="signup-link" onClick={() => navigate("/signup")}>Sign Up</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
