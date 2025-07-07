import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { signin } from "./api";
import { useAuth } from "./AuthContext";
import "./SignIn.css";

const SignIn = () => {
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]       = useState("");
  const [info, setInfo]         = useState("");   // success banner

  const navigate  = useNavigate();
  const location  = useLocation();
  const { login } = useAuth();

  /* Show banner only once after redirect from Sign‑Up */
  useEffect(() => {
    if (location.state?.registered) {
      setInfo("Account created! Please log in.");
      // clear state so refresh won't repeat message
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      return setError("All fields are required.");
    }

    const res = await signin({ email, password });

    if (res.token) {
      login(res.user, res.token); // store user + token
      navigate("/home");
    } else {
      setError(res.msg || "Invalid login.");
    }
  };

  return (
    <div className="signin-container">
      <form onSubmit={handleSubmit} className="signin-form">
        <h2 className="signin-title">Sign In</h2>

        {info  && <p className="signin-success">{info}</p>}
        {error && <p className="signin-error">{error}</p>}

        <input
          type="email"
          className="signin-input"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="signin-input"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit" className="signin-button">
          Sign In
        </button>
      </form>
    </div>
  );
};

export default SignIn;
