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
import logo9 from '../Assets/logo (9).png'
import logo10 from '../Assets/logo (10).jpg'
import logo11 from '../Assets/logo (11).png'
import logo12 from '../Assets/logo (12).png'
import logo13 from '../Assets/logo (13).png'
import logo14 from '../Assets/logo (14).png'
import logo15 from '../Assets/logo (15).png'
import logo16 from '../Assets/logo (16).png'
import logo17 from '../Assets/logo (17).png'
import logo18 from '../Assets/logo (18).png'
import logo19 from '../Assets/logo (19).png'
import logo20 from '../Assets/logo (20).png'


const Data = [
  {
    id:1, 
    image: logo1,
    title: 'Web Developer',
    time: 'Now',
    location: 'Seoul',
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    company: 'Microsoft'
  },
  {
    id:2, 
    image: logo2,
    title: 'Web Developer',
    time: '14Hrs',
    location: 'Seoul',
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    company: 'ATI technologies'
  },
  {
    id:3, 
    image: logo3,
    title: 'Web Developer',
    time: 'Yerterday',
    location: 'Seoul',
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    company: 'NAVER'
  },
  {
    id:4, 
    image: logo4,
    title: 'Web Developer',
    time: '8Hrs',
    location: 'Seoul',
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    company: 'McDonald'
  },
  {
    id:5, 
    image: logo5,
    title: 'Web Developer',
    time: '2Days',
    location: 'Seoul',
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    company: 'twitter'
  },
  {
    id:6, 
    image: logo6,
    title: 'Web Developer',
    time: '5Hrs',
    location: 'Seoul',
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    company: 'Apple'
  },
  {
    id:7, 
    image: logo7,
    title: 'Web Developer',
    time: '30Secs',
    location: 'Seoul',
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    company: 'SAMSUNG'
  },
  {
    id:8, 
    image: logo8,
    title: 'Web Developer',
    time: '10Mins',
    location: 'Seoul',
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    company: 'Instagram'
  },
  {
    id:9, 
    image: logo9,
    title: 'Web Developer',
    time: '43Mins',
    location: 'Seoul',
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    company: 'Coupang'
  },
  {
    id:10, 
    image: logo10,
    title: 'Web Developer',
    time: '7Hrs',
    location: 'Seoul',
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    company: 'Hundai Motors'
  },
  {
    id:11, 
    image: logo11,
    title: 'Web Developer',
    time: '1Hrs',
    location: 'Seoul',
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    company: 'Toss Invest'
  },
  {
    id:12, 
    image: logo12,
    title: 'Web Developer',
    time: '3Weeks',
    location: 'Seoul',
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    company: 'CJ ENM'
  },
  {
    id:13, 
    image: logo13,
    title: 'Web Developer',
    time: '4Days',
    location: 'Seoul',
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    company: 'KIA'
  },
  {
    id:14, 
    image: logo14,
    title: 'Web Developer',
    time: '3Hrs',
    location: 'Seoul',
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    company: 'Posco'
  },
  {
    id:15, 
    image: logo15,
    title: 'Web Developer',
    time: '6Hrs',
    location: 'Seoul',
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    company: '배달의 민족'
  },
  {
    id:16, 
    image: logo16,
    title: 'Web Developer',
    time: '2Days',
    location: 'Seoul',
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    company: 'Facebook'
  },
  {
    id:17, 
    image: logo17,
    title: 'Web Developer',
    time: '5Days',
    location: 'Seoul',
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    company: 'Line'
  },
  {
    id:18, 
    image: logo18,
    title: 'Web Developer',
    time: '2Weeks',
    location: 'Seoul',
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    company: 'Google'
  },
  {
    id:19, 
    image: logo19,
    title: 'Web Developer',
    time: '20Mins',
    location: 'Seoul',
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    company: 'LG'
  },
  {
    id:20, 
    image: logo20,
    title: 'Web Developer',
    time: '20Hrs',
    location: 'Seoul',
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    company: 'KB Bank'
  }
]

const Job = () => {
  return (
    <div>
      <div className="jobcontainer flex gap-10 justify-center flex-wrap items-center py-10">
        {
          Data.map(({id,image,title,time,location,desc,company}) => {
            return (
              // This will return a single job post based on the ID
            <div key={id} className="group group/item singleJob w-[260px] p-[20px] bg-white rounded [10px] hover:bg-teal-500 shoadow-lg shadow-greyIsh-400/700 hover:shadow-lg border-2 border-feay-200">
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
              <img src={image} alt="Company Logo" className="w-[15%]" />
              <span className="text-[14px] py-[1rem] block group-hover:text-white">{company}</span>
            </div>
  
            <button className="border-[2px] rounded-[10px] block p-[10px] w-full text-[14px] onfts-semibold text-textColor  hover:bg-teal-700 group-hover/item:text-textColor group-hover:text-white">
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