import './OurTeam.css';
import './Services.css';
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";

import svg1 from '../../isvgs/flowers-crop-2.webp';
import img from '../../images/team/2.webp';

const data = [
    {
        id: "1",
        img: img,
        title: "Neosyss",
        subtitle: "Neosyss Psychologist",
    },
    
];

const OurTeam = () => {
    return (
        <>
            <div className="services-container">
                <img src={svg1} alt="Background" className="ourteam-svg" />
                <div className="py-4">
                    <div className="d-flex my-3 justify-content-center">
                        <div className="tb-2">Behind the Scene</div>
                    </div>
                    <div className="d-flex justify-content-center">
                        <h1 className="mt-2 px-1 text-dark heading-main-2">Our</h1>
                        <span className="mt-3 px-1 style-2">Team</span>
                    </div>
                    <div className="d-flex justify-content-center">
                        <p className="grey f-small w-services text-center pt-4">
                            Qui culpa qui consequat officia cillum quis irure aliquip ut dolore sit eu culpa ut irure nisi occaecat dolore adipisicing do pariatur.
                        </p>
                    </div>
                    <div className="my-4 row">
                        {data.map((item) => (
                            <>
                            <div key={item.id} className="col-md-3 p-3"> 
                                <img src={item.img} alt={item.title} className="ourteam-pic" />
                                <div className="d-flex justify-content-center flex-column align-items-center">
                                    <div className="our-box d-flex justify-content-center flex-column align-items-center">
                                        <h3 className="service-title p-0 m-0 ">{item.title}</h3>
                                        <p className="grey service-subt f-small">{item.subtitle}</p>
                                        <div className="ourteam-box d-flex justify-content-between">
                                            <div className="btn-svg-ot"><FaInstagram className="ovsvg"/></div>
                                            <div className="btn-svg-ot"><FaFacebookF className="ovsvg"/></div>
                                            <div className="btn-svg-ot"><BsTwitterX className="ovsvg"/></div>
                                            
                                        </div>
                                    </div>

                                </div>
                            </div>
                            </>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default OurTeam;
