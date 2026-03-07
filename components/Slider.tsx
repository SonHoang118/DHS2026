 'use client';

import SliderLib from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

type SliderProps = {
    images: string[];
};

const Slider = ({ images }: SliderProps) => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveHeight: false,
        autoplay: true,
        autoplaySpeed: 5000,
        arrows: true,
        swipe: true,
        swipeToSlide: true,
        nextArrow: null,
        prevArrow: null


    };

    return (
        <div className="hero-slider" style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
            <SliderLib {...settings}>
                {images.map((image: string, index: number) => (
                    <div key={index} style={{ width: '100%', height: '100%' }}>
                        <img
                            src={image}
                            alt={`Slide ${index + 1}`}
                            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                        />
                    </div>
                ))}
            </SliderLib>
        </div>
    );
};

export default Slider;