import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const JAChatRoom = () => {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(true);
    const [isChecked, setIsChecked] = useState(false);

    const handleCloseModal = () => {
        if (isChecked) {
            setShowModal(false);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            setShowModal(false);
            setIsChecked(true);
        }
    }, []);

    return (
        <>
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>Terms and Conditions</h2>
                        <p>You need to agree to our terms of use and privacy policy to continue chatting with the chatbot.</p>
                        <div className="checkbox-container">
                            <input
                                type="checkbox"
                                id="agreeCheckbox"
                                onChange={(e) => setIsChecked(e.target.checked)}
                            />
                            <label htmlFor="agreeCheckbox" className="ms-2 a-links">I agree to the  <a target="_blank" href="/terms-of-use"> Terms of Use</a> and
                            <a target="_blank" href="/privacy-policy"> Privacy Policy</a></label>
                        </div>
                        <div className="d-flex mt-2 justify-content-center">
                        <div className={`prb-1 mx-1`} onClick={() => {navigate('/journeyers-anteroom')}}>
                            <div>
                                Exit Chat
                            </div>
                        </div>
                        <div className={`prb-2 ${!isChecked ? "disabled" : ""}`} onClick={handleCloseModal}>
                            <div>
                                Continue
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
                    src="https://www.chatbase.co/chatbot-iframe/Lf-WDj2kkpHKNECkE8rK1"
                    className="ja-iframe"
                    frameBorder="0"
                ></iframe>
            </div>
        </>
    );
};

export default JAChatRoom;
