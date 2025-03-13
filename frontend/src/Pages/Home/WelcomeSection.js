import PicContainer1 from "./PicContainer1";
import './WelcomeSection.css';

const WelcomeSection = () => {
    return (
        <>
            <div className="containerWelcome">
                <div className="row padding-picture-section">
                    <div className="col-md-6 d-flex set-c-align h-cont">
                        <PicContainer1 />
                    </div>
                    <div className="col-md-6 p-3">
                        <div className="tb-2">About</div>
                        <h1 className="mt-2 text-dark heading-main-2">What is Modern Delphi?</h1>

                        <p className="p grey f-small pt-4 mobileColor">Modern Delphi is a sanctuary for deep thinking, insight, and transformation. Inspired by the ancient Oracles and the Socratic tradition, it is a place where seekers explore profound questions, challenge assumptions, and find clarity through guided reflection. Whether you seek wisdom, knowledge, or purpose, Modern Delphi provides the tools to help you navigate your path.</p>

                        <h2 className="mt-2 text-dark heading-main-3">Why Does This Matter to You?</h2>

                        <p className="p grey f-small pt-4 mobileColor"><strong>Are you seeking clarity in your personal journey? Exploring life’s deeper questions?
                        Searching for guidance? </strong>
                        At Modern Delphi, wisdom is not given—it is discovered. ask your first question, challenge your
                        perspective, and step forward on your journey</p>
                    </div>
                </div>
            </div>
        </>
    );
};
export default WelcomeSection;