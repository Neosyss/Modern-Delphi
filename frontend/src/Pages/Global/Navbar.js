import React, { useState, useEffect } from "react";
import "./Navbar.css"; // CSS styles

const Navbar = () => {
  const [isSolid, setIsSolid] = useState(false); // Track navbar background
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Track mobile menu

  // Add scroll event listener to handle transparency transition
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsSolid(true);
      } else {
        setIsSolid(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className={`navbar ${isSolid ? "navbar-solid" : "navbar-transparent"}`}>
      <div className="container">
        <div className="navbar-content">
          {/* Logo */}
          <div className="logo">
            <a href="index.html">
              <img className="logo-main" src="neosyss-3.png" alt="Logo" />
              <img className="logo-scroll" src="images/logo-back.webp" alt="Scroll Logo" />
            </a>
          </div>

          {/* Main Menu (Desktop) */}
          <ul className={`main-menu ${isMobileMenuOpen ? "open" : ""}`}>
            <li>
              <a href="index.html" className="menu-item">
                Home
              </a>
              <ul className="dropdown">
                <li><a href="index.html">Homepage One</a></li>
                <li><a href="homepage-2.html">Homepage Two</a></li>
                <li><a href="homepage-3.html">Homepage Three</a></li>
                <li><a href="homepage-4.html">Homepage Four</a></li>
                <li><a href="homepage-5.html">Homepage Five</a></li>
              </ul>
            </li>
            <li>
              <a href="#" className="menu-item">
                Services
              </a>
              <ul className="dropdown">
                <li><a href="services.html">Services Style 1</a></li>
                <li><a href="AI Agent.html">AI Therapist</a></li>
                <li><a href="services-3.html">Services Style 3</a></li>
                <li><a href="service-single.html">Services Single</a></li>
                <li><a href="appointment.html">Appointment</a></li>
              </ul>
            </li>
            <li><a href="about.html" className="menu-item">About Us</a></li>
            <li><a href="study-case.html" className="menu-item">Case Study</a></li>
            <li><a href="blog.html" className="menu-item">Blog</a></li>
            <li><a href="contact.html" className="menu-item">Contact</a></li>
          </ul>

          {/* Right Side */}
          <div className="menu-side-area">
            <div className="h-phone">
              <i className="icofont-headphone-alt"></i>
              <span>Need Help?</span> +xxx xxx xxxx
            </div>
            <a href="appointment.html" className="btn-main">Make Appointment</a>
            <button className="menu-btn" onClick={toggleMobileMenu}>
              <i className="icofont-navigation-menu"></i>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
