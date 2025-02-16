import { useNavigate } from "react-router-dom";

const JAChatRoom = () => {
    const navigate = useNavigate();

    return (
        <>
            <div className="padding-top-jachat">
                <div className="backbtn-chat">
                    <div className="prb-1" onClick={() => {navigate('/journeyers-anteroom')}}
                    ><div>Back</div></div>
                </div>
                <iframe
                    src="https://www.chatbase.co/chatbot-iframe/Lf-WDj2kkpHKNECkE8rK1"
                    className="ja-iframe"
                    frameborder="0"
                ></iframe>
            </div>
        </>
    )
}

export default JAChatRoom;