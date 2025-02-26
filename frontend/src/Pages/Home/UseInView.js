import { useState, useEffect, useRef } from 'react';

const UseInView = (threshold = 0.2) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect(); // Stop observing once it's visible
                }
            },
            { threshold }
        );

        if (ref.current) observer.observe(ref.current);

        return () => observer.disconnect();
    }, []);

    return [ref, isVisible];
};

// import React from 'react';
// import useInView from '../hooks/useInView'; // Import the hook
// import './FadeInSection.css'; // Import CSS

const FadeInSection = ({ children }) => {
    const [ref, isVisible] = UseInView();

    return (
        <div ref={ref} className={`fade-section ${isVisible ? 'animate-in' : ''}`}>
            {children}
        </div>
    );
};

export default FadeInSection;


// export default UseInView;
