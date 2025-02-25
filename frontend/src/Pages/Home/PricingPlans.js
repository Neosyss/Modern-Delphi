import React, { useRef, useEffect } from 'react';
import './PricingPlans.css';
import PriceCard from './PriceCard';
import img1 from '../../images/services/1.webp';
import img2 from '../../images/services/2.webp';
import img3 from '../../images/services/3.webp';


const data = [{
  id : 1,
  title : 'Illuminate Your Vision',
  price : 75,
  img : img1,
  description: 'Step into Clarity. Together, we will uncover the essence of your aspirations, crafting a vision that reflects your deepest desires and highest potential. Let the Oracle help you see beyond the present into the boundless possibilities ahead.'
},
{
  id : 2,
  title : 'Forge Your Path',
  price : 150,
  img : img2,
  description:'Guided by your vision, we will craft a purposeful mission and establish clear, attainable goals to bring it to life. The Oracle will illuminate the steps, helping you carve a detailed path toward achieving your goals, aligned with your values and potential.'
},
{
  id : 3,
  title : 'Career Counseling',
  price : 50,
  img : img3,
  description: 'Challenges are inevitable, but they need not derail you. In this session, the Oracle will help you realign with your Vision, address obstacles, and refine your course. Together, we will transform roadblocks into opportunities and ensure you stay steadfast on your journey.'
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
            <div className="row">
              {data.map((item) => (
              <div className="col-md-4 my-2 pric-pad">
                <PriceCard name={item.title} elem={item.id} img={item.img} price={item.price} key={item.id} desc={item.description}/>
              </div>
              ))}
            </div>
        </div>        
      </div>
    </div>
  );
}

export default PricingPlans;
