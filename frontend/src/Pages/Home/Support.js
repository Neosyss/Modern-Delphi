import svg1 from '../../isvgs/flowers-crop-2.webp';
import './Support.css';
import { useNavigate } from 'react-router-dom';


const Support = () => {
    const navigate = useNavigate();
    return (
        <>
            <div className="support-container">
                {/* <img src={svg1} alt="Background" className="ourteam-svg" /> */}
                <div className="py-5">
                    <div className="d-flex my-3 justify-content-center">
                        <div className="tb-2">Support</div>
                    </div>
                    <div className="custom-centric text-center">
                        <h1 className="mt-2 px-1 text-dark text-center heading-main-2">Support</h1>
                        <span className="span mt-3 px-1 style-2">Our Sacred Journey</span>
                    </div>
                    <div className="d-flex justify-content-center">
                        <p className="p grey f-small w-services text-center pt-4 w-52 mobileColor">
                            Your kind contribution helps us nurture a space for reflection, insight, and shared growth. Your support will promote a vibrant community. The modern Delphi. Join Us. Together, We Can Build Something Wonderful.
                        </p>
                    </div>
                    {/* Buttons Section */}
                    <div className="d-flex justify-content-center mt-4">
                        <div className="prb-2 "
                        onClick={() => {navigate('/donate')}}
                        >
                            <div>Donate</div>
                            </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Support;
