import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "./api";           // API helper
import "./SignUp.css";                    // your existing styles

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // handle inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const { name, email, password } = formData;
    if (!name || !email || !password) {
      return setError("All fields are required.");
    }

    const res = await signup(formData);

    if (res.token) {
      // ✅ registration success → go back to Sign‑In with flag
      navigate("/signin", { state: { registered: true } });
    } else {
      setError(res.msg || "Sign up failed.");
    }
  };

  return (
    <div className="signin-container">
      <form onSubmit={handleSubmit} className="signin-form">
        <h2 className="signin-title">Sign Up</h2>
        {error && <p className="signin-error">{error}</p>}

        <input
          name="name"
          type="text"
          className="signin-input"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
        />

        <input
          name="email"
          type="email"
          className="signin-input"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />

        <input
          name="password"
          type="password"
          className="signin-input"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />

        <button type="submit" className="signin-button">
          Register
        </button>
      </form>
    </div>
  );
};

export default SignUp;
