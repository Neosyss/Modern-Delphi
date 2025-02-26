import { useState, useEffect } from "react";
import { IoIosClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const JAChatRoom = () => {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            setShowModal(false);
        }
    }, []);

    return (
        <>
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="">
                            <div className="d-flex justify-content-end">
                                <div ><IoIosClose className="close-svg cursor-pointer" 
                                onClick={() => {navigate('/journeyers-anteroom')}}
                                /> </div>
                            </div>
                            <h3>Sign In to access the Anteroom</h3>
                            <p>You need to sign in or create an account to access the Journeyer's Anteroom</p>

                        <div className="my-5 d-flex justify-content-center align-items-center">
                            <div className="prb-1 mx-1"
                            onClick = {() => {navigate('/login')}}
                            >
                                <div>Sign In</div>
                            </div>
                            <div className="prb-2 mx-1"
                            onClick = {() => {navigate('/signup')}}
                            >
                                <div>Sign Up</div>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="padding-top-jachat">
                <div className="backbtn-chat">
                    <div className="prb-1" onClick={() => navigate('/journeyers-anteroom')}>
                        <div>Back</div>
                    </div>
                </div>
                <iframe
                    src="https://www.chatbase.co/chatbot-iframe/c4DQnBKIBUL97tBeh1NRd"
                    className="ja-iframe"
                    frameBorder="0"
                ></iframe>
            </div>
        </>
    );
};

export default JAChatRoom;
