import "./JAHome.css";
import { FaArrowRight } from "react-icons/fa6";
import pic2 from '../../isvgs/flowers-crop-2.webp';

import reflectImg from '../../images/actual/Reflect on your journey.jpg';
import immerseImg from '../../images/actual/Immerse yourself in calming sound.jpg';
import FadeInSection from "../Home/UseInView";

import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";

const rain = "/audio/rain.mp3"

const JAHome = () => {

    const navigate = useNavigate();
    const audioRef = useRef(null);

    const [soundStatus, setSoundStatus] = useState(false)

    const toggleSound = () => {
        if (soundStatus) {
            handlePause();
        } else {
            handlePlay();
        }
        setSoundStatus(!soundStatus);
    };

    const handlePlay = () => {
        if (audioRef.current) {
            audioRef.current.play();
        }
    };

    const handlePause = () => {
        if (audioRef.current) {
            audioRef.current.pause();
        }
    };

    const sacredLibraryRef = useRef(null);

    const scrollToSection = () => {
        sacredLibraryRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <>
            <audio ref={audioRef} preload="none">
                <source src={rain} type="audio/mpeg" />
                Your browser does not support the audio tag.
            </audio>
            <FadeInSection>
                <div className="slhome-background jachatroom-bg-img">
                    <div className="tb-2">Welcome</div>
                    <h1 className="my-3">Enter the Anteroom</h1>
                    <div className="d-flex justify-content-center">
                        <p className="p text-light sl-para w-80">A sanctuary for stillness. A space between past and future. Here, you may pause, reflect, and breathe before stepping forward. Pause. Breathe. Begin your Journey.</p>
                    </div>
                    <div className="d-flex justify-content-center m-2">
                        <div className="prb-2 mx-1" onClick={() => { navigate('/journeyers-chatroom') }}>
                            <div>Let's Have a Chat</div>
                        </div>
                    </div>
                </div>
            </FadeInSection>

            <FadeInSection>
                <div className="slhome-background4">
                    <img src={pic2} className="slhomesvg" />
                    <div className="tb-2">Sanctuary</div>
                    <div className="d-flex justify-content-center align-items-center flex-column text-center">
                        <h1 className="my-3 sl-heading3 w-80 text-center">Rest in the Sacred Grove</h1>
                        <p className="p sl-para sl-heading3 w-80 text-center">You have arrived at the threshold. The Anteroom is a quiet space, a clearing beneath ancient branches where echoes of wisdom linger. Here, time slows. The rain whispers softly, a gentle rhythm to still the mind. Sit beneath the branches and listen. Let the world slow around you. Rest before the next step. When you are ready, Kleio, the Muse, will guide you forward.</p>
                    </div>
                    <div className="d-flex mt-4 justify-content-center">
                        <div className="prb-1" onClick={toggleSound}>
                            <div>{soundStatus ? "Pause" : "Play"}</div>
                        </div>
                        <div className="mx-2 prb-2" onClick={scrollToSection}>
                            <div>Reflect</div>
                        </div>
                        <div className="mx-2 prb-1" onClick={() => {navigate('/journeyers-chatroom')}}>
                            <div>Enter</div>
                        </div>
                    </div>
                </div>
            </FadeInSection>

            <FadeInSection>
                <div className="slhome-background2">
                    <div className="row">
                        <div className="col-md-7">
                            <div className="tb-2">Guidance</div>
                            <h1 className="my-3">Your Journey Awaits – Who Will Walk Beside You?</h1>
                            <p className="p sl-para text-start">Every Hero must choose their ally. Will you seek Kleio, your Muse of Stories and Memory, or the Oracle, your Human guide through the unknown?</p>

                            <div className="mt-4 justify-content-start">
                                <h4 className="mt-2 text-dark heading-main-3">Meet Kleio</h4>
                                <p className="sl-para p text-start">Kleio is the guardian of myth, a Muse who recognizes your journey through symbols and storytelling. She helps you shape the story you are living. If you seek insight through vision and narrative, step forward and speak with her.</p>
                            </div>
                            <div className="justify-content-start">
                                <h4 className="mt-2 text-dark heading-main-3">Seek the Oracle</h4>
                                <p className="sl-para p text-start">The Oracle is a navigator, a human intermediary through uncertainty, a guide at the threshold of the unseen. If you seek reflection, wisdom, and a voice to walk beside you, step forward and enter the Oracle’s space.</p>
                            </div>
                        </div>
                        <div className="col-md-5 d-flex justify-content-center align-items-center">
                            <img src={reflectImg} className="img-fluid slhomeimg1" />
                        </div>
                    </div>
                </div>
            </FadeInSection>

            <FadeInSection>
                <div className="slhome-background2 back-priopa" id="JASerenity" ref={sacredLibraryRef}>
                    <div className="row">
                        <div className="col-md-5 d-flex justify-content-center align-items-center">
                            <img src={immerseImg} className="img-fluid slhomeimg1" />
                        </div>
                        <div className="col-md-7 mt-0 px-4">
                            <div className="tb-2 mt-2">Serenity</div>
                            <h1 className="my-3">A Moment of Reflection</h1>
                            <p className="p sl-para text-start">Close your eyes. Inhale deeply. Let yourself settle into stillness. What is your body whispering to you? What does your heart long for? What thoughts drift through your mind? Sit with these questions, not seeking answers, but simply listening.</p>

                            <h4 className="my-2w">Reflections</h4>
                            <div className="d-flex justify-content-start">
                                <p>What is your body asking for?</p>
                                <p className="p-3">Rest? Movement? Release?</p>
                            </div>
                            <div className="d-flex justify-content-start">
                                <p>What thoughts rise and fall?</p>
                                <p className="p-3">Observe without grasping</p>
                            </div>
                            <div className="d-flex justify-content-start">
                                <p>What do you need?</p>
                                <p className="p-3">Space? Clarity? Something unnamed?</p>
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