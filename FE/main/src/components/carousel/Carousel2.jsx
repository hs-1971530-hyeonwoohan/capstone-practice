import { FaArrowLeft, FaPause, FaPlay, FaArrowRight } from 'react-icons/fa';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useState, useEffect, useRef } from 'react';
import sect01 from "../../imgs/slider/sect01.jpg"
import sect02 from "../../imgs/slider/sect02.jpg"

const slides = [
    {
      imageSrc: sect01,
      text: '',
    },
    {
      imageSrc: sect02,
      text: ["",]
    },
    {
      imageSrc: 'https://images.pexels.com/photos/2041540/pexels-photo-2041540.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      text: 'Slide 3',
    },
    {
      imageSrc: 'https://images.pexels.com/photos/2004161/pexels-photo-2004161.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      text: 'Slide 4',
    },
  ];
  
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false
  };
  
  function Carousel2() {
    const sliderRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(true);
  
    const handlePrev = () => {
      sliderRef.current.slickPrev();
    };
  
    const handleNext = () => {
      sliderRef.current.slickNext();
    };
  
    const handlePlayPause = () => {
      setIsPlaying(!isPlaying);
    };
  
    useEffect(() => {
      const interval = setInterval(() => {
        if (isPlaying) {
          sliderRef.current.slickNext();
        }
      }, 3000);
      return () => clearInterval(interval);
    }, [isPlaying]);
  
    return (
        <div>
          <div className="relative h-96 mx-5 mt-4">
            <Slider {...settings} ref={sliderRef}>
              {slides.map(slide => (
                <Slide key={slide.text} imageSrc={slide.imageSrc} text={slide.text} />
              ))}
            </Slider>
            <div className="slider-buttons absolute bottom-0 left-0 right-0 flex justify-start items-center pl-8 py-4">
              <button
                className=" text-white p-2 rounded-full focus:outline-none hover:text-black"
                onClick={handlePrev}
              >
                <FaArrowLeft />
              </button>
              <button
                className=" text-white p-2 rounded-full focus:outline-none hover:text-black"
                onClick={handlePlayPause}
              >
                {isPlaying ? <FaPause /> : <FaPlay />}
              </button>
              <button
                className=" text-white p-2 rounded-full focus:outline-none hover:text-black"
                onClick={handleNext}
              >
                <FaArrowRight />
              </button>
            </div>
          </div>
        </div>
      );
    }
    
    function Slide({ imageSrc, text }) {
      return (
        <div className="relative h-96 cursor-pointer">
          <img className="w-full h-full object-none rounded-lg bg-blue-900 " src={imageSrc} alt="" />
          <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center text-white text-4xl font-bold">{text}</div>
        </div>
      );
    }
export default Carousel2;