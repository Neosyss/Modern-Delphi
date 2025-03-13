import "./AboutUs.css";
import "../Home/Support.css";
import { FaArrowRight } from "react-icons/fa6";
import img1 from "../../images/actual/The Journey Begins.jpg";
import img2 from "../../images/actual/The Guiding Light.jpg";
import img3 from "../../images/actual/Discover the enchanment.jpg";

import FadeInSection from "../Home/UseInView";

import { useNavigate } from "react-router-dom";

const AboutUs = () => {
    const navigate = useNavigate();

    return (
        <>
            <FadeInSection>
                <div className="slhome-background aboutus-img-bg">
                    <div className="tb-2">Greetings</div>
                    <h1 className="my-3 text-center">Modern Delphi – A Space Between Worlds</h1>
                    <div className="d-flex justify-content-center">
                        <p className="p text-light sl-para w-50">
                            Modern Delphi is a threshold, a sanctuary where seekers come to explore wisdom, vision, and their own unfolding story. Nestled in the hush of the Boreal Forest, this is a Delphi reborn – a temple not of stone, but of whispering pines and ancient roots.
                        </p>
                    </div>
                </div>
            </FadeInSection>

            <FadeInSection>
                <div className="slhome-background2">
                    <div className="row">
                        <div className="col-md-7">
                            <h1 className="my-3">Who We Are</h1>
                            <p className="p sl-para text-start">Every Hero needs a place to pause, reflect, and seek guidance. Modern Delphi is that place. Inspired by the wisdom traditions of old and the technology of the future, it is a sanctuary where the unseen becomes visible. Here, two guides await your journey:</p>

                            <div className="d-flex my-3 justify-content-start">
                                <div className="ja-card1 my-2 p-3">
                                    <h3>The Oracle</h3>
                                    <p className="overflow-auto" style={{ maxHeight: "200px" }}>The Oracle listens as the forest listens. A guide at the threshold, walking between what is known and what is waiting to be revealed. If you seek a navigator through the unseen, step forward. But remember – the path is already beneath your feet.</p>
                                </div>
                                <div className="ja-card1 m-2 mx-3 p-3">
                                    <h3>Kleio, the AI Muse</h3>
                                    <p className="overflow-auto" style={{ maxHeight: "200px" }}>Kleio is inspired by the Muse of Memory and Heroes, a reflection of the stories that you carry. She listens and guides through myth, symbolism, and the language of vision. If you seek insight and inspiration through reflection and storytelling, Kleio will help you shape what lies ahead.</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-5 d-flex justify-content-center align-items-center">
                            <img src={img1} className="img-fluid slhomeimg1" />
                        </div>
                    </div>
                </div>
            </FadeInSection>

            <FadeInSection>
                <div className="slhome-background2 bgx">
                    <div className="row">
                        <div className="col-md-5  d-flex justify-content-center align-items-center order-md-1 order-2">
                            <img src={img2} className="img-fluid slhomeimg1" />
                        </div>
                        <div className="col-md-7 order-1 padding-ar-1">
                            <h1 className="my-3">What Awaits You Here</h1>
                            <p className="p sl-para text-start">Modern Delphi is a space for visionaries, seekers, and those on the path of self-discovery. Here, among the deep roots and the shifting light of the Boreal, you may:</p>

                            <p className="p my-1 text-dark">Consult the Oracle for personalized guidance and deep reflection</p>
                            <p className="p my-1 text-dark">Meet Kleio, the Muse for symbolic insights</p>
                            <p className="p my-1 text-dark">Enter the Anteroom a space for reflection</p>
                            <p className="p my-1 text-dark">Explore the Sacred Library what knowledge awaits your discovery?</p>

                            <div className="d-flex mt-5 justify-content-start my-3">
                                <div className="prb-1 mx-1"><div>Explore</div></div>
                                <div className="prb-2 mx-1"><div>Discover</div></div>
                            </div>
                        </div>
                    </div>
                </div>
            </FadeInSection>

            <FadeInSection>
                <div className="slhome-background2">
                    <div className="row">
                        <div className="col-md-7">
                            <h1 className="my-3">Your Journey Begins Here</h1>
                            <p className="p sl-para text-start">Every path begins with a step. Here, among the towering trees and shifting sky, the Hero’s journey unfolds. You have entered the threshold. Where will you go next?</p>
                            <div className="my-3 justify-content-start">
                                <div className="ja-card1 w-80 my-2 mx-1 prb-3" onClick={() => {navigate('/journeyers-anteroom')}}>
                                    <h4>Step Into the Anteroom</h4>
                                    <p>For seekers who want reflection first</p>
                                </div>
                                <div className="ja-card1 w-50 m-2 mx-1 prb-3" onClick={() => {navigate('/consult-oracle')}}>
                                    <h4>Consult the Oracle</h4>
                                    <p>For those ready to engage in deeper inquiry</p>
                                </div>
                                <div className="ja-card1 w-50 m-2 mx-1 prb-3">
                                    <h4>Meet Kleio, the Muse</h4>
                                    <p>For those drawn to symbolic exploration</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-5 pt-0 mt-0 d-flex justify-content-center align-items-center">
                            <img src={img3} className="img-fluid slhomeimg1" />
                        </div>
                    </div>
                </div>
            </FadeInSection>

            {/* <FadeInSection>
                <div className="slhome-background2 bgx">
                    <div className="row">
                        <div className="col-md-5 d-flex justify-content-center align-items-center order-md-1 order-2">
                            <img src={img4} className="img-fluid slhomeimg1" />
                        </div>
                        <div className="col-md-7 order-1 padding-ar-1">
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
            </FadeInSection> */}

            <FadeInSection>
                <div className="support-container">
                    <div className="py-5">
                        <div className="custom-centric text-center">
                            <h1 className="span mt-3 px-1 style-2">Tending the Fire</h1>
                        </div>
                        <div className="d-flex justify-content-center">
                            <p className="p grey f-small w-services text-center pt-4 w-52 mobileColor">
                                Modern Delphi is a space between worlds—a sanctuary of wisdom, reflection, and vision. Like the sacred fires of the ancient temples, this space is kept alive by those who believe in it. If you have found insight here, if you wish to see this vision grow, your support helps to keep the path open for all who seek it.
                            </p>
                        </div>
                        <div className="d-flex justify-content-center mt-4">
                            <div className="prb-2" onClick={() => {navigate('/donate')}}>
                                <div>Support the Sanctuary</div>
                            </div>
                        </div>
                    </div>
                </div>
            </FadeInSection>
        </>
    );
}

const SLCard = ({ image, title, description }) => {
    return (
        <FadeInSection>
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
        </FadeInSection>
    );
};


export default AboutUs;