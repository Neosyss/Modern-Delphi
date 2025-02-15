import "./ContactCardHome.css";
import { FaRegClock } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { IoCall } from "react-icons/io5";

import img1 from "../../images/gallery/1.webp";
import img2 from "../../images/gallery/2.webp";
import img3 from "../../images/gallery/3.webp";
import img4 from "../../images/gallery/4.webp";
import img5 from "../../images/gallery/5.webp";
import img6 from "../../images/gallery/6.webp";

const ContactCardHome = () => {
    return (
        <>
        <div className="contac-c-green row mt-5">
            <div className="col-md-3 d-flex align-items-center justify-content-center flex-column">
                <FaRegClock className="svg-contact-c"/>
                <p className="p m-0">Mon - Sat: 8AM - 9PM</p>
                <p className="p m-0">Sunday: 10AM - 8PM</p>
            </div>
            <div className="col-md-3 d-flex align-items-center justify-content-center flex-column">
                <FaLocationDot className="svg-contact-c"/>
                <p className="p m-0">789 Elm Avenue</p>
                <p className="p m-0">Brooklyn, NY 11201</p>
            </div>
            <div className="col-md-3 d-flex align-items-center justify-content-center flex-column">
                <IoCall className="svg-contact-c"/>
                <p className="p m-0">+929 333 9296</p>
                <p className="p m-0">contact@neosyss.com</p>
            </div>
            {/* <div className="col-md-3 d-flex align-items-center justify-content-center flex-column">
               <div className="prb-1 fw-bold height-set-prb">Make Appointment</div>
            </div> */}
        </div>
        <div className="d-flex row m-0 p-0 justify-content-center">
            <div className="img-cont-contact-c m-0 p-0 col-md-2"><img src={img1} /></div>
            <div className="img-cont-contact-c m-0 p-0 col-md-2"><img src={img2} /></div>
            <div className="img-cont-contact-c m-0 p-0 col-md-2"><img src={img3} /></div>
            <div className="img-cont-contact-c m-0 p-0 col-md-2"><img src={img4} /></div>
            <div className="img-cont-contact-c m-0 p-0 col-md-2"><img src={img5} /></div>
            <div className="img-cont-contact-c m-0 p-0 col-md-2"><img src={img6} /></div>
        </div>
        </>
    );
}
export default ContactCardHome;