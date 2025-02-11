import React, { useState, useEffect } from "react";
import "./Navbar.css"; 
import img2 from '../../images/2.webp';

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
      <navbar>
        <div className="nav-row row">
          <div className="d-flex justify-content-between">
            <div>
              <img src={img2} className="nav-logo"/>
            </div>
            <div>
              <ul className="nav-list">
                <li className="nav-item">Journeyer's Anteroom</li>
                <li className="nav-item">Consult Oracle</li>
                <li className="nav-item">Sacred Library</li>
              </ul>
            </div>  
            <div>
              <div className="nav-list">
                <div className="nav-item">Signup</div>
                <div className="prb-3">
                  <div>Sign In</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </navbar>
  );
};

export default Navbar;
