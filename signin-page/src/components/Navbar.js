import React from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/signin');
  };

  return (
    <header className="navbar">
      <div className="navbar-section navbar-left">
        <h2 className="navbar-greeting">Hey, {user?.name || 'Hexagon'}</h2>
      </div>

      <div className="navbar-section navbar-right">
        <div className="navbar-user">
          <FaUserCircle className="navbar-user-icon" />
          <span className="navbar-user-email">{user?.email || 'hexagon@gmail.com'}</span>
        </div>

        <div className="navbar-actions">
          {user ? (
            <button className="btn btn-logout" onClick={handleLogout}>Logout</button>
          ) : (
            <>
              <Link to="/signin">
                <button className="btn btn-outline">Login</button>
              </Link>
              <Link to="/signup">
                <button className="btn btn-primary">Sign Up</button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
