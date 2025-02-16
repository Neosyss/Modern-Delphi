import { useNavigate } from "react-router-dom";
import "./LostPage.css";

const LostPage = () => {
    const navigate = useNavigate();
    return (
        <>
        <div className="d-flex justify-content-center  align-items-center lost-page flex-column">
            <h1  style={{color: "var(--sec)"}}>Oops! Looks Like You are lost</h1>
            <p className="p" style={{color: "#aaa"}}>Don't Worry, we'll get you back.</p>
            <div className="prb-1 my-1" onClick={() => {navigate('/')}}>
                <div>Back to Home</div>
            </div>
        </div>
        </>
    )
};

export default LostPage;