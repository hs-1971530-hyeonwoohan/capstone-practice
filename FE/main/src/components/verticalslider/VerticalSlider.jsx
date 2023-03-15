import React, { useRef, useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const VerticalSlider = () => {

  const settings = {
    dots: false,
    infinite: true,
    vertical: true,
    verticalSwiping: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    className: 'vertical-slider',
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="w-full h-9 flex justify-start">
      <div className="w-full md:w-2/3 flex justify-center items-center">
        <Slider {...settings}>
          <div className="text-left">
            <div className="h-9 overflow-hidden whitespace-no-wrap">
              <p className="text-xl md:text-2xl">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
          </div>
          <div className="text-left">
            <div className="h-9 overflow-hidden whitespace-no-wrap">
              <p className="text-xl md:text-2xl">Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </div>
          </div>
          <div className="text-left">
            <div className="h-9 overflow-hidden whitespace-no-wrap">
              <p className="text-xl md:text-2xl">Vestibulum id ligula porta felis euismod semper.</p>
            </div>
          </div>
        </Slider>
      </div>
    </div>
  );
};

export default VerticalSlider;