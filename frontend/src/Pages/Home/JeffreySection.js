import React, { useRef, useEffect } from 'react';
import img from '../../images/team/2.webp';
import './JeffreySection.css';

const JeffreySection = () => {
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
    <div ref={containerRef} className="jeffrey-section">
      <div ref={backgroundRef} className="jeffrey-background">
      </div>
      <div className="jeffrey-content">
        <div className="row ">
          <div className="col-md-2 offset-md-2 pic-secjef h-full">
            <div className="d-flex flex-column justify-content-center align-items-center">
              <img src={img} className="jefpic" alt="Jeffrey Mussman" />
              <div className="jeftitle">Jeffrey Mussman</div>
              <div>Individual Therapy</div>
            </div>
          </div>    
          <div className="col-md-6 h-full jeffrey-content margin-topjef">
            Neosyss is exceptional! Their psychologists are highly professional and caring. The atmosphere is welcoming and calming, and the staff provides outstanding support. Thank you, Neosyss, for your excellent service!
          </div>
        </div>        
      </div>
    </div>
  );
}

export default JeffreySection;
