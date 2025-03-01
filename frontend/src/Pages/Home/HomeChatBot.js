import { useEffect, useState } from "react";
import "./HomeChatBot.css";
import { useNavigate } from "react-router-dom";
import Chatbot from "../JourneyerAnteroom/ChatBotAnteroom";

const HomeChatBot = () => {
    const navigate = useNavigate();
    const [hasTerms, setHasTerms] = useState(0);
    
    const checkOnline = () => {
        const token = localStorage.getItem('authToken');
        if(token !== null){
            setHasTerms(1);
        }
        else{
            setHasTerms(0);
        }
    }

    useEffect(() => {
        checkOnline();
    }, []);
    

    return(
        <>
        <div className="home-chatbot mt-4 py-2 pt-5">
            <div className="d-flex justify-content-center mt-4">
              <h1 className=" mx-1">Experience the</h1>
              <span className="span style-2 mx-1 customp-set">Anteroom</span>
            </div>
            <div className="justify-content-center  d-flex">
            <p className='p text-dark text-center'>A serene space for reflection, inviting you to explore the depths for your journey.</p>
            </div>
            <div className="d-flex rel justify-content-center">
                <div className={`overflow-homebot p-2 justify-content-center align-items-center ${hasTerms == 1 ? "d-none" : " d-flex"}`}>
                    <div className="signup-modal p-4">
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
                <div className="w-custom-home">
                    <Chatbot chatbot={"Homepage"} />
                </div>
            </div>
        </div>
        </>
    );
}

export default HomeChatBot;

