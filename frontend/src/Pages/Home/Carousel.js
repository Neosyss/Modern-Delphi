import React, { useRef, useState } from 'react';
import './Carousel.css';
import img1 from '../../images/actual/sacred library.jpeg';
import img2 from '../../images/actual/Home Page 1.jpg';
import svg1 from '../../isvgs/flowers-crop.webp';
import { useNavigate } from 'react-router-dom';
import { GrNext } from "react-icons/gr";
import { GrPrevious } from "react-icons/gr";


const slides = [
    {
        img: img1,
        title: "Your Future Awaits",
        heading: "A sanctuary for seekers, thinkers, and visionaries",
        subtitle: "Welcome to Modern Delphi",
        description: "Discover a space where inquiry leads to insight and action. Ask your question, explore profound ideas, and step into your own Hero’s Journey.",
    },
    {
        img: img2,
        title: "Your Future Awaits",
        heading: "An AI Muse for the modern age, Kleio helps you shape your path",
        subtitle: "Ask. Reflect. Discover. Meet Kleio.",
        description: "Wisdom is not found in easy answers but in asking the right questions. Kleio is here to guide you—not by telling you what to do, but by helping you uncover the clarity already within you. Are you ready to explore?",
    },
];

const Carousel = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const carouselRef = useRef(null);
    const navigate = useNavigate();

    const handleNextClick = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const handlePrevClick = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    const handleMeetKleioClick = () => {
        const kleioSection = document.getElementById("kleio");
        if (kleioSection) {
            kleioSection.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <div className="carousel">
            <div className="next-arrow" onClick={handleNextClick}><GrNext  className='nextsvg'/></div>
            <div className="prev-arrow" onClick={handlePrevClick}><GrPrevious className='nextsvg'/></div>
            <div
                className="carousel-content-container"
                ref={carouselRef}
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
                {slides.map((slide, index) => (
                    <div key={index} className="carousel-slide">
                        <img src={slide.img} alt="carousel-slide" className="carousel-img" />
                        <div className="animate" key={currentSlide}>
                        <img src={svg1} alt="1" key={!currentSlide}  className="carousel-svg" />
                        <div key={index} className="carousel-content">
                            <div className="carousel-padding">
                                <div className="tb-1 mb-4">{slide.title}</div>
                                <span className="span subtitle-carousel">{slide.subtitle}</span>
                                <h1 className="mt-2 heading-carousel">{slide.heading}</h1>
                                <p className="p mt-4 text-light">{slide.description}</p>
                                <div 
                                    className="mt-4 prb-1"
                                    onClick={() => {
                                        if (index === 0) {
                                            navigate('/consult-oracle'); // Different route for this slide
                                        } else {
                                            handleMeetKleioClick();
                                        }
                                    }}
                                >
                                    <div>{index === 0 ? "View Services" : "Meet Kleio"}</div>
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Carousel;