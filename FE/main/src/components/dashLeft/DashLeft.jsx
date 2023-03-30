import React from "react";
import InvestItem from "./InvestItem";
import { InvestDB } from "./utils/InvestementDB";

function DashLeft() {
  return (
    <div className="col-span-2 min-h-[90vh] max-h-[90vh] border-r border-feay-200 items-start justify-start flex flex-col   w-full ">
      {/*top section*/}
      <div className="w-full flex items-start justify-start flex-col px-12 pt-12 pb-6">
        <h1 className="font-bold text-xl xl:text-2xl pb-2">My Subscription</h1>
        <p className="text-md text-gray-800">
          Using on Premium
        </p>
        {/*bottom section*/}
        <div className="items-start justify-start flex flex-col px-6 pt-3 pb bg-[#89F8B7] mt-6 w-full">
          <h1>temp</h1>
          <h1 className="text-xl xl:text-2xl font-bold py-6">temp</h1>
        </div>
        <div className="bg-black py px-8 w-full items-start justify-between flex shadow-xl 2xl">
          <span className="flex flex-col justify-start items-start text-white">
            <h1></h1>
            <h3></h3>
          </span>
          <span className="flex flex-col justify-start items-start text-white">
            <h1>temp</h1>
            <h3>temp</h3>
          </span>
        </div>
      </div>
      <div className="w-full items-start justify-start flex flex-col px-12 py-6">
        <h1 className="font-bold text-xl xl:text-2xl pb-2">Recent StudyRoom</h1>
        <div className="w-full space-y-4 overflow-y-auto max-h-[250px] py-5 scrollbar-hide">
        {InvestDB.map((item) => (
            <InvestItem item={item} key={item.id} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default DashLeft;
