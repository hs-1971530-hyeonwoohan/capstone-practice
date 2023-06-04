import React, { useRef, useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import moment from "moment";
import VerticalDropdown from "./VerticalDropdown";

const tempStudyTime = [
  { userid: 1, usernum: "1", userrank: "1 위", usernick: "김한1", time: "10:22:00" },
  { userid: 2, usernum: "2", userrank: "2 위", usernick: "김한2", time: "08:56:47" },
  { userid: 3, usernum: "3", userrank: "3 위", usernick: "김한3", time: "08:22:21" },
  { userid: 4, usernum: "4", userrank: "4 위", usernick: "김한4", time: "06:32:11" },
  { userid: 5, usernum: "5", userrank: "5 위", usernick: "김한5", time: "04:48:35" },
  { userid: 6, usernum: "6", userrank: "6 위", usernick: "김한6", time: "01:03:43" },
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
    arrows: false,
  };

  const moment = require("moment");
  require("moment/locale/ko"); // 한국어 로케일 설정
  const currentDate = moment();
  const formattedDate = currentDate.format("YYYY.MM.DD. (dddd)");

  return (
    <div className="h-20 mt-10 mb-32 mx-20">
      <div className="flex justify-between">
        <VerticalDropdown />
        
        <div className="text-sm pr-2 text-gray-400">{formattedDate}</div>
      </div>
      <div className="flex justify-center">
        <div className="flex items-center w-full h-16 border border-gray-300 border-b-0 text-lg font-kr rounded-t">
          <span className="ml-4 flex">
            <span>
            <span className="border-4 border-teal-500 bg-teal-500 rounded-t text-white">나</span>
            <span className="font-semibold ml-6">0 위</span> 
            </span>
            <span className="font-semibold ml-24 flex-initial w-32 justify-items-start text-lg">김한 </span>
            <span className="font-normal ml-12">01:03:43</span>
          </span>
        </div>
      </div>
      <div className="h-16 flex justify-center">
        <div className="w-full h-16 flex items-center border border-gray-300 rounded-b bg-gray-100 border-t-gray-200">
          <Slider className="h-16" {...settings}>
            {tempStudyTime.map((user) => (
              <div key={user.userid} className="pb pl-4">
                <div className=" ">
                  <span className="text-lg ">
                    <span className="border-4 border-gray-500 bg-gray-500 rounded-t px-0.5  text-white">
                      {user.usernum}
                    </span>
                    <span className="w-12 font-kr font-semibold ml-6">
                      {user.userrank}
                    </span>
                    <span className="ml-24">
                      {user.usernick}
                    </span>
                    <span className="w-12 ml-32">  {user.time} </span>
                  </span>
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