import React, { useState } from 'react';
import './Carousel.css';
import img2 from '../../images/2.webp';
import svg1 from '../../isvgs/flowers-crop.webp';
import { useNavigate } from 'react-router-dom';

const slides = [
   
    {
        img: img2, 
        title: "Your Future Awaits",
        heading: "Discover Insights Beyond The Ordinary",
        subtitle: "Welcome to Modern Delphi",
        description: "Personalized Oracle consultations blending ancient wisdom with modern tools. At Modern Delphi, we blend the Vision of ancient oracles with cutting-edge AI technology to deliver personalized consultations that empower you in your Journey.",
    },
];

const Carousel = () => {
    const navigate = useNavigate();
    return (
        <div className="carousel">
            <div className="carousel-content-container">
                {/* Display the current slide */}
                <img src={slides[0].img} alt="carousel-slide" className="carousel-img" />
                <div className="row">
                    <div className="col-md-6">
                        <img src={svg1} alt="1" className="carousel-svg"/>
                    </div>
                    <div className="col-md-6 carousel-content">
                        <div className="carousel-padding">
                            <div className="tb-1 mb-4">{slides[0].title}</div>
                            <span className="span subtitle-carousel">{slides[0].subtitle}</span>
                            <h1 className="mt-2 heading-carousel">{slides[0].heading}</h1>
                            <p className="p mt-4 text-light">{slides[0].description}</p>
                            <div className="mt-4 prb-1" onClick = {()=> {navigate('/consult-oracle')}}>
                                <div>View Services</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    );
};

export default Carousel;
