import React from "react";
import { FaSistrix, FaHeart } from "react-icons/fa";
import { BsAward } from "react-icons/bs";

function FreeBoardHeader() {
  return (
    <div>
      <div className="mx-72 flex flex-col bg-white">
        <span className="ml-4 font-kr font-bold text-2xl text-indigo-900">
          자유 게시판
        </span>
        <div className="flex justify-between my-2 mx-4 cursor-pointer">
          <FaSistrix className="w-5 h-5" />
          <div className="flex">
            <BsAward className="mb-1 w-5 h-5" />
            <span className="pl-1 font-bold">인기글</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FreeBoardHeader;
