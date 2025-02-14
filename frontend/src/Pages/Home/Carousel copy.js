import React, { useState } from 'react';
import './Carousel.css';
import img1 from '../../images/1.webp';
import img2 from '../../images/2.webp';
import svg1 from '../../isvgs/flowers-crop.webp';
import { FaChevronRight } from "react-icons/fa6";

const slides = [
    {
        img: img1,
        title: "Neosyss",
        heading: "Begin Your",
        subtitle: "Inner Peace Journey",
        description: "Embark on a journey of self-discovery and emotional healing with our expert therapists.",
    },
    {
        img: img2, 
        title: "Harmony",
        heading: "Discover Your",
        subtitle: "Inner Strength",
        description: "Embark on a journey of self-discovery and emotional healing with our expert therapists.",
    },
];

const Carousel = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const nextSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);
    };

    return (
        <div className="carousel">
            <div className="carousel-content-container">
                {/* Display the current slide */}
                <img src={slides[currentSlide].img} alt="carousel-slide" className="carousel-img" />
                <div className="row">
                    <div className="col-md-6">
                        <img src={svg1} alt="1" className="carousel-svg"/>
                    </div>
                    <div className="col-md-6 carousel-content">
                        <div className="carousel-padding">
                            <div className="tb-1">{slides[currentSlide].title}</div>
                            <h1 className="mt-2 heading-main">{slides[currentSlide].heading}</h1>
                            <span className="span">{slides[currentSlide].subtitle}</span>
                            <p className="p mt-4 p-width text-light">{slides[currentSlide].description}</p>
                            <div className="mt-4 prb-1">
                                <div>Our Services</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
                    <div className="carousel-btn  left-btn" onClick={prevSlide}>
                        <FaChevronRight className="arrow-left-svg"/>
                    </div>
                    <div className="carousel-btn  right-btn" onClick={nextSlide}>
                        <FaChevronRight className="arrow-right-svg"/>
                    </div>

            {/* Carousel navigation divs */}
            
        </div>
    );
};

export default Carousel;
