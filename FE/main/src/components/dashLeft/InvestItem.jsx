import React from "react";

function InvestItem({ studyRoom }) {
  // const { title, desc, icon, upOrDown, percent, price } = item; //destructioring
  const { id, roomId, title, memberCount, maxMember } = studyRoom;
  return (
    <div className="w-full py-2 px-2 items-cener justify-between flex">
      {/* icon + text */}
      <div className="flex items-center justify-center space-x-4 w-full  ">
        <div className="bg-[#000000] rounded-full py-2 px-2">
          {/* <span>{icon}</span> */}
        </div>
        <div className="w-full space-y-1">
          <h4 className="font-bold">{title}</h4>
          <p className="text-sm">{
          /*desc*/
          `Joined: ${memberCount}, Max: ${maxMember}`
          }</p>
        </div>
      </div>
      {/* price + percent */}
      <div className="w-full items-end justify-end flex flex-col ">
        <h1 className="font-bold">{
        /*price*/
        `${memberCount}/${maxMember}`
        }</h1>
        <p
          className={`text-black/50`}
        >
          {/*percent*/}
        </p>
      </div>
    </div>
  );
}

export default InvestItem;