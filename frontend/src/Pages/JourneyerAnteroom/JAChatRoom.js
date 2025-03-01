import { useState, useEffect, useRef } from "react";
import { IoIosClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { IoVolumeHigh, IoVolumeMute } from "react-icons/io5"; // Mute/unmute icons
import ChatBotAnteroom from "./ChatBotAnteroom";

const rain = "/audio/rain.mp3";

const JAChatRoom = () => {
    const navigate = useNavigate();
    const audioRef = useRef(null);
    const [showModal, setShowModal] = useState(true);
    const [isMuted, setIsMuted] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (token) {
            setShowModal(false);
            setIsLoggedIn(true);
        }
    }, []);

    useEffect(() => {
        if (isLoggedIn && audioRef.current) {
            audioRef.current.volume = 0.5;
            audioRef.current.play().catch((err) => console.log("Autoplay blocked:", err));
        }
    }, [isLoggedIn]);

    const toggleMute = () => {
        if (audioRef.current) {
            audioRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    };

    return (
        <>
            {isLoggedIn && (
                <audio ref={audioRef} preload="none" loop>
                    <source src={rain} type="audio/mpeg" />
                    Your browser does not support the audio tag.
                </audio>
            )}

            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="">
                            <div className="d-flex justify-content-end">
                                <div>
                                    <IoIosClose
                                        className="close-svg cursor-pointer"
                                        onClick={() => {
                                            navigate("/journeyers-anteroom");
                                        }}
                                    />
                                </div>
                            </div>
                            <h3>Sign In to access the Anteroom</h3>
                            <p>You need to sign in or create an account to access the Journeyer's Anteroom</p>

                            <div className="my-5 d-flex justify-content-center align-items-center">
                                <div className="prb-1 mx-1" onClick={() => navigate("/login")}><div>Sign In</div></div>
                                <div className="prb-2 mx-1" onClick={() => navigate("/signup")}><div>Sign Up</div></div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="padding-top-jachat">
                <div className="backbtn-chat">
                    <div className="d-flex justify-content-center align-items-center">

                    <div className="prb-1" onClick={() => navigate("/journeyers-anteroom")}><div>Back</div></div>
                    {isLoggedIn && (
                        <div className="prb-2 mx-2" onClick={toggleMute}>
                            <div className="p-2 px-3">
                                {isMuted ? <IoVolumeMute size={20} /> : <IoVolumeHigh size={20} />}
                            </div>
                        </div>
                    )}
                    </div>
                </div>
                {/* <iframe
                    src="https://www.chatbase.co/chatbot-iframe/c4DQnBKIBUL97tBeh1NRd"
                    className="ja-iframe"
                    frameBorder="0"
                ></iframe> */}
                <div className="ja-iframe">
                    <ChatBotAnteroom chatbot={"Anteroom"}/>
                </div>
            </div>
        </>
    );
};

export default JAChatRoom;