import React, { useRef, useState, useEffect } from 'react';
import './PricingPlans.css';
import img1 from '../../images/services/1.webp';
import img2 from '../../images/services/2.webp';
import img3 from '../../images/services/3.webp';
import PriceCard2 from './PriceCard';
import axios from 'axios';
import "../ConsultOracle/ConsultOracleHome.css";


const PricingPlans = () => {
  const backgroundRef = useRef(null);
  const containerRef = useRef(null);
  const [pricingDetails, setPricingDetails] = useState([]);
  
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


  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current && backgroundRef.current) {
        const containerTop = containerRef.current.getBoundingClientRect().top;
        const containerHeight = containerRef.current.offsetHeight;
        const windowHeight = window.innerHeight;

        // Check if container is in view
        if (containerTop < windowHeight && containerTop + containerHeight > 0) {
          // Calculate scroll percentage within the container
          const scrollPercentage = 
            Math.max(0, Math.min((windowHeight - containerTop) / (windowHeight + containerHeight), 1));
          
          // Limit movement and ensure smooth downward motion only
          const moveAmount = scrollPercentage * 30; // Adjust multiplier for speed control
          
          backgroundRef.current.style.transform = `translateY(-${moveAmount}%)`;
        } else {
          // Reset position when container is out of view
          backgroundRef.current.style.transform = 'translateY(0)';
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={containerRef} className="pricing-section">
      <div ref={backgroundRef} className="pricing-background">
      </div>
      <div className="pricing-content">
        <div className="row ">
            {/* <div className="d-flex justify-content-center "> */}
              {/* <div className="tb-1">Pricing</div> */}
            {/* </div> */}
            <div className="d-flex justify-content-center mt-4">
              <h1 className=" heading-main-2 mx-1">Consult The</h1>
              <span className="span style-2 mx-1 customp-set">Oracle</span>
            </div>
            <div className="justify-content-center d-flex">
            <p className='p custom-p-pricing'>Unlock personalized insights with AI-assisted guidance.</p>
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
      </div>
    </div>
  );
}

export default PricingPlans;
