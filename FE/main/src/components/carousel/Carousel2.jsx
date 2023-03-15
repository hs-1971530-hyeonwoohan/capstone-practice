import { FaArrowLeft, FaPause, FaPlay, FaArrowRight } from 'react-icons/fa';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useState, useEffect, useRef } from 'react';

const slides = [
    {
      imageSrc: 'https://images.pexels.com/photos/301920/pexels-photo-301920.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      text: 'Slide 1',
    },
    {
      imageSrc: 'https://images.pexels.com/photos/12064/pexels-photo-12064.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      text: 'Slide 2',
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
          <div className="relative h-80 mx-5">
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
        <div className="relative h-80">
          <img className="w-full h-full object-cover rounded-lg" src={imageSrc} alt="" />
          <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center text-white text-4xl font-bold">{text}</div>
        </div>
      );
    }
export default Carousel2;