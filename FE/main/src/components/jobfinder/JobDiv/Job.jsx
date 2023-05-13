import React from "react";
// Imported Icons ============>
import { BiTimeFive } from "react-icons/bi";
// Imported Images ===========>
import logo1 from '../Assets/logo (1).png'
import logo2 from '../Assets/logo (2).png'
import logo3 from '../Assets/logo (3).png'
import logo4 from '../Assets/logo (4).png'
import logo5 from '../Assets/logo (5).png'
import logo6 from '../Assets/logo (6).png'
import logo7 from '../Assets/logo (7).png'
import logo8 from '../Assets/logo (8).png'

const Data = [
  {
    id:1, 
    image: logo1,
    title: 'Web Developer',
    time: 'Now',
    location: 'Seoul',
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    company: 'Novac Linus Co.'
  },
  {
    id:2, 
    image: logo2,
    title: 'Web Developer',
    time: '14Hrs',
    location: 'Seoul',
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    company: 'Liquid Accessments'
  },
  {
    id:3, 
    image: logo3,
    title: 'Web Developer',
    time: '10Hrs',
    location: 'Seoul',
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    company: 'Web Tech Agency'
  },
  {
    id:4, 
    image: logo4,
    title: 'Web Developer',
    time: '10Hrs',
    location: 'Seoul',
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    company: 'Web Tech Agency'
  },
  {
    id:5, 
    image: logo5,
    title: 'Web Developer',
    time: '10Hrs',
    location: 'Seoul',
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    company: 'Web Tech Agency'
  },
  {
    id:6, 
    image: logo6,
    title: 'Web Developer',
    time: '10Hrs',
    location: 'Seoul',
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    company: 'Web Tech Agency'
  },
  {
    id:7, 
    image: logo7,
    title: 'Web Developer',
    time: '10Hrs',
    location: 'Seoul',
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    company: 'Web Tech Agency'
  },
  {
    id:8, 
    image: logo8,
    title: 'Web Developer',
    time: '10Hrs',
    location: 'Seoul',
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    company: 'Web Tech Agency'
  }
]

const Job = () => {
  return (
    <div>
      <div className="jobcontainer flex gap-10 justify-center flex-wrap items-center py-10">
        {/* <div className="group group/item singleJob w-[250px] p-[20px] bg-white rounded [10px] hover:bg-blueColor shoadow-lg shadow-greyIsh-400/700 hover:shadow-lg">
          <span className="flex justify-between items-center gap-4">
            <h1 className="text-[16px] font-semibold text-textColor group-hover:text-white">
              Web Developer
            </h1>
            <span className="flex items-center text-[#ccc] gap-1">
              <BiTimeFive />
              Now
            </span>
          </span>
          <h6 className="text-[#ccc]">Canada</h6>

          <p className="text-[13px] text-[#95959] ty-[20px] border-t-[2px] mt-[20px] group-hover:text-white">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus
            quibusdam quis delectus ipsum accusantium numquam omnis accusamus
            totam nesciunt aliquid, praesentium, quae id itaque veritatis eum
            molestias nulla optio distinctio.
          </p>

          <div className="company flex items-center gap-2">
            <img src={logo1} alt="Company Logo" className="w-[10%]" />
            <span className="text-[14px] py-[1rem] block group-hover:text-white">Novac Linus Co.</span>
          </div>

          <button className="border-[2px] rounded-[10px] block p-[10px] w-full text-[14px] onfts-semibold text-textColor hover:bg-white group-hover/item:text-textColor group-hover:text-white">
            Apply Now
          </button>

        </div> */}
        {
          Data.map(({id,image,title,time,location,desc,company}) => {
            return (
              // This will return a single job post based on the ID
            <div key={id} className="group group/item singleJob w-[250px] p-[20px] bg-white rounded [10px] hover:bg-blueColor shoadow-lg shadow-greyIsh-400/700 hover:shadow-lg">
            <span className="flex justify-between items-center gap-4">
              <h1 className="text-[16px] font-semibold text-textColor group-hover:text-white">
                {title}
              </h1>
              <span className="flex items-center text-[#ccc] gap-1">
                <BiTimeFive />
                {time}
              </span>
            </span>
            <h6 className="text-[#ccc]">{location}</h6>
  
            <p className="text-[13px] text-[#95959] ty-[20px] border-t-[2px] mt-[20px] group-hover:text-white">
              {desc}
            </p>
  
            <div className="company flex items-center gap-2">
              <img src={image} alt="Company Logo" className="w-[10%]" />
              <span className="text-[14px] py-[1rem] block group-hover:text-white">{company}</span>
            </div>
  
            <button className="border-[2px] rounded-[10px] block p-[10px] w-full text-[14px] onfts-semibold text-textColor hover:bg-white group-hover/item:text-textColor group-hover:text-white">
              Apply Now
            </button>
  
          </div>)
          })
        }
      </div>
    </div>
  );
};

export default Job;
