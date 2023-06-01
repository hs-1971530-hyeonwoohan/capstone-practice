import React from "react";

function InvestItem({ item }) {
  const { title, desc, icon, image, percent, price } = item; //destructioring
  return (
    <div className="w-full py-2 px-2 items-cener justify-between flex">
      {/* icon + text */}
      <div className="flex items-center justify-center space-x-4 w-full  ">
        {/* <div className="bg-[#DBEEF4] rounded-full py-2 px-2"> */}
        <div>
        <img src={image} className="w-[300px] rounded-lg"/>
        </div>
        <div className="w-full space-y-1">
          <h4 className="font-bold text-xl">{title}</h4>
          <p className="text-sm">{desc}</p>
        </div>
      </div>
      {/* price + percent */}
      <div className="w-full items-end justify-end flex flex-col ">
        <h1 className="font-bold">{price}</h1>
        <p
          className={`text-black/50`}
        >
          {percent}
        </p>
      </div>
    </div>
  );
}

export default InvestItem;
