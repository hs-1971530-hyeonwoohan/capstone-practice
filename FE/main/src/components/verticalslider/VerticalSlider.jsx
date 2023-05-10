import React, { useRef, useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const tempStudyTime = [
  { userid: 1, usernick: "김한1", time: "10:22:00" },
  { userid: 2, usernick: "김한2", time: "8:56:47" },
  { userid: 3, usernick: "김한3", time: "8:22:21" },
  { userid: 4, usernick: "김한4", time: "6:32:11" },
  { userid: 5, usernick: "김한5", time: "4:48:35" },
  { userid: 6, usernick: "김한6", time: "1:03:43" },
];

const VerticalSlider = () => {
  const settings = {
    dots: false,
    infinite: true,
    vertical: true,
    verticalSwiping: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    className: "vertical-slider",
    autoplay: true,
    autoplaySpeed: 2500,
    arrows: false
  };

  return (
    <div className="h-20 mt-20 mb-28 mx-5">
      <div className="flex justify-center">
        <div className="flex items-center w-full h-16 border border-gray-300 border-b-0 text-lg font-kr rounded-t">
          <span className="ml-4">(나) 김한 : 1:03:43</span>
        </div>
      </div>
      <div className="h-16 flex justify-center">
        <div className="w-full h-16 flex items-center border border-gray-300 rounded-b bg-gray-100 border-t-gray-200">
          <Slider className="h-16" {...settings}>
            {tempStudyTime.map((user) => (
              <div key={user.userid} className="pb pl-4">
                <div className=" ">
                  <p className="text-lg ">
                    <span className="w-12 font-kr font-semibold">{user.usernick}</span>
                    <span className="w-12 "> - {user.time} </span>
                  </p>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default VerticalSlider;
