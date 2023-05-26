import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";

function BoardBanner() {
  const [selectedBoard, setSelectedBoard] = useState("Board1");

  return (
    <div className="flex flex-col -ml-12 w-full">
      <div className="grid grid-cols-3">
        <button
          className={`border-b-4 pt-1  font-kr font-semibold ${
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
          최근 방문
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
        <div className="flex flex-col items-center justify-between w-full h-60 bg-white text-center align-middle">
          <div className="h-full w-full p-4 flex">
            {/* <div className="w-1/4">
              <div className=" font-semibold items-center mr-14"> 최근 방문</div>
              <div className="relative w-32 h-36 bg-gray-100 cursor-pointer rounded-md mt-2">
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
                <div className="items-center mt-4">Study With Me</div>
              </div>
            </div> */}

            <div className="mine-goal flex flex-col w-full">
              <div className="mine-goal-contents px-2 ">
                <div className="mine-goal-record  ">
                  <div className="mine-goal-record-header flex justify-between">
                    <h4 className="mine-goal-record-tx title font-bold">
                      오늘 공부한 시간(스탑워치) /
                      <span className="text-slate-400">내 목표 시간</span>
                    </h4>
                    <button className="form-setting border-1 border-gray-200 bg-gray-200 px-2 rounded-lg text-sm">
                      설정
                    </button>
                  </div>
                  <div class="mine-goal-record-body">
                    <div class="mine-goal-record-tx-wrap flex justify-between mt-2 ">
                      <p class="mine-goal-record-tx time font-semibold ">
                        0시간 0분
                        <span class="mine-goal-record-tx total text-gray-300 font-normal">
                          / 0시간 0분
                        </span>
                      </p>
                      <p class="mine-goal-record-tx none text-slate-400">
                        {/* 내 목표시간을 설정해보세요. */}
                      </p>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-700 mt-2">
                      <div
                        className="bg-teal-600 h-2.5 rounded-full dark:bg-teal-500 mt-2"
                        style={{ width: "45%" }}
                      >
                      </div>
                    </div>
                    <hr />
                    <div className="flex items-start">
                      {/* <div className="w-1/2 mt-2">
                        <div className="flex justify-between">
                          <h4 className="font-semibold">내 각오</h4>
                          <button className="border-1 border-gray-200 bg-gray-200 px-2 rounded-lg text-sm">
                            설정
                          </button>
                        </div>
                        <div className="mt-2 items-center">
                          각오는 30자 이내로 가능합니다.
                        </div>
                      </div> */}
                      {/* <div className="self-stretch border-l border-gray-300 mx-2 mt-2"></div> */}
                      <div className="w-full mt-2">
                        <div className="flex justify-between">
                          <h4 className="font-semibold">내 디데이</h4>
                          <button className="border-1 border-gray-200 bg-gray-200 px-2 rounded-lg text-sm">
                            설정
                          </button>
                        </div>
                        <div className="mt-2">디데이를 추가해보세요.</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* <div className="ml-6 w-72 h-32 mt-1 flex">
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
            </div> */}
          </div>
        </div>
      )}
      {selectedBoard === "Board2" && (
        <div className="h-60">
        <div className="">
          
        <div className="grid grid-cols-3 gap-4 items-center justify-between w-full h-full bg-white text-center align-middle">
          
          <div className="">
        
              {/* <div className=" font-semibold items-center mr-14"> 최근 방문</div> */}
              <div className="relative bg-gray-100 cursor-pointer rounded-md mt-4">
                <div className="absolute p-2 text-sm text-white">
                  <div className="flex">
                    <FaUserAlt className="mt-1" />
                    3/8
                  </div>
                </div>
                <img
                  src="https://images.pexels.com/photos/4144923/pexels-photo-4144923.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt=""
                  className="object-cover h-40"
                />
                <div className="items-center py-2">Study With Me</div>
              </div>
              
            </div>
            <div>
            {/* <div className=" font-semibold items-center mr-14"> 최근 방문</div> */}
            <div className="relative bg-gray-100 cursor-pointer rounded-md mt-4">
                <div className="absolute p-2 text-sm text-white">
                  <div className="flex">
                    <FaUserAlt className="mt-1" />
                    3/8
                  </div>
                </div>
                <img
                  src="https://images.pexels.com/photos/4144923/pexels-photo-4144923.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt=""
                  className="object-cover h-40"
                />
                <div className="items-center py-2">Study With Me</div>
              </div>
            </div>
            <div>
            {/* <div className=" font-semibold items-center mr-14"> 최근 방문</div> */}
            <div className="relative bg-gray-100 cursor-pointer rounded-md mt-4">
                <div className="absolute p-2 text-sm text-white">
                  <div className="flex">
                    <FaUserAlt className="mt-1" />
                    3/8
                  </div>
                </div>
                <img
                  src="https://images.pexels.com/photos/4144923/pexels-photo-4144923.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt=""
                  className="object-cover h-40"
                />
                <div className="items-center py-2">Study With Me</div>
              </div>
            </div>
            </div>
            </div>
            </div>
         
      )}
      {selectedBoard === "Board3" && (
        <div className="flex flex-col items-center justify-between w-full h-44 p-4 bg-white text-center align-middle"></div>
      )}
      <div
        className={`flex flex-col items-center justify-between w-full h-11 min-h-11 p-2 -mt-3 rounded-lg text-white text-center align-middle font-bold cursor-pointer bg-black`}
      >
        <Link to="/Board">캘린더 바로가기</Link>
      </div>
    </div>
    
  );
}

export default BoardBanner;
