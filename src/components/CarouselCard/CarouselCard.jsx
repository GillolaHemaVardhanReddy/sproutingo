import React, { useRef } from 'react';
import './CarouselCard.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import orderNow from '../../assets/ordernow.jpg';

function Arrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", background: "black" }}
            onClick={onClick}
        />
    );
}

function CarouselCard() {
    const sliderRef = useRef(null);

    const handleWheel = (e) => {
        e.preventDefault();
        if (sliderRef.current) {
            if (e.deltaX < 0) {
                sliderRef.current.slickPrev();
            } else if (e.deltaX > 0) {
                sliderRef.current.slickNext();
            }
        }
    };

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
        // prevArrow: <Arrow />,
        // nextArrow: <Arrow />,
        initialSlide: 0,
        autoplay: true,
        autoplaySpeed: 1000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    };

    return (
        <div className='container' onWheel={handleWheel}>
            <br></br>
            <br></br>
            <Slider ref={sliderRef} {...settings}>
                <div className='card'>
                    <img src={orderNow} alt="hello" className='image' />
                </div>
                <div className='card'>
                    <img src={orderNow} alt="hello" className='image' />
                </div>
                <div className='card'>
                    <img src={orderNow} alt="hello" className='image' />
                </div>
                <div className='card'>
                    <img src={orderNow} alt="hello" className='image' />
                </div>
                <div className='card'>
                    <img src={orderNow} alt="hello" className='image' />
                </div>
            </Slider>
        </div>
    );
}

export default CarouselCard;

