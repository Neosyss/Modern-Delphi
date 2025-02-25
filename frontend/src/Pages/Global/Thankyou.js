import "./Thankyou.css";
import { useNavigate } from "react-router-dom";

const Thankyou = () => {
    const navigate = useNavigate();
    return(
    <>
    <div className="thankyou">
        <h1>Thank You for your Donation!!</h1>
        <p>We really appreciate you</p>

        <div className="my-3">
            <div className="prb-2"
            onClick={() => {navigate('/')}}
            >
                <div>Back to Home</div>
            </div>
        </div>
    </div>
    </>
    )
}

export default Thankyou;