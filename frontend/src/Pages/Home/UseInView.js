import { useState, useEffect, useRef } from "react";

const UseInView = (threshold = 0.2) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting); // Update visibility whenever it enters or exits
            },
            { threshold }
        );

        if (ref.current) observer.observe(ref.current);

        return () => observer.disconnect();
    }, []);

    return [ref, isVisible];
};

const FadeInSection = ({ children }) => {
    const [ref, isVisible] = UseInView();

    return (
        <div ref={ref} className={`fade-section ${isVisible ? 'animate-in' : 'animate-out'}`}>
            {children}
        </div>
    );
};

export default FadeInSection;



// export default UseInView;
