import React, { useState, useEffect } from "react";
import { useMediaQuery } from 'react-responsive';
import { useNavigate, useLocation } from "react-router-dom";
import "./Navbar.css"; 

const Navbar = () => {
  const location = useLocation(); 
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ maxWidth: 768 });  
  const isDesktop = useMediaQuery({ minWidth: 767 });  

  const isAtHome = location.pathname === "/"; 
  const [isAtTopClass, setIsAtTopClass] = useState(isAtHome);
  const [menuOpen, setMenuOpen] = useState(false);

  const isAuthenticated = !!localStorage.getItem("authToken") || !!localStorage.getItem("adminAuthToken");
  const isAdmin = !!localStorage.getItem("adminAuthToken");
  
  const profileRoute = isAdmin ? "/admin" : "/user";

  useEffect(() => {
    const handleScroll = () => {
      const isTop = window.scrollY < 10; 
      setIsAtTopClass(isTop);
    };

    if (isAtHome) {
      window.addEventListener("scroll", handleScroll);
      handleScroll();
    } else {
      setIsAtTopClass(false);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isAtHome]);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <nav className="">
      <div className={`nav-row pt-2 ${isAtTopClass ? "atTop" : "notTop"} row`}>

        {isDesktop && 
          <div className="d-flex justify-content-between">
            <div>
              {/* <img src={img2} className="nav-logo" onClick={() => {navigate('/')}} alt="Logo"/> */}
              <h4 className="nav-logo pt-2" style={{color:"var(--sec)"}} onClick={() => {navigate('/')}}>Modern Delphi</h4>
            </div>
            <div>
              <ul className="nav-list">
                <li className="nav-item" onClick={() => {navigate('/journeyers-anteroom')}}>Journeyer's Anteroom</li>
                <li className="nav-item" onClick={() => {navigate('/consult-oracle')}}>Consult Oracle</li>
                <li className="nav-item" onClick={() => {navigate('/sacred-library')}}>Sacred Library</li>
              </ul>
            </div>  
            <div>
              <div className="nav-list">
                {isAuthenticated ? (
                  <div className="nav-item" onClick={() => navigate(profileRoute)}>Dashboard</div>
                ) : (
                  <>
                    <div className="nav-item" onClick={() => {navigate('/signup')}}>Signup</div>
                    <div className="prb-3" onClick={() => {navigate('/login')}}>
                      <div>Sign In</div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        }

        {isMobile && (
          <div className="d-flex justify-content-between align-items-center">
            <div>
              {/* <img src={img2} className="nav-logo" onClick={() => {navigate('/')}} alt="Logo" /> */}
              <h4 className="nav-logo pt-3" style={{color:"var(--sec)"}} onClick={() => {navigate('/')}}>Modern Delphi</h4>
            </div>
            <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
              <div className={`line ${menuOpen ? "baropen" : ""} ${isAtTopClass ? "white" : "black"}`}></div>
              <div className={`line ${menuOpen ? "baropen" : ""} ${isAtTopClass ? "white" : "black"}`}></div>
              <div className={`line ${menuOpen ? "baropen" : ""} ${isAtTopClass ? "white" : "black"}`}></div>
            </div>
            <div className={`mobile-nav ${menuOpen ? "open" : ""}`}>
              <ul>
                <li className="nav-item" onClick={() => {navigate('/journeyers-anteroom')}}>Journeyer's Anteroom</li>
                <li className="nav-item" onClick={() => {navigate('/consult-oracle')}}>Consult Oracle</li>
                <li className="nav-item" onClick={() => {navigate('/sacred-library')}}>Sacred Library</li>

                {isAuthenticated ? (
                  <li className="nav-item" onClick={() => navigate(profileRoute)}>Dashboard</li>
                ) : (
                  <>
                    <li className="nav-item" onClick={() => {navigate('/signup')}}>Signup</li>
                    <li className="nav-item" onClick={() => {navigate('/login')}}>Sign In</li>
                  </>
                )}
              </ul>
            </div>
          </div>
        )}

      </div>
    </nav>
  );
};

export default Navbar;
