import React from "react";
import { FaUserAlt } from "react-icons/fa";

const tempRooms = [
  {
    id: 1,
    title: "Study With Me",
    img: "https://images.pexels.com/photos/4144923/pexels-photo-4144923.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    current: "5/8",
  },
  {
    id: 2,
    title: "All Night Study",
    img: "https://images.pexels.com/photos/4144923/pexels-photo-4144923.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    current: "2/8",
  },
  {
    id: 3,
    title: "D-day 18",
    img: "https://images.pexels.com/photos/4144923/pexels-photo-4144923.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    current: "3/8",
  },
  
  {
    id: 4,
    title: "Cam On, Mic Off",
    img: "https://images.pexels.com/photos/4144923/pexels-photo-4144923.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    current: "1/8",
  },
  {
    id: 5,
    title: "Cam On, Mic Off",
    img: "https://images.pexels.com/photos/4144923/pexels-photo-4144923.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    current: "1/8",
  },
  {
    id: 6,
    title: "Cam On, Mic Off",
    img: "https://images.pexels.com/photos/4144923/pexels-photo-4144923.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    current: "1/8",
  },
   {
    id: 7,
    title: "Cam On, Mic Off",
    img: "https://images.pexels.com/photos/4144923/pexels-photo-4144923.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    current: "1/8",
  },
  {
    id: 8,
    title: "Cam On, Mic Off",
    img: "https://images.pexels.com/photos/4144923/pexels-photo-4144923.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    current: "1/8",
  },
];
function Studyroom() {

  return (
    <div className="px-3">
    <div className="p-2 mt-3 font-semibold text-2xl">Now Studying</div>
    <div className="min-h-[h-30] max-h-[h-30] w-90% mx-auto flex justify-around content-center">
      {tempRooms.slice(0,6).map((room) => (
        <div className="flex flex-wrap min-w-[w-30] max-w-[w-30]  px-2 py-4 relative" key={room.id}>
          <div className="mx-1 my-1 text-white absolute">
            <div>
            <FaUserAlt/>
              <span>{room.current}</span>
            </div>
          </div>
          <img
            src={room.img}
            alt=""
            className="object-cover cursor-pointer rounded"
          />
          <span className="cursor-pointer">{room.title}</span>
        </div>
      ))}
    </div>
    </div>
  );
}

export default Studyroom;
