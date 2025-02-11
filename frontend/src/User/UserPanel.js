import "./UserPanel.css";
import { useState } from 'react';

const UserPanel = () => {

    const [selectedOption, setSelectedOption] = useState("Home");

    return (
        <>
        <div className="adminMain">
            <div className="row adj-h w-100 p-0">
                <div className="col-md-2 p-0 sideBar">
                    <div className="p-0 m-0 sideBarCont">
                        <div className={`sideBarItem ${selectedOption === "Home" ? "selected" : ""}`} 
                            onClick={() => setSelectedOption("Home")}> Home </div>
                        <div className={`sideBarItem ${selectedOption === "Users" ? "selected" : ""}`} 
                            onClick={() => setSelectedOption("Users")}> Bookings </div>
                        <div className={`sideBarItem ${selectedOption === "Bookings" ? "selected" : ""}`} 
                            onClick={() => setSelectedOption("Bookings")}> New Appointment </div>
                        <div className={`sideBarItem ${selectedOption === "Blogs" ? "selected" : ""}`} 
                            onClick={() => setSelectedOption("Blogs")}> Contact Us </div>
                    </div>
                </div>
                <div className="col-md-10 adminInner">
                </div>
            </div>
        </div>
        </>
    );
}

export default UserPanel;