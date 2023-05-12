import { FaArrowLeft, FaPause, FaPlay, FaArrowRight } from 'react-icons/fa';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useState, useEffect, useRef } from 'react';
import sect01 from "../../imgs/slider/sect01.jpg"
import sect02 from "../../imgs/slider/sect02.jpg"
import { Link } from 'react-router-dom';

const slides = [
    {
      imageSrc: sect01,
      text : ["123", "456", "789"],
    },
    {
      imageSrc: sect02,
      text: ["",]
    },
    {
      imageSrc: 'https://images.pexels.com/photos/2041540/pexels-photo-2041540.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      text: '',
    },
    {
      imageSrc: 'https://images.pexels.com/photos/2004161/pexels-photo-2004161.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      text: '',
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
          <div className="relative h-96 mx-16 mt-4">
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
        <div>
          <Link>
        <div className="relative h-96 cursor-pointer">
          <img className="w-full h-full object-none rounded-2xl bg-blue-900 " src={imageSrc} alt="" />
          <div className="absolute top-0 left-0 w-full h-full flex justify-start items-center text-white text-4xl font-bold">
            <div className='pl-4'>
            <div className=''>
              slides에 있는 녀석들 각각에 
            </div>
            <div>
            text : ["123", "456", "789"] 처럼 내용 넣어주시고
            </div>
            <div>
            slides[0].text[0] 이런식으로 text의 요소들 각각을 끄집어 내시면 됩니다 링크태그 링크도 걸어주시면 됩니다.
            </div>
            </div>
            
          </div>
        </div>
        </Link>
        </div>
      );
    }
export default Carousel2;