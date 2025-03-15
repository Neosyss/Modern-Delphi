import FadeInSection from '../Home/UseInView';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { FaStar } from 'react-icons/fa6';
import "./ConsultOracleHome.css";
import pic2 from '../../isvgs/flowers-crop-2.webp';
import Questions from './Questions';
import axios from 'axios';
import PaidAlready from './PaidAlready';
import { GiGraduateCap } from "react-icons/gi";
import { FaBookOpen, FaHeart } from "react-icons/fa";
import { PiTarget } from "react-icons/pi";
import { FaEye } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";

import img1 from '../../images/actual/home12.jpeg';
import img2 from '../../images/actual/home13.jpeg';
import img3 from '../../images/actual/home14.jpeg';

import unlockImg from '../../images/actual/Embrass the journey.jpg';

const ConsultOracleHome = () => {

    const [pricingDetails, setPricingDetails] = useState([]);
    const [hasPendingAppointment, setHasPendingAppointment] = useState(false);

    const handleBookNowClick = () => {
        const pricingSection = document.getElementById("pricing_plans");
        if (pricingSection) {
            pricingSection.scrollIntoView({ behavior: "smooth" });
        }
    };

    const fetchPriceData = async () => {
        try {
            const response = await axios.get('/api/price-data');
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
                if (!authToken) { navigate("/consult-oracle"); return; }
                const response = await axios.post("/api/check-paid", { authToken });
                setHasPendingAppointment(response.data.hasPendingAppointment);
            } catch (error) {
                console.error("Error checking appointment:", error);
                setHasPendingAppointment(false);
            }
        };

        checkPendingAppointment();
    }, []);

    return (
        <>
            <FadeInSection>
                <div className="slhome-background clhome-img-bg">
                    <div className="tb-2">Oracle</div>
                    <h1 className="my-3">Ask, and the path will unfold</h1>
                    <div className="d-flex justify-content-center">
                        <p className="p text-light sl-para w-80">Seek wisdom and guidance from the Oracle for your journey ahead.</p>
                    </div>
                    <div className="d-flex justify-content-center m-2">
                        <div className="prb-2 mx-1" onClick={handleBookNowClick}>
                            <div>Begin</div>
                        </div>
                    </div>
                </div>
            </FadeInSection>

            <FadeInSection>
                {hasPendingAppointment === false && (
                    <>
                        <div className="slhome-background3 pt-5" id="pricing_plans">
                            <div className="tb-2">Consultation Options</div>
                            <div className="d-flex justify-content-center align-items-center flex-column text-center">
                                <h1 className="my-3 w-80 sl-heading3">Seek Guidance for your Journey Ahead</h1>
                                <p className="p sl-para sl-heading3">Meet the Oracle, your human guide and intermediary, in a comfortable virtual environment.</p>
                            </div>
                            <div className=" my-4">
                                <div className="row justify-content-center">
                                    {pricingDetails.map((priceCard, index) => {
                                        return (
                                            <div className="col-md-4 my-2" key={priceCard.id}>
                                                <PriceCard2
                                                    pricing_id={priceCard.pricing_id}
                                                    title={priceCard.plan_name}
                                                    description={priceCard.description}
                                                    price={priceCard.price}
                                                    elem={index === 1 ? 2 : undefined} // Pass elem=2 only for index 2
                                                    image={index === 0 ? img1 : index === 1 ? img2 : img3} // Assign images dynamically
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
                    <div id="pricing_plans">
                        <PaidAlready />
                    </div>
                )}
            </FadeInSection>

            <FadeInSection>
                <div className="slhome-background4">
                    <img src={pic2} className="slhomesvg" />
                    <div className="tb-2">Guidance</div>
                    <div className="d-flex justify-content-center align-items-center flex-column text-center">
                        <h1 className="my-3  sl-heading3">The Oracle’s Role in Your Journey</h1>
                        <p className="p sl-para w-80 sl-heading3">The Oracle stands at the threshold, where the wisdom of the ancients meets the intelligence of the new age. Through the language of symbols, myth, and intuition, the Oracle reaches into the unseen, drawing forth insight from both mystical traditions and modern knowledge. AI whispers from the archives of human thought, while the Oracle interprets, reframes, and reveals what lies beneath the surface. This is not a place for answers, but for inquiry—a sacred space where the you- the Hero - is guided, through dialogue, reflection, and revelation. The path is yours to walk, but the Oracle can illuminate the way.</p>
                    </div>
                    <div className="container my-4">
                        <div className="row justify-content-center">
                            <div className="col-md-4 my-2">
                                <div className="sl-card2 p-4">
                                    <div>
                                        <GiGraduateCap className="arrow-sl lgsvg my-4" />
                                        <h5>A Bridge Between Ancient and Modern Wisdom</h5>
                                        <p>The Oracle unites mysticism and modern insight, guiding seekers with both symbolic language and structured reflection.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 my-2">
                                <div className="sl-card2 p-4 sl-spec">
                                    <div>
                                        <FaBookOpen className="arrow-sl lgsvg my-4" />
                                        <h5>Clarity Through Inquiry</h5>
                                        <p>True wisdom does not come from simple answers but from uncovering the deeper questions hidden beneath the surface.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 my-2">
                                <div className="sl-card2 p-4">
                                    <div>
                                        <PiTarget className="arrow-sl lgsvg my-4" />
                                        <h5>Guidance That Respects Your Free Will </h5>
                                        <p>The Oracle does not impose decisions but helps you explore, discern, and move forward on the path that resonates with your highest self.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </FadeInSection>

            <FadeInSection>
                <div className="slhome-background2 back-priopa">
                    <div className="row">
                        <div className="col-md-7">
                            <div className="tb-2">Guidance</div>
                            <h1 className="my-3">Unlock the Secrets of Your Journey</h1>
                            <p className="p sl-para text-start">An Oracle consultation is a profound experience designed to connect you with ancient wisdom and insight. Through intuitive guidance, you will uncover clarity and direction for your life's path.</p>
                            <p className="p my-4 mt-5 sl-para text-start">
                                <div className="d-flex justify-content-start">
                                    <FaEye className='arrow-sl mx-2' />
                                    <p className="sl-para p text-start ">Personalized insights tailored to your unique journey.</p>
                                </div>
                                <div className="d-flex justify-content-start">
                                    <FaRegHeart className='arrow-sl mx-2' />
                                    <p className="sl-para p text-start ">Experience transformative guidance from our skilled Oracles.</p>
                                </div>
                                <div className="d-flex justify-content-start">
                                    <IoSearch className='arrow-sl mx-2' />
                                    <p className="sl-para p text-start ">Find answers to your most pressing questions.</p>
                                </div>
                            </p>
                        </div>
                        <div className="col-md-5 d-flex justify-content-center align-items-center">
                            <img src={unlockImg} className="img-fluid slhomeimg1" />
                        </div>
                    </div>
                </div>
            </FadeInSection>

            <FadeInSection>
                <div className="slhome-background2 back-priopa" style={{backgroundColor:"#ecf4f0"}}>
                    <div className="d-flex flex-column align-items-center justify-content-center">
                        <h1 className="my-3">Words from Seekers</h1>
                        <p className="p sl-para text-start">Reflections from Those who have Sat Before the Oracle</p>
                        <div className="card-holder mt-5">
                            <div className="card4 m-3">
                                <FaStar className='fastar-green' /><FaStar className='fastar-green' /><FaStar className='fastar-green' /><FaStar className='fastar-green' /><FaStar className='fastar-green' />
                                <h4 className='py-4'>“The Oracle did not give me answers. Instead, they asked the one question I had been avoiding. In that moment, I saw my path more clearly than ever before."</h4>
                                <h6>Anonymous Seeker</h6>
                            </div>
                            <div className="card4 m-3">
                                <FaStar className='fastar-green' /><FaStar className='fastar-green' /><FaStar className='fastar-green' /><FaStar className='fastar-green' /><FaStar className='fastar-green' />
                                <h4 className='py-4'>“I came with confusion, and I left with fire in my spirit. The Oracle doesn’t tell you what to do—they guide you to remember what you have always known."</h4>
                                <h6>A Fellow Traveler</h6>
                            </div>
                            <div className="card4 m-3">
                                <FaStar className='fastar-green' /><FaStar className='fastar-green' /><FaStar className='fastar-green' /><FaStar className='fastar-green' /><FaStar className='fastar-green' />
                                <h4 className='py-4'>“I expected wisdom. What I found was a mirror. The Oracle held space for my truth until I was ready to see it myself."</h4>
                                <h6>A Voice from the Journey</h6>
                            </div>
                        </div>
                    </div>
                </div>
            </FadeInSection>

            <div className="d-flex mb-5 pb-3 justify-content-center">
                <div className="col-md-10">
                    <Questions />
                </div>
            </div>
        </>
    );
}

const PriceCard2 = ({ pricing_id, price, title, description, image, css = 0, elem = 1 }) => {
    const navigate = useNavigate();

    const handlePaymentProceed = () => {
        const token = localStorage.getItem("authToken") ||  localStorage.getItem("adminAuthToken");
        if (token) {
            navigate(`/payment-details/${pricing_id}`);
        } else {
            navigate("/login");
        }
    }
    return (
        <>
            <div className="price-card my-2 d-flex flex-column justify-content-between">
                <div>
                    <div className={`${elem == 2 ? "top-head-price-card2" : "top-head-price-card"}`}>
                        <h4>{title}</h4>
                    </div>

                    <div className="d-flex justify-content-between m-4">
                        <div className="d-flex justify-content-center flex-column">
                            <div className='bolder-price-card text-dark'>Start from</div>
                                <div className="heading-price-card ">${price}</div>
                                <p className='p session-pc grey'>per session</p>
                        </div>
                        <img src={image} className='price-card-img' />
                    </div>
                    <div className='grey m-3 p-2'>{description}</div>
                </div>

                <div className="d-flex justify-content-center p-3 my-3 mt-4">
                    <div className={`w-100 ${css == 1 ? 'priopa-btn prb-2' : 'prb-2'}`}
                        onClick={handlePaymentProceed}
                    >
                        <div>Get Started</div>
                    </div>
                </div>
            </div>
        </>
    )
}


export default ConsultOracleHome;