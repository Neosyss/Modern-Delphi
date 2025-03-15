import "./FooterHome.css";
import { useNavigate } from "react-router-dom";
import logo from '../../images/logo-removebg-preview.png';

const FooterHome = () => {
    const navigate = useNavigate();
    return (
        <>
            <div className="footer-main py-5">
                <div className="row p-4 pt-4">

                    <div className="col-md-4 mt-3 px-4">
                        <div className="d-flex flex-column align-items-center">
                            <p className="p text-dark fw-bold">Modern Delphi</p>
                            <div className="text-center">
                                <div className="f-link grey" onClick={() => {navigate('/journeyers-anteroom')}}>Journeyer's Anteroom</div>
                                <div className="f-link grey" onClick={() => {navigate('/sacred-library')}}>Sacred Library</div>
                                <div className="f-link grey" onClick={() => {navigate('/consult-oracle')}}>Consult the Oracle</div>
                                <div className="f-link grey" onClick={() => {navigate('/about-us')}}>About Us</div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 mt-3 px-4">
                        <div className="my-4 text-center">
                            <img src={logo} style={{ width: '70%' }}></img>
                        </div>
                    </div>

                    <div className="col-md-4 mt-3 px-4">
                        <p className="p text-dark text-center fw-bold">Reach Out to Us</p>
                        <div className="my-4 text-center">
                            <div className="f-link grey">moderndelphi@outlook.com</div>
                            <p className="p text-dark text-center fw-bold mt-4">Policies</p>
                            <div className="f-link grey" onClick={() => {navigate('/terms-of-use')}}>Terms of Use and Disclaimers</div>
                        </div>
                    </div>

                    <p className="p grey text-center">Modern Delphi harnesses the wisdom of both <br/> Human and Artificial Intelligence</p>
                </div>
            </div>
        </>
    )
};

export default FooterHome;