import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "./api";
import "./SignUp.css";

const SignUp = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [done, setDone]   = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = form;

    if (!name || !email || !password)
      return setError("All fields required");

    const res = await signup(form);

    if (res.token) {
      setDone(true);        
    } else {
      setError(res.msg || "Sign‑up failed");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2 className="auth-title">Create Account</h2>

        {error && <p className="auth-error">{error}</p>}
        {done  && (
          <p className="auth-success">
            Account created! <span onClick={() => navigate("/signin")}>Log in</span>
          </p>
        )}

        {!done && (
          <form onSubmit={handleSubmit} className="auth-form">
            <input
              name="name"
              type="text"
              placeholder="Full Name"
              className="auth-input"
              value={form.name}
              onChange={handleChange}
            />

            <input
              name="email"
              type="email"
              placeholder="Email"
              className="auth-input"
              value={form.email}
              onChange={handleChange}
            />

            <input
              name="password"
              type="password"
              placeholder="Password"
              className="auth-input"
              value={form.password}
              onChange={handleChange}
            />

            <button type="submit" className="auth-btn">
              Register
            </button>
          </form>
        )}

        {!done && (
          <p className="auth-switch">
            Have an account?{" "}
            <span onClick={() => navigate("/signin")}>Sign In</span>
          </p>
        )}
      </div>
    </div>
  );
};

export default SignUp;
