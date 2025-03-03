import PicContainer1 from "./PicContainer1";
import { FaCheck } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
import './WelcomeSection.css';

const WelcomeSection = () => {
    return (
        <>
            <div className="containerWelcome">
                <div className="row padding-picture-section">
                    <div className="col-md-6 d-flex set-c-align h-cont">
                        <PicContainer1 />
                    </div>
                    <div className="col-md-6 p-3 ">
                        <div className="tb-2">About</div>
                        <h1 className="mt-2 text-dark heading-main-2">Transform Your</h1>
                        <span className="span style-2">Mental Health</span>

                        <p className="p grey f-small pt-4 mobileColor"><strong>Seeker - Know Theyself</strong><br /><br />Modern Delphi is nestled in the peaceful boreal Canadian woodlands. It is the home of the Oracle, your guide through the maze of the Present.<br /><br />
                            The Oracle is the Wisdom Keeper. To walk the path of a Wisdom Keeper is to join another's Sacred Journey through the Labyrinth. The answers are locked within, where shadows and light entwine. The Seeker always holds the keys; the Wisdom Keeper provides the map.<br /><br />
                            The Oracle is the Strategic Seer. To be a Seer is to Understand what lies beneath the surface. The Seer's vision lights the room and parts the veil.You stand at a Crossroads. The Path is yours to choose, the journey yours to claim.<br /><br />
                            Step into a world where ancient wisdom meets modern innovation, and unlock the potential within you.<br /><br />
                            The future is not written - it is waiting.</p>
                    </div>
                </div>
            </div>
        </>
    );
};
export default WelcomeSection;