import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <header className="navbar">
      <Link to="/" className="navbar-brand">
        Project<span className="brand-accent">Up</span>
      </Link>

      <nav className="navbar-links">
        <NavLink to="/signin" className="nav-btn">
          Sign In
        </NavLink>

        <NavLink to="/signup" className="nav-btn nav-btn--primary">
          Sign Up
        </NavLink>
      </nav>
    </header>
  );
};

export default Navbar;
