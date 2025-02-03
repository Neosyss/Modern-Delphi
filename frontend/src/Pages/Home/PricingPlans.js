import React, { useRef, useEffect } from 'react';
import './PricingPlans.css';
import PriceCard from './PriceCard';
import img1 from '../../images/services/1.webp';
import img2 from '../../images/services/2.webp';
import img3 from '../../images/services/3.webp';


const data = [{
  id : 1,
  title : 'Individual Therapy',
  price : 150,
  img : img1
},
{
  id : 2,
  title : 'Couples Counceling',
  price : 180,
  img : img2
},
{
  id : 3,
  title : 'Career Counseling',
  price : 190,
  img : img3
}
];

const PricingPlans = () => {
  const backgroundRef = useRef(null);
  const containerRef = useRef(null);

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
            <div className="d-flex justify-content-center ">
              <div className="tb-1">Our Packages</div>
            </div>
            <div className="d-flex justify-content-center mt-4">
              <h1 className=" heading-main-2 mx-1">Pricing</h1>
              <span className="span style-2 mx-1 customp-set">Plans</span>
            </div>
            <div className="justify-content-center d-flex">
            <p className='p custom-p-pricing'>Qui culpa qui consequat officia cillum quis irure aliquip ut dolore sit eu culpa ut irure nisi occaecat dolore adipisicing.</p>
            </div>
            <div className="row">
              {data.map((item) => (
              <div className="col-md-4 my-2 pric-pad">
                <PriceCard name={item.title} elem={item.id} img={item.img} price={item.price} key={item.id}/>
              </div>
              ))}
            </div>
        </div>        
      </div>
    </div>
  );
}

export default PricingPlans;
