import { useEffect, useState } from "react";
import "./HomeChatBot.css";
import { useLocation } from "react-router-dom";
import Chatbot from "../JourneyerAnteroom/ChatBotAnteroom";

const HomeChatBot = () => {
    const [hasTerms, setHasTerms] = useState(0);

    const location = useLocation();
    
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

    useEffect(() => {
        if (location.hash) {
          const element = document.getElementById(location.hash.substring(1));
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }
      }, [location]);
    

    return(
        <>
        <div className="home-chatbot mt-4 py-2 pt-5" id="kleio">
            <div className="d-flex justify-content-center mt-4">
              <h1 className=" mx-1">Meet               <span className="span style-2 mx-1 customp-set">Kleio</span>
              : Your Guide to Clarity</h1>
            </div>
            <div className="justify-content-center d-flex">
            <p className='p text-dark text-center'>I am Kleio, the oracle's guide. I don't provide answers, I help you discover them.</p>
            </div>
            <div className="d-flex rel justify-content-center">
                <div className="w-custom-home">
                    <Chatbot chatbot={"Homepage"} />
                </div>
            </div>
        </div>
        </>
    );
}

export default HomeChatBot;

