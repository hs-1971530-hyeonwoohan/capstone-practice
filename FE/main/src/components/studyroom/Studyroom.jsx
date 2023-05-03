import React from "react";
import { FaUserAlt } from "react-icons/fa";
import AnimatedIcon from "../../imgs/AnimatedIcons";

const tempRooms = [
  {
    id: 1,
    title: "Study With Me",
    img: "https://images.pexels.com/photos/4144923/pexels-photo-4144923.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    current: "5/8",
    fire: 6,
    hashTag: "#공시, #CPA, #변리사"
  },
  {
    id: 2,
    title: "All Night Study",
    img: "https://images.pexels.com/photos/4144923/pexels-photo-4144923.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    current: "2/8",
    fire: 6,
    hashTag: "#코딩테스트"
  },
  {
    id: 3,
    title: "D-day 18",
    img: "https://images.pexels.com/photos/4144923/pexels-photo-4144923.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    current: "3/8",
    fire: 5,
    hashTag: "#공시, #CPA, #변리사"
  },

  {
    id: 4,
    title: "Cam On, Mic Off",
    img: "https://images.pexels.com/photos/4144923/pexels-photo-4144923.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    current: "1/8",
    fire: 4,
    hashTag: "#중간고사, #내신"
  },
  {
    id: 5,
    title: "Cam On, Mic Off",
    img: "https://images.pexels.com/photos/4144923/pexels-photo-4144923.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    current: "1/8",
    fire: 3,
    hashTag: "#수능"
  },
  {
    id: 6,
    title: "Cam On, Mic Off",
    img: "https://images.pexels.com/photos/4144923/pexels-photo-4144923.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    current: "1/8",
    fire: 2,
    hashTag: ""
  },
  {
    id: 7,
    title: "Cam On, Mic Off",
    img: "https://images.pexels.com/photos/4144923/pexels-photo-4144923.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    current: "1/8",
    hashTag: ""
    
  },
  {
    id: 8,
    title: "Cam On, Mic Off",
    img: "https://images.pexels.com/photos/4144923/pexels-photo-4144923.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    current: "1/8",
    icon: "../../imgs/fireIcon.gif",
    hashTag: ""
  },
];
function Studyroom() {
  return (
    <div className="px-3 h-full">
      <div className="p-2 mt-3 font-semibold text-2xl">Now Studying</div>
      <div className="min-h-[h-28] max-h-[h-28] mx-auto w-full flex  content-center">
        {tempRooms.slice(0, 6).map((room) => (
          <div
            className="flex min-w-[w-28] max-w-[w-28] px-2 py-4 relative"
            key={room.id}
          >
            <div className="mx-1 my-1 text-white absolute">
              <div>
                <FaUserAlt />
                <span>{room.current}</span>
              </div>
            </div>
            <div>
              <img
                src={room.img}
                alt=""
                className="object-cover cursor-pointer rounded"
              />
              <div className="w-full pt-2 cursor-pointer flex justify-between">
              <div className="pt">{room.title}</div>
              <div className="pr-2">
                <AnimatedIcon fire={room.fire} />
              </div>
              
            </div>
            <div className="text-sm text-gray-300">{room.hashTag}</div>
            </div>
            {/*icon 집어넣을 자리*/}

            
          </div>
        ))}
      </div>
    </div>
  );
}

export default Studyroom;
