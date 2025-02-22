import "./AboutUs.css";
import { FaArrowRight } from "react-icons/fa6";
import pic1 from '../../images/misc/10.webp';
import pic2 from '../../isvgs/flowers-crop-2.webp';
import { useNavigate } from "react-router-dom";
import { MdMail } from "react-icons/md";
import { FaPhone } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import Support from "../Home/Support";

const AboutUs = () => {

    const navigate = useNavigate();

    return (
        <>
            <div className="slhome-background">
                <div className="tb-2">Greetings</div>
                <h1 className="my-3">Welcome to Delphi</h1>
                <div className="d-flex justify-content-center">
                    <p className="p sl-para w-80">
                        Modern Delphi is a mystical haven where the ancient wisdom of the Oracle meets the serene beauty of the Boreal Forest. Here, amidst towering trees and starry skies, seekers embark on transformative journey of self-discovery.
                    </p>
                </div>

            </div>

            <div className="slhome-background2">
                <div className="row">

                    <div className="col-md-7">
                        <div className="tb-2">Sanctuary</div>
                        <h1 className="my-3">The Journey Begins in the Boreal Forest </h1>
                        <p className="p sl-para text-start">Modern Delphi is a sacred haven for seekers, inviting reflection and renewal. Here, the Boreal Forest whispers ancient wisdom, guiding each journeyer on their unique path.</p>

                        <div className="d-flex my-3 justify-content-start">
                            <div className="ja-card1 my-2 p-3">
                                <h3>Our Origin</h3>
                                <p>A place where the spirit of the Oracle thrives amidst nature's tranquility</p>
                            </div>
                            <div className="ja-card1 m-2 mx-3 p-3">
                                <h3>Philosophical Insight</h3>
                                <p>"Know Thyself" - a guiding
                                    principle for every journeye
                                    who enters the Grove</p>
                            </div>
                        </div>

                    </div>


                    <div className="col-md-5">
                        <img src={pic1} className="img-fluid slhomeimg1" />
                    </div>

                </div>
            </div>

            <div className="slhome-background2 bgx">
                <div className="row">
                    <div className="col-md-5 order-md-1 order-2">
                        <img src={pic1} className="img-fluid slhomeimg1" />
                    </div>
                    <div className="col-md-7 order-1 padding-ar-1">
                        <div className="tb-2">Oracle</div>
                        <h1 className="my-3">The Guiding Light of Modern Delphi
                        </h1>
                        <p className="p sl-para text-start">The Oracle serves as a beacon of insight, illuminating the paths of those
                            who seek wisdom. With deep roots in the Boreal Forest, it connects
                            seekers to their inner truths
                        </p>

                        <p className="p  my-1 text-dark">A source of guidance and profound understanding</p>
                        <p className="p my-1  text-dark">Embrace the jounrney of self-discovery and enlightment</p>
                        <p className="p my-1  text-dark">Experience the wisdom of ages within </p>


                        <div className="d-flex mt-5 justify-content-start my-3">
                            <div className="prb-1 mx-1"><div>Explore</div></div>
                            <div className="prb-2 mx-1"><div>Discover</div></div>
                        </div>
                    </div>

                </div>
            </div>


            <div className="slhome-background2">
                <div className="row">

                    <div className="col-md-7">
                        <div className="tb-2">Sanctuary</div>
                        <h1 className="my-3">Discover the Enchantment of the Boreal Forest: A Journey Awaits </h1>
                        <p className="p sl-para text-start">The Boreal Forest is a realm of tranquility and wisdom, where ancient
                            trees whisper secrets of the universe, This sacred setting invites you to
                            connect with nature and reflect on your inner journey
                        </p>
                        <div className="d-flex my-3 justify-content-start">
                            <div className="ja-card1 my-2 p-3">
                                <h3>Nature</h3>
                                <p>A sanctuary for reflection and
                                    renewal</p>
                            </div>
                            <div className="ja-card1 m-2 mx-3 p-3">
                                <h3>Wisdom</h3>
                                <p>Embrace the journey of sell
                                    discovery and insight</p>
                            </div>
                        </div>

                        <div className="prb-2 my-3"><div>Book Now</div></div>

                    </div>


                    <div className="col-md-5">
                        <img src={pic1} className="img-fluid slhomeimg1" />
                    </div>

                </div>
            </div>



            <div className="slhome-background2 bgx">
                <div className="row">
                    <div className="col-md-5 order-md-1 order-2">
                        <img src={pic1} className="img-fluid slhomeimg1" />
                    </div>
                    <div className="col-md-7 order-1 padding-ar-1">
                        <div className="tb-2">Guidance</div>
                        <h1 className="my-3">Embrace the Journey of Self-
                            Discovery and Transformation at
                            Modern Delphi

                        </h1>
                        <p className="p sl-para text-start">At Modern Delphi, we invite you to explore the depths of your being. Oul
                            sanctuary is designed for those seeking clarity, wisdom, and renewal
                            Know Thyself
                        </p>

                        <div className="d-flex my-3 justify-content-start">
                            <div className="ja-card1 my-2 p-3">
                                <h3>Know Thyself</h3>
                                <p>Reflect on your iourney and
                                    uncover the truths within you</p>
                            </div>
                            <div className="ja-card1 m-2 mx-3 p-3">
                                <h3>Seek Insight</h3>
                                <p>Discover the wisdom that lies
                                    in the heart of the Boreal
                                    Forest
                                </p>
                            </div>
                        </div>


                        <div className="d-flex justify-content-start my-3">
                            <div className="prb-1 mx-1"><div>Book Now</div></div>
                            <div className="prb-2 mx-1"><div>Learn More</div></div>
                        </div>
                    </div>

                </div>
            </div>

            <Support />


            <div className="slhome-background4">
                <img src={pic2} className="slhomesvg" />
                <div className="tb-2">Connect</div>
                <div className="d-flex justify-content-center align-items-center flex-column text-center">
                    <h1 className="my-3  sl-heading3 w-80">Get in Touch</h1>
                    <p className="p sl-para  sl-heading3">We would love to hear from you </p>
                </div>
                <div className="container my-4">
                    <div className="row justify-content-center">
                        <div className="col-md-3 my-2">
                            <div className="sl-card2 p-4">
                                <div>
                                    <div className="d-flex justify-content-center">
                                        <MdMail className="arrow-sl my-4" />
                                    </div>
                                    <h5 className="text-center">Email</h5>
                                    <p className="text-center">Reach Us at the following email address</p>
                                    <p className="text-center">contact@moderndelphi.com</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 my-2">
                            <div className="sl-card2 p-4 sl-spec">
                                <div>
                                    <div className="d-flex justify-content-center">
                                        <FaPhone className="arrow-sl my-4" />
                                    </div>
                                    <h5 className="text-center">Phone</h5>
                                    <p className="text-center">Call Us for immediate Assistance</p>
                                    <p className="text-center">+1 (555) 123-4567</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 my-2">
                            <div className="sl-card2 p-4">
                                <div>
                                    <div className="d-flex justify-content-center">
                                        <FaLocationDot className="arrow-sl my-4" />
                                    </div>
                                    <h5 className="text-center">Office</h5>
                                    <p className="text-center">Visit Our Serene Location</p>
                                    <p className="text-center">465 Tranquil Way, Sydney NSW 2000 AU</p>
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


export default AboutUs;