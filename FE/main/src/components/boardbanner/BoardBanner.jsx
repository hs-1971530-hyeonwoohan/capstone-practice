import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";

function BoardBanner() {
  const [selectedBoard, setSelectedBoard] = useState("Board1");

  return (
    <div className="flex flex-col pr-10">
      <div className="grid grid-cols-3">
        <button
          className={`border-b-4 pt-1 h-11 font-kr font-semibold ${
            selectedBoard === "Board1"
              ? "border-teal-500 text-teal-400 font-bold"
              : "border-gray-300 text-gray-600 cursor-pointer font-normal"
          }`}
          onClick={() => setSelectedBoard("Board1")}
        >
          활동
        </button>
        <button
          className={`flex h-11 items-center justify-center pt-1 border-b-4 font-semibold  ${
            selectedBoard === "Board2"
              ? "border-teal-500 text-teal-400 font-bold"
              : "border-gray-300 text-gray-600 cursor-pointer font-normal"
          }`}
          onClick={() => setSelectedBoard("Board2")}
        >
          자유게시판
        </button>
        <button
          className={`flex h-11 items-center justify-center pt-1 border-b-4 font-semibold ${
            selectedBoard === "Board3"
              ? "border-teal-500 text-teal-400 font-bold"
              : "border-gray-300 text-gray-600 cursor-pointer font-normal"
          }`}
          onClick={() => setSelectedBoard("Board3")}
        >
          JOB
        </button>
      </div>
      {selectedBoard === "Board1" && (
        <div className="flex flex-col items-center justify-between w-full h-44 p-4 bg-white text-center align-middle">
          <div className="h-full w-full p-2 flex">
            <div>
              <div className=" font-semibold"> 최근 방문</div>
              <div className="relative w-28 h-28 bg-gray-100 cursor-pointer rounded-md">
                <div className="absolute p-2 text-sm text-white">
                  <div className="flex">
                    <FaUserAlt className="mt-1" />
                    3/8
                  </div>
                </div>
                <img
                  src="https://images.pexels.com/photos/4144923/pexels-photo-4144923.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt=""
                  className="object-cover"
                />
                <div className="text-sm pt-1">Study With Me</div>
              </div>
            </div>
            <div className="ml-6 w-72 h-32 mt-1 flex">
              <div>
                <div className="flex justify-start pl-2 text-sm font-kr ">
                  어제 공부 시간 :{" "}
                  <span className="font-semibold">1:03:43</span>
                </div>
                <div className="flex justify-start pl-2 mt-8 font-kr">
                  Lv. <span className="text-teal-500">3</span>
                </div>
                <div className="p-2">
                  <div className="w-full h-4 bg-gray-100 rounded">
                    <div className="h-full bg-gradient-to-r from-green-400 to-blue-500 rounded w-12 animate-fill duration-[2s]"></div>
                  </div>
                </div>
                <div>
                  <div className="text-gray-400 text-xs pl-2 pr-2">
                    다음 레벨까지 남은 경험치: 2850
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {selectedBoard === "Board2" && (
        <div className="flex flex-col items-center justify-between w-full h-44 p-4 bg-white text-center align-middle"></div>
      )}
      {selectedBoard === "Board3" && (
        <div className="flex flex-col items-center justify-between w-full h-44 p-4 bg-white text-center align-middle"></div>
      )}
      <div
        className={`flex flex-col items-center justify-between w-full h-11 min-h-11 p-2 rounded-lg text-white text-center align-middle font-bold cursor-pointer bg-black`}
      >
        <Link to="/Board">캘린더 바로가기</Link>
      </div>
    </div>
  );
}

export default BoardBanner;
