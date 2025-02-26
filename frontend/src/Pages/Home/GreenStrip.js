import React, { useRef } from 'react';
import './GreenStrip.css';
import clockIcon from '../../images/Icon.png'; 
import locationIcon from '../../images/Icon (1).png'; 
import callIcon from '../../images/Icon (2).png'; 
import { useNavigate } from 'react-router-dom';


const GreenStrip = () => {
    const sectionRef = useRef(null);
    const navigate = useNavigate();

    return (
        <div className="green-strip" ref={sectionRef}>
            <div className="strip-item">
                <img src={clockIcon} alt="clock" className="strip-icon" />
                <p>Mon - Sat: 8AM - 9PM<br />
                    Sunday: 10AM - 8PM</p>
            </div>

            <div className="strip-item">
                <img src={locationIcon} alt="location" className="strip-icon" />
                <p>789 Elm Avenue<br />
                    Canada 11201</p>
            </div>

            <div className="strip-item">
                <img src={callIcon} alt="call" className="strip-icon" />
                <p>+929 333 9296<br />
                    contact@moderndelphi.com</p>
            </div>

            <div className="d-flex justify-content-center mt-4 align-items-center">
                <div className="prb-2 me-3 appointment-btn" onClick = {()=> {navigate('/consult-oracle')}}>
                    <div>Make An Appointment</div>
                </div>
            </div>
        </div>
    );
};

export default GreenStrip;
