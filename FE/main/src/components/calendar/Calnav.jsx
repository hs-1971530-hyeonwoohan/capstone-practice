import React from "react";
import Chart from "./../dashRight/Chart";

function DashLeft() {
  return (
    <div className="border-r border-feay-200 flex flex-col w-full ">
      <div className=" w-full border-b border-feay-200 flex flex-col">
        {/*top section*/}
        <div className="flex w-full px-8">
          <h1 className=" font-bold sm:text-xl  mt-2">
            Unknown
           
          </h1>
          <span className="text-base font-normal font-kr text-gray-500 ml-2 mt-2.5 whitespace-nowrap">
              님의 공부기록
            </span>
        </div>
        <div className="">
          <div className="w-full flex items-start justify-start flex-col px-8 py-4">
            <h1 className="font-bold text-lg lg:text-xl font-kr">
              열정도 : <span className="text-teal-600">Lv.3</span>
            </h1>

            {/*열정도 게이지*/}
            <div className="h-full w-full ">
              <div className="w-full h-4 bg-gray-100 rounded">
                <div className="h-full bg-gradient-to-r from-green-400 to-blue-500 rounded w-12 animate-fill duration-[2s]"></div>
              </div>
              <div className="flex justify-end">
                <div className="pr-1 text-gray-400 font-kr">100%달성</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="w-full border-t border-gray-200"></div> */}

      {/* <div className="md:flex gap-2  items-center justify-center w-full lg:space-y-0 space-y-4  lg:space-x-4  px-12 mt-8">
       
      </div> */}

      {/* chart */}
      <div className="w-full border-b border-feay-200 items-start justify-start flex flex-col px-2 ">
        <Chart />
      </div>
    </div>
  );
}

export default DashLeft;