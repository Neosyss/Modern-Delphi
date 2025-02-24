import "./JAHome.css";
import { FaArrowRight } from "react-icons/fa6";
import pic1 from '../../images/misc/10.webp';
import pic2 from '../../isvgs/flowers-crop-2.webp';

import reflectImg from '../../images/actual/Reflect on your journey.jpg';

import { useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { PiPathFill } from "react-icons/pi";
import { FaBookOpen } from "react-icons/fa6";
import { IoKey } from "react-icons/io5";



const JAHome = () => {

    const navigate = useNavigate();

    return (
        <>
            <div className="slhome-background">
                <div className="tb-2">Welcome</div>
                <h1 className="my-3">Enter the Anteroom</h1>
                <div className="d-flex justify-content-center">
                    <p className="p sl-para w-80">A serene space for reflection, inviting you to explore the
                        depths for your journey</p>
                </div>
                <div className="d-flex justify-content-center m-2">
                    <div className="prb-2 mx-1" onClick={() => { navigate('/journeyers-chatroom') }}
                    ><div>Let's Have a Chat</div></div>
                </div>
            </div>

            <div className="slhome-background2">
                <div className="row">

                    <div className="col-md-7">
                        <div className="tb-2">Guidance</div>
                        <h1 className="my-3">Reflect on your journey: What question guides you today?</h1>
                        <p className="p sl-para text-start">Welcome to the Journeyer's Anteroom, a tranquil space for introspection. Here, you can explore the questions that matter most to you.</p>


                        <div className="d-flex mt-4 justify-content-start">
                            <FaEye className='arrow-sl mx-2' />
                            <p className="sl-para p text-start ">Seek clarity and insight into your life's path.</p>

                        </div>
                        <div className="d-flex justify-content-start">
                            <FaRegHeart className='arrow-sl mx-2' />
                            <p className="sl-para p text-start ">Embrace the stiffness and listen to your heart.</p>

                        </div>
                        <div className="d-flex justify-content-start">
                            <IoSearch className='arrow-sl mx-2' />
                            <p className="sl-para p text-start ">Open your mind to new possibilities and wisdom.</p>

                        </div>

                    </div>
                    <div className="col-md-5 d-flex justify-content-center align-items-center">
                        <img src={reflectImg} className="img-fluid slhomeimg1" />
                    </div>

                </div>
            </div>


            <div className="slhome-background4">
                <img src={pic2} className="slhomesvg" />
                <div className="tb-2">Sanctuary</div>
                <div className="d-flex justify-content-center align-items-center flex-column text-center">
                    <h1 className="my-3  sl-heading3 w-80">Explore the pathways to wisdom & serenity within the Grove.</h1>
                    <p className="p sl-para  sl-heading3">Discover wisdom and serenity as you explore the tranquil pathways of the sacred Grove.</p>
                </div>
                <div className="container my-4">
                    <div className="row justify-content-center">
                        <div className="col-md-4 my-2">
                            <div className="sl-card2 p-4">
                                <div>
                                    <PiPathFill className="arrow-sl lgsvg my-4" />
                                    <h5>Embark on a journey of discovery and renewal in our sacred space.</h5>
                                    <p>Delive deeper into your quest for knowledge and peace.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 my-2">
                            <div className="sl-card2 p-4 sl-spec">
                                <div>
                                    <FaBookOpen className="arrow-sl lgsvg my-4" />
                                    <h5>Find tranquility and rejuvenation in the Resting Grove.</h5>
                                    <p>Unwind and recharge your spirit in a serene environment.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 my-2">
                            <div className="sl-card2 p-4">
                                <div>
                                    <IoKey className="arrow-sl lgsvg my-4" />
                                    <h5>Unlock the secrets of the universe in the Sacred Library.
                                    </h5>
                                    <p>Discover ancient wisdom and insights that illuminate your path.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}

const SLCard = ({ image, title, description }) => {
    return (
        <div className="sl-card my-3">
            <div className="img-sl-card">
                <img src={image} alt={title} className="img-fluid" />
            </div>
            <div className="card- p-3 ">
                <h4 className="card-title">{title}</h4>
                <div className="d-flex mt-3 justify-content-center">
                    <p className="card-description">{description}</p>
                    <FaArrowRight className="arrow-sl" />
                </div>
            </div>
        </div>
    );
};


export default JAHome;