import "./AdminHome.css";
import { useState } from 'react';
import HomeContent from "./HomeContent";
import BlogContent from "./BlogContent";
import CalendlyManager from "./CalendlyManager";
import UsersContent from "./UsersContent";
import ProfilePage from "../Auth/ProfilePage";

const AdminHome = () => {

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
                            onClick={() => setSelectedOption("Users")}> Users </div>
                        <div className={`sideBarItem ${selectedOption === "Bookings" ? "selected" : ""}`} 
                            onClick={() => setSelectedOption("Bookings")}> Bookings </div>
                        <div className={`sideBarItem ${selectedOption === "Blogs" ? "selected" : ""}`} 
                            onClick={() => setSelectedOption("Blogs")}> Blogs </div>
                        <div className={`sideBarItem ${selectedOption === "Profile" ? "selected" : ""}`} 
                            onClick={() => setSelectedOption("Profile")}> Profile </div>
                    </div>
                </div>
                <div className={`col-md-10 ${selectedOption === "Bookings" ? 'p-0' : 'adminInner'}`}>
                    {selectedOption === "Home" && <HomeContent/>}
                    {selectedOption === "Users" && <UsersContent/>}
                    {selectedOption === "Blogs" && <BlogContent/> }
                    {selectedOption === "Bookings" && <div><CalendlyManager/></div>}
                    {selectedOption === "Profile" && <ProfilePage panelType ={0}/>}
                </div>
            </div>
        </div>
        </>
    );
}

export default AdminHome;