import {useNavigate} from 'react-router-dom';
import { useState, useEffect } from 'react';
import { TiTick } from "react-icons/ti";
import { FaArrowRight } from "react-icons/fa6";
import { FaStar } from 'react-icons/fa6';
import "./ConsultOracleHome.css";
import pic1 from '../../images/misc/10.webp';
import pic2 from '../../isvgs/flowers-crop-2.webp';
import Questions from './Questions';
import axios from 'axios';
import PaidAlready from './PaidAlready';

const ConsultOracleHome = () => {

    const [pricingDetails, setPricingDetails] = useState([]);
    const [hasPendingAppointment, setHasPendingAppointment] = useState(false);

    const fetchPriceData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/price-data');
        setPricingDetails(response.data.price_details);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    
    useEffect(() => {
        fetchPriceData();
    }, []);
    
    const navigate = useNavigate();

    useEffect(() => {
        const checkPendingAppointment = async () => {
          try {
            const authToken = localStorage.getItem("authToken");
            if (!authToken) {navigate("/consult-oracle");return;}
            const response = await axios.post("http://localhost:5000/api/check-paid", { authToken });
            setHasPendingAppointment(response.data.hasPendingAppointment);
            console.log(response.data)
          } catch (error) {
            console.error("Error checking appointment:", error);
            setHasPendingAppointment(false);
          }
        };
    
        checkPendingAppointment();
      }, []);

    return (
        <>
            <div className="slhome-background">
                <div className="tb-2">Wisdom</div>
                <h1 className="my-3">Consult The Oracle</h1>
                <div className="d-flex justify-content-center">
                    <p className="p sl-para w-80">Seek wisdom and guidance from the Mystic Oracle for your journey ahead.</p>
                </div>
                <div className="d-flex justify-content-center m-2">
                    <div className="prb-2 mx-1"><div>Book Now</div></div>
                    <div className="prb-1 mx-1"><div>Learn More</div></div>
                </div>
            </div>

            <div className="slhome-background4">
                <img src={pic2} className="slhomesvg" />
                <div className="tb-2">Engage</div>
                <div className="d-flex justify-content-center align-items-center flex-column text-center">
                    <h1 className="my-3  sl-heading3">Explore Our Unique Consultation Options</h1>
                    <p className="p sl-para w-80 sl-heading3">Our consultations are designed to provide clarity & insights. Whether you prefer a live session or a written reading, we cater to your needs.</p>
                </div>
                <div className="container my-4">
                    <div className="row justify-content-center">
                        <div className="col-md-3 my-2">
                            <div className="sl-card2 p-4">
                                <div>
                                    <FaArrowRight className="arrow-sl my-4"/>
                                    <h5>Illuminate Your Visions With Our Experts</h5>
                                    <p>Gain fresh perspective & guidance on your journey.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 my-2">
                            <div className="sl-card2 p-4 sl-spec">
                            <div>
                                    <FaArrowRight className="arrow-sl my-4"/>
                                    <h5>Forge your Path With Sacred Readings</h5>
                                    <p>Unlock the wisdom that lies within you.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 my-2">
                            <div className="sl-card2 p-4">
                            <div>
                                    <FaArrowRight className="arrow-sl my-4"/>
                                    <h5>Align & Overcome Your Life's Challenges</h5>
                                    <p>Transform obstacles into opportunities for growth.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="slhome-background2 back-priopa">
                <div className="row">
                    <div className="col-md-7">
                        <div className="tb-2">Guidance</div>
                        <h1 className="my-3">Unlock the Secrets of Your Journey</h1>
                        <p className="p sl-para text-start">An Oracle consultation is a profound experience designed to connect you with ancient wisdom and insight. Through intuitive guidance, you will uncover clarity and direction for your life's path.</p>
                        <p className="p my-4 mt-5 sl-para text-start">
                            <p className="sl-para p text-start ">Personalized insights tailored to your unique journey.</p>
                            <p className="sl-para p text-start ">Experience transformative guidance from our skilled Oracles.</p>
                            <p className="sl-para p text-start ">Find answers to your most pressing questions.</p>
                        </p>
                    </div>
                    <div className="col-md-5">
                        <img src={pic1} className="img-fluid slhomeimg1" />
                    </div>
                </div>
            </div>

            {hasPendingAppointment === false && (
                <>
                <div className="slhome-background3 pt-5">
                    <div className="tb-2">Pricing</div>
                    <div className="d-flex justify-content-center align-items-center flex-column text-center">
                        <h1 className="my-3 w-80 sl-heading3">Simple, Transparent Pricing</h1>
                        <p className="p sl-para sl-heading3">We believe Untitled should be accessible to all companies, no matter the size.</p>
                    </div>
                    <div className="container my-4">
                        <div className="row justify-content-center">
                            {pricingDetails.map((priceCard) => {
                                return (
                                    <div className="col-md-3" key={priceCard.id}> {/* Add a key prop for better performance */}
                                        <PriceCard 
                                        pricing_id = {priceCard.pricing_id}
                                            title={priceCard.plan_name} 
                                            description={priceCard.description} 
                                            price={priceCard.price} 
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
                </>
            )}


            {hasPendingAppointment === true && (
                <PaidAlready/>
            )}
            

            <div className="slhome-background2 back-priopa">
                <div className="d-flex flex-column align-items-center justify-content-center">
                    <div>
                        <div className="tb-2">Guidance</div>
                    </div>
                        <h1 className="my-3">Customer Experiences</h1>
                        <p className="p sl-para text-start">Hear what our journeyer's have to say!</p>
                        <div className="card-holder mt-5">
                            <div className="card4 m-3">
                                <FaStar className='fastar-green'/><FaStar className='fastar-green'/><FaStar className='fastar-green'/><FaStar className='fastar-green'/><FaStar className='fastar-green'/>
                                <h4 className='py-4'>“The Insights I gained were life-changing & Profound"</h4>
                                <h6>Alice Johnson</h6>
                                <div>Life Coach, Empower</div>
                            </div>
                            <div className="card4 m-3">
                                <FaStar className='fastar-green'/><FaStar className='fastar-green'/><FaStar className='fastar-green'/><FaStar className='fastar-green'/><FaStar className='fastar-green'/>
                                <h4 className='py-4'>“A truly Transforming Experience That Opened my eyes"</h4>
                                <h6>Mark Thompson</h6>
                                <div>Author, Guider</div>
                            </div>
                            <div className="card4 m-3">
                                <FaStar className='fastar-green'/><FaStar className='fastar-green'/><FaStar className='fastar-green'/><FaStar className='fastar-green'/><FaStar className='fastar-green'/>
                                <h4 className='py-4'>“I found Clarity & Direction in my life journey"</h4>
                                <h6>Sarah Lee</h6>
                                <div>Entrepreneur, Visionary</div>
                            </div>
                        </div>
                    </div>
            </div>


            <div className="d-flex mb-5 pb-3 justify-content-center">
                <div className="col-md-10">
                    <Questions/>
                </div>
            </div>
        </>
    );
}

const PriceCard = ({ pricing_id, price, title, description, css=0 }) => {
    const navigate = useNavigate();

    const handlePaymentProceed = () => {
        const token = localStorage.getItem("authToken");
        if (token){
            navigate(`/payment-details/${pricing_id}`);
        }else{
            navigate("/login");
        }
    }

    return (
        <div className={`price-card my-3 ${css == 1 ? 'price-card2':''}`}>
            <div className="d-flex flex-column align-items-center justify-content-center">
                <h2 className='my-2 price-head mt-5'>${price}/mth</h2>
                <div className='mt-3 fw-bold'>{title}</div>
                <p>Billed anually</p>   
            </div>

            <div className="p-3">
                {description && description.map((desc)=>{
                    return(
                        <div className="d-flex justify-content-start">
                            <TiTick className='svgtick'/>
                            <div className="px-2">{desc}</div>
                        </div>        
                    )
                })}
                <div className="d-flex justify-content-center my-3 mt-4">
                    <div className={`w-100 ${ css == 1 ? 'priopa-btn prb-2' : 'prb-2' }`}
                    onClick={handlePaymentProceed}
                    >
                        <div>Get Started</div>
                    </div>
                </div>

            </div>

            
        </div>
    );
};


export default ConsultOracleHome;