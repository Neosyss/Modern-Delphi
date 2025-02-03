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
      <div className="temp"></div>
  );
};

export default Navbar;
