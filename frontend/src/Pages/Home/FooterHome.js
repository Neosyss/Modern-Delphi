import "./FooterHome.css";
import { useNavigate } from "react-router-dom";

const FooterHome = () => {
    const navigate = useNavigate();
    return (
        <>
            <div className="footer-main py-5">
                <div className="row p-4 pt-4">

                    <div className="col-md-5 mt-3 px-4">
                        <div className="d-flex flex-column align-items-center">
                            <p className="p text-dark fw-bold">Modern Delphi</p>
                            <div className="">
                                <div className="f-link grey" onClick={() => {navigate('/journeyers-anteroom')}}>Journeyer's Anteroom</div>
                                <div className="f-link grey" onClick={() => {navigate('/sacred-library')}}>Sacred Library</div>
                                <div className="f-link grey" onClick={() => {navigate('/consult-oracle')}}>Consult the Oracle</div>
                                <div className="f-link grey" onClick={() => {navigate('/about-us')}}>About Us</div>
                            </div>
                        </div>

                    </div>
                    <div className="col-md-7 mt-3 px-4">
                        <p className="p text-dark text-center fw-bold">Reach Out to Us</p>
                        <div className="my-4 text-center">
                            <div className="f-link grey">contact@moderndelphi.com</div>
                            <p className="p text-dark text-center fw-bold mt-4">Policies</p>
                            <div className="f-link grey" onClick={() => {navigate('/terms-of-use')}}>Terms of Use and Disclaimers</div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
};

export default FooterHome;