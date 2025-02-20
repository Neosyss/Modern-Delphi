import "./UserPanel.css";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import NewAppointment from "./NewAppointment";
import Home from "./Home";
import ProfilePage from "../Auth/ProfilePage";

const UserPanel = () => {
    const location = useLocation();
    const defaultPage = location.state?.defaultPage || "Profile";

    const [selectedOption, setSelectedOption] = useState(defaultPage);

    return (
        <div className="adminMain">
            <div className="row adj-h w-100 p-0">
                <div className="col-md-2 p-0 sideBar">
                    <div className="p-0 m-0 sideBarCont">
                        <div className={`sideBarItem ${selectedOption === "Profile" ? "selected" : ""}`} 
                            onClick={() => setSelectedOption("Profile")}> Home </div>
                        <div className={`sideBarItem ${selectedOption === "Users" ? "selected" : ""}`} 
                            onClick={() => setSelectedOption("Users")}> Bookings </div>
                        <div className={`sideBarItem ${selectedOption === "Bookings" ? "selected" : ""}`} 
                            onClick={() => setSelectedOption("Bookings")}> New Appointment </div>
                        <div className={`sideBarItem ${selectedOption === "Blogs" ? "selected" : ""}`} 
                            onClick={() => setSelectedOption("Blogs")}> Contact Us </div>
                    </div>
                </div>
                <div className={`col-md-10 ${selectedOption === "Bookings" ? 'p-0' : 'adminInner'}`}>
                    {selectedOption === "Home" && <Home />}
                    {selectedOption === "Users" && <></>}
                    {selectedOption === "Blogs" && <></>}
                    {selectedOption === "Bookings" && <NewAppointment />}
                    {selectedOption === "Profile" && <><ProfilePage panelType={1}/></>}
                </div>
            </div>
        </div>
    );
};

export default UserPanel;
