import React from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar-left">
        <h2 className="greeting-text">Hey, Hexagon</h2>
      </div>

      <div className="navbar-right">
        <div className="user-info">
          <FaUserCircle className="user-icon" />
          <span className="user-email">hexagon@gmail.com</span>
        </div>

        <div className="auth-buttons">
          <Link to="/signin">
            <button className="btn login-btn">Login</button>
          </Link>
          <Link to="/signup">
            <button className="btn signup-btn">Sign Up</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
