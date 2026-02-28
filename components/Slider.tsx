 'use client';
import React from 'react';
import SliderLib from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Slider = ({ images, noDot }) => {
    const settings = {
        dots: !noDot,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        arrows: true,
        swipe: true,
        swipeToSlide: true,
        nextArrow: null,
        prevArrow: null


    };

    return (
        <div>
            <SliderLib {...settings}>
                {images.map((image, index) => (
                    <div key={index}>
                        <img
                            src={image}
                            alt={`Slide ${index + 1}`}
                            style={{ width: '1200px', height: '100%', maxHeight: '500px', objectFit: 'cover', display: 'block' }}
                        />
                    </div>
                ))}
            </SliderLib>
        </div>
    );
};

export default Slider;