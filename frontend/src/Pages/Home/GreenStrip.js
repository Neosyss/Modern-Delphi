import React, { useEffect, useState, useRef } from 'react';
import './GreenStrip.css';

const GreenStrip = () => {
    const [numbers, setNumbers] = useState({ customers: 0, therapy: 0, years: 0, specialists: 0 });
    const [hasAnimated, setHasAnimated] = useState(false);
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated) {
                    setHasAnimated(true);
                    startCounterAnimation();
                }
            },
            { threshold: 0.5 } // Trigger when 50% of the section is visible
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, [hasAnimated]);

    const startCounterAnimation = () => {
        const durations = 5000; // Total animation time in ms
        const intervals = 50; // Update interval in ms
        const finalValues = { customers: 6250, therapy: 3200, years: 20, specialists: 15 };

        const steps = {
            customers: finalValues.customers / (durations / intervals),
            therapy: finalValues.therapy / (durations / intervals),
            years: finalValues.years / (durations / intervals),
            specialists: finalValues.specialists / (durations / intervals),
        };

        const interval = setInterval(() => {
            setNumbers((prev) => {
                const next = { ...prev };
                let allDone = true;

                for (const key in finalValues) {
                    if (prev[key] < finalValues[key]) {
                        next[key] = Math.min(prev[key] + steps[key], finalValues[key]);
                        allDone = false;
                    }
                }

                if (allDone) clearInterval(interval);
                return next;
            });
        }, intervals);
    };

    return (
        <div className="green-strip" ref={sectionRef}>
            <div className="strip-item">
                <div>{Math.floor(numbers.customers)}+</div>
                <p>Happy Customers</p>
            </div>

            <div className="strip-item">
                <div>{Math.floor(numbers.therapy)}+</div>
                <p>Successful Therapy</p>
            </div>

            <div className="strip-item">
                <div>{Math.floor(numbers.years)}+</div>
                <p>Years of Experience</p>
            </div>

            <div className="strip-item">
                <div>{Math.floor(numbers.specialists)}+</div>
                <p>Specialists</p>
            </div>
        </div>
    );
};

export default GreenStrip;
