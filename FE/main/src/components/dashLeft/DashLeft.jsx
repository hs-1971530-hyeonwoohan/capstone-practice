import React from "react";
import InvestItem from "./InvestItem";
import { InvestDB } from "./utils/InvestementDB";


function DashLeft() {
  return (
    <div className="col-span-2 min-h-[90vh] max-h-[90vh] border-r border-feay-200 items-start justify-start flex flex-col   w-full ">
      {/*top section*/}
      <div className="w-full flex items-start justify-start flex-col px-12 pt-12 pb-6">
        <h1 className="font-bold text-xl xl:text-2xl pb-2 font-kr">
          열정도 : <span className="text-teal-600">Lv.3</span>
        </h1>

        {/*열정도 게이지*/}
        <div className="h-32 w-full pt-3">
          <div className="w-full h-4 bg-gray-100 rounded">
            <div className="h-full bg-gradient-to-r from-green-400 to-blue-500 rounded w-12 animate-fill duration-[2s]"></div>
          </div>
          <div className="flex justify-end">
            <div className="pr-1 pt-2 text-gray-400 font-kr">100%달성</div>
          </div>
          <div className="font-kr pt-2"> 
            <div className="font-bold">당신의 열정을 보여주세요!</div>
            <div className="flex justify-between"> <div className="text-gray-400">다음 레벨까지 남은 경험치: 2850</div> <div className="px-2 py-1 rounded text-white bg-blue-500 hover:bg-blue-400 cursor-pointer ">혜택</div> </div>
          </div>
        </div>
      </div>

      <div className="w-full border-b border-gray-200 pt-1">

      </div>
      <div className="w-full items-start justify-start flex flex-col px-12 py-6">
        <h1 className="font-bold text-xl xl:text-2xl pb-2">Recent StudyRoom</h1>
        <div className="w-full space-y-4 overflow-y-auto max-h-[350px] py-5 scrollbar-hide">
          {InvestDB.map((item) => (
            <InvestItem item={item} key={item.id} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default DashLeft;
