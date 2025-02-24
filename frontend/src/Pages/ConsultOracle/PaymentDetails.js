import React, { useState, useEffect } from "react";
import "./PaymentDetails.css";
import { TiTick } from "react-icons/ti";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";

const PaymentDetails = () => {

  const { id } = useParams();
  const [plan, setPlan] = useState([]);

  const fetchPriceData = async () => {
    try {
      const response = await axios.get('/api/price-data');
      const matchingPlan = response.data.price_details.find(plan => plan.pricing_id === parseInt(id));
      if (matchingPlan) {
      setPlan(matchingPlan);
      } else {
        console.warn("No matching pricing plan found.");
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const navigate = useNavigate();

  const handlePaymentProceed = () => {
      const token = localStorage.getItem("authToken");
      if (token){
          navigate(`/stripe-payment/${id}`);
      }else{
          navigate("/login");
      }
  }

  useEffect(() => {
    fetchPriceData();
  }, []);

  return (
    <div className="stripe-page">
      <div className="d-flex justify-content-center my-4">
        <div className="payment-details-main ">
          <h3 className="my-2">Pricing Details</h3>
          <div className="row">
            <div className="col-md-5 height-pd my-2 d-flex justify-content-center align-items-center">
              <h1 className="price-lg">${plan.price}</h1>
            </div>
            <div className="col-md-7 height-pd my-2">
              <span className="span my-4 fs-med ">{plan.plan_name}</span>
              <p className="p my-4 text-dark">Billed One Time Only</p>
              
              {plan.description && plan.description.map((desc, index) => {
                  return desc.trim() !== "" && (  // Check if desc is not empty
                      <div key={index} className="d-flex justify-content-start">
                          <TiTick className='svgtick'/>
                          <div className="px-2">{desc}</div>
                      </div>        
                  );
              })}

              <div className="d-flex justify-content-center my-5">
                    
                    <div className="prb-1 mx-2" onClick={() => navigate('/consult-oracle')}
                    ><div>Back</div></div>
                    <div className={` prb-2`}
                    onClick={handlePaymentProceed}
                    >
                        <div>Get Started</div>
                    </div>
                </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentDetails;