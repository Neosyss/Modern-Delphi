import PicContainer1 from "./PicContainer1";
import { FaCheck } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
import img1 from '../../images/misc/trustpilot.png'; 
import './WelcomeSection.css';

const WelcomeSection = () => {
    return (
        <>
        <div className="containerWelcome">
            <div className="row padding-picture-section">
                <div className="col-md-6 h-cont">
                    <PicContainer1/>
                </div>
                <div className="col-md-6 p-3">
                    <div className="tb-2">Welcome</div>
                    <h1 className="mt-2 text-dark heading-main-2">Transform Your</h1>
                    <span className="span style-2">Mental Health</span>
                    <p className="p grey f-small pt-4">Located in Florida , USA, Neosyss specializes in providing top-notch psychotherapy services. Our team of experienced professionals is dedicated to helping you achieve mental wellness and personal growth. Trust Neosyss for all your psychotherapy needs.</p>
                <div className="row">
                    <div className='col-md-7 mt-3 my-2'>
                        <div><FaCheck className="tickSvg my-1"/><strong className="f-small mx-4">Lorem ipsum</strong></div>
                        <div><FaCheck className="tickSvg my-1"/><strong className="f-small mx-4">Lorem ipsum</strong></div>
                        <div><FaCheck className="tickSvg my-1"/><strong className="f-small mx-4">Lorem ipsum</strong></div>
                        <div><FaCheck className="tickSvg my-1"/><strong className="f-small mx-4">Lorem ipsum</strong></div>
                    </div>
                    <div className="col-md-5 my-2">
                        <div>
                        <h4 className='fw-bold mt-3'>Excellent</h4>
                        <FaStar className="starSvg"/>
                        <FaStar className="starSvg"/>
                        <FaStar className="starSvg"/>
                        <FaStar className="starSvg"/>
                        <FaStar className="starSvg"/>
                        </div>
                        <div className="mt-3">
                            <strong className="grey fw-normal">Based on <strong className="">185 reviews</strong></strong>
                        </div>
                        <img className="trustpilot" src={img1} alt="trustpilot"/>
                    </div>
                </div>
                    <div className=" prb-2">
                        <div>About Us</div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};
export default WelcomeSection;