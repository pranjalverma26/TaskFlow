import React from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; // 👈 import auth context
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();    // 👈 get user and logout function
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();             // Clear auth state
    navigate('/signin');  // Redirect to login
  };

  return (
    <div className="navbar">
      <div className="navbar-left">
        <h2 className="greeting-text">Hey, {user?.name || "Hexagon"}</h2>
      </div>

      <div className="navbar-right">
        <div className="user-info">
          <FaUserCircle className="user-icon" />
          <span className="user-email">{user?.email || "hexagon@gmail.com"}</span>
        </div>

        <div className="auth-buttons">
          {user ? (
            <button className="btn logout-btn" onClick={handleLogout}>Logout</button>
          ) : (
            <>
              <Link to="/signin">
                <button className="btn login-btn">Login</button>
              </Link>
              <Link to="/signup">
                <button className="btn signup-btn">Sign Up</button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
