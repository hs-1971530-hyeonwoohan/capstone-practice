import React, { useState, useEffect } from "react";
import { FaUserAlt } from "react-icons/fa";
import AnimatedIcon from "../../imgs/AnimatedIcons";
import Calendar from "./../calendar/Calendar";
import { AiOutlinePlus } from "react-icons/ai";
import { getStudyRoomList } from "../../api/axios";
import { Link } from "react-router-dom";

const tempRooms = [
  {
    id: 1,
    title: "Study With Me",
    img: "https://images.pexels.com/photos/4144923/pexels-photo-4144923.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    current: "5/8",
    fire: 6,
    hashTag: "#공시, #CPA, #변리사",
  },
  {
    id: 2,
    title: "All Night Study",
    img: "https://images.pexels.com/photos/4144923/pexels-photo-4144923.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    current: "2/8",
    fire: 6,
    hashTag: "#코딩테스트",
  },
  {
    id: 3,
    title: "D-day 18",
    img: "https://images.pexels.com/photos/4144923/pexels-photo-4144923.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    current: "3/8",
    fire: 5,
    hashTag: "#공시, #CPA, #변리사",
  },

  {
    id: 4,
    title: "Cam On, Mic Off",
    img: "https://images.pexels.com/photos/4144923/pexels-photo-4144923.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    current: "1/8",
    fire: 4,
    hashTag: "#중간고사, #내신",
  },
  {
    id: 5,
    title: "Cam On, Mic Off",
    img: "https://images.pexels.com/photos/4144923/pexels-photo-4144923.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    current: "1/8",
    fire: 3,
    hashTag: "#수능",
  },
  {
    id: 6,
    title: "Cam On, Mic Off",
    img: "https://images.pexels.com/photos/4144923/pexels-photo-4144923.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    current: "1/8",
    fire: 2,
    hashTag: "",
  },
  {
    id: 7,
    title: "Cam On, Mic Off",
    img: "https://images.pexels.com/photos/4144923/pexels-photo-4144923.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    current: "1/8",
    hashTag: "",
  },
  {
    id: 8,
    title: "Cam On, Mic Off",
    img: "https://images.pexels.com/photos/4144923/pexels-photo-4144923.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    current: "1/8",
    icon: "../../imgs/fireIcon.gif",
    hashTag: "",
  },
];
function Studyroom() {
  const [displayCount, setDisplayCount] = useState(6);

  const loadMore = () => {
    setDisplayCount(displayCount + 6);
  };


  return (
    <div className="mx-20 h-full mt-5">
      <div className="p-2 mt-3 font-semibold text-2xl">Now Studying</div>
      <div className="grid grid-cols-6 min-h-[h-28] max-h-[h-28] mx-auto w-full content-center ">
        {tempRooms.slice(0, displayCount).map((room) => (
          <Link to={'/room'}>
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
          </Link>
        ))}
      </div>
      {displayCount < tempRooms.length && (
        <div className="relative mt-6">
          <hr className="absolute top-1/2 transform -translate-y-1/2 border-gray-200 w-full" />
          <button
            onClick={loadMore}
            className="p-2 bg-white items-center text-gray-500 border-2 border-spacing-24 px-6 rounded-full shadow hover:shadow-md relative z-10 flex justify-center mx-auto"
          >
            <AiOutlinePlus className=" text-gray-500" />
            <span className="ml-2">더보기</span>
          </button>
        </div>
      )}
    </div>
  );
}

export default Studyroom;