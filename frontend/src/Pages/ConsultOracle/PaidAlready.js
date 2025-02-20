import { useNavigate } from "react-router-dom";

const PaidAlready = () => {
    const navigate = useNavigate();
    return (
        <>
        <div className="slhome-background3 pt-5">
            <div className="tb-2">Pricing</div>
            <div className="d-flex justify-content-center align-items-center flex-column text-center">
                <h1 className="my-3 w-80 sl-heading3">Simple, Transparent Pricing</h1>
                <p className="p sl-para sl-heading3">You have already paid. Please proceed to dashboard to continue with your bookings.</p>
                <div className="prb-2" onClick={() => {navigate('/user')}}
                >
                    <div>Dashboard</div>
                </div>
            </div>
        </div>
        </>
    );
}

export default PaidAlready;