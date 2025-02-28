import React, { useRef, useState } from 'react';
import './Carousel.css';
import img1 from '../../images/actual/Home Page 1.jpg';
import img2 from '../../images/actual/Home Page 2.jpg';
import svg1 from '../../isvgs/flowers-crop.webp';
import { useNavigate } from 'react-router-dom';
import { GrNext } from "react-icons/gr";
import { GrPrevious } from "react-icons/gr";


const slides = [
    {
        img: img1,
        title: "Your Future Awaits",
        heading: "Discover Insights Beyond The Ordinary",
        subtitle: "Welcome to Modern Delphi",
        description: "Personalized Oracle consultations blending ancient wisdom with modern tools. At Modern Delphi, we blend the Vision of ancient oracles with cutting-edge AI technology to deliver personalized consultations that empower you in your Journey.",
    },
    {
        img: img2,
        title: "Your Future Awaits",
        heading: "Discover Insights Beyond The Ordinary",
        subtitle: "Welcome to Modern Delphi",
        description: "This is the second slide. Personalized Oracle consultations blending ancient wisdom with modern tools. At Modern Delphi, we blend the Vision of ancient oracles with cutting-edge AI technology to deliver personalized consultations that empower you in your Journey.",
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
                                <div className="mt-4 prb-1" onClick={() => { navigate('/consult-oracle') }}>
                                    <div>View Services</div>
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