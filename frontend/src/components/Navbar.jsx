import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../main";
import logo from "../assets/logo3.png";
import "../styles/Navbar.css";  // Make sure to update the CSS as well

const Navbar = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  const toggleMobileNav = () => {
    setIsMobileNavOpen(!isMobileNavOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <img src={logo} alt="Healthcare Management System" className="logo-img" />
        </Link>

        {/* Desktop Links */}
        <div className="navbar-links desktop">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/appointment" className="nav-link">Appointment</Link>
          <Link to="/about" className="nav-link">About</Link>
          <Link to="/contact" className="nav-link">Contact</Link>
          {isAuthenticated ? (
            <button onClick={handleLogout} className="nav-btn logout-btn">Logout</button>
          ) : (
            <>
              <Link to="/login" className="nav-btn login-btn">Login</Link>
              <Link to="/register" className="nav-btn register-btn">Register</Link>
            </>
          )}
        </div>

        {/* Mobile Menu Icon */}
        <div className="mobile-menu-icon" onClick={toggleMobileNav}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="menu-icon">
            <path d="M3 4H21V6H3V4ZM3 11H21V13H3V11ZM3 18H21V20H3V18Z"></path>
          </svg>
        </div>

        {/* Mobile Navigation Links */}
        <div className={`mobile-nav ${isMobileNavOpen ? "open" : ""}`}>
          <Link to="/" className="mobile-nav-link" onClick={toggleMobileNav}>Home</Link>
          <Link to="/appointment" className="mobile-nav-link" onClick={toggleMobileNav}>Appointment</Link>
          <Link to="/about" className="mobile-nav-link" onClick={toggleMobileNav}>About</Link>
          <Link to="/contact" className="mobile-nav-link" onClick={toggleMobileNav}>Contact</Link>
          {isAuthenticated ? (
            <button onClick={() => {handleLogout(); toggleMobileNav();}} className="nav-btn logout-btn">Logout</button>
          ) : (
            <>
              <Link to="/login" className="nav-btn login-btn" onClick={toggleMobileNav}>Login</Link>
              <Link to="/register" className="nav-btn register-btn" onClick={toggleMobileNav}>Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
