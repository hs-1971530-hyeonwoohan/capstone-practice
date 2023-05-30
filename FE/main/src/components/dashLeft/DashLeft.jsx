import React from "react";
import InvestItem from "./InvestItem";
import { InvestDB } from "./utils/InvestementDB";
import BenefitModal from "../benefitmodal/BenefitModal";
import { useState } from "react";
import { HiOutlineBell } from "react-icons/hi";
import { AiOutlineInfoCircle } from "react-icons/ai";
import Chart from "./../dashRight/Chart";
import RecordModal from "./RecordModal";
import Tooltip from "./Tooltip";
function DashLeft() {
  const [open, setOpen] = useState(false);
  const [Rcopen, setRcOpen] = useState(false);

  return (
    <div className="col-span-2  border-r border-feay-200 items-start justify-start flex flex-col  w-full h-full">
      {/*top section*/}
      <h1 className="text-xl font-bold xl:text-3xl px-12 py-6">
        Unknown
        <span className="text-2xl font-normal text-gray-500">
          님의 공부기록
        </span>
      </h1>
      <div className="w-full flex items-start justify-start flex-col px-12 pt-6 pb-6">
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
            <div className="flex justify-between">
              <div className="text-gray-400">
                다음 레벨까지 남은 경험치: 2850
              </div>
              <button
                className="px-2 py-1 rounded text-white bg-blue-500 hover:bg-blue-400 cursor-pointer "
                onClick={() => setOpen(true)}
              >
                혜택
              </button>
            </div>

            <BenefitModal open={open} onClose={() => setOpen(false)}>
              <div className="text-center h-76 w-64">
                <HiOutlineBell size={56} className="mx-auto text-blue-400" />

                <div className="mx-auto my-4 w-48">
                  <h3 className="text-lg font-black text-gray-800">혜택</h3>
                  <p className="text-sm text-gray-500">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Unde velit nisi magnam similique aperiam numquam ipsam.
                    Magni quidem illum voluptate alias! Consequuntur iusto id
                    debitis deserunt iste reiciendis autem odio.
                  </p>
                </div>
                <div className="flex gap-4 ">
                  <button
                    className="btn btn-light w-full"
                    onClick={() => setOpen(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </BenefitModal>
          </div>
        </div>
      </div>
      <div className="w-full border-b border-gray-200 pt-1"></div>
      <div className="flex flex-row gap-4 w-fit items-center justify-center px-3 mt-8">
        <div className="space-y-6 border-2 border-gray-300 items-center justify-center flex flex-col ">
          {/* <span className="py-4 px-4 rounded-full shadow-lg shadow-gray-300 items-center justify-center flex">
            <CashIcon className="w-8 h-8 stroke-1 " />
          </span> */}
          <div className="flex">
            <span className="flex justify-center font-kr font-medium text-gray-500 text-base pt-4">
              오늘 공부 시간
              {/* <button className=" ml-2" onClick={() => setRcOpen(true)}> */}
              <button
                data-tooltip-target="tooltip-bottom"
                data-tooltip-placement="bottom"
                type="button"
                className="ml-2 md:mb-0 "
              ></button>
              <Tooltip />
            </span>
          </div>

          <span className="items-center justify-center">
            <div className="font-light font-kr text-5xl text-gray-700 mb-4">
              00:00:00
            </div>
          </span>
        </div>

        <div className="space-y-6 w-full border-2 border-gray-300 items-center justify-center flex flex-col font-kr ">
          <span className="font-medium text-gray-500 text-base pt-4">
            일 평균 공부 시간(30일)
          </span>
          <span className="items-center justify-center">
            <div className="font-light text-5xl text-gray-700 mb-4">
              00:00:00
            </div>
          </span>
        </div>
        <div className="space-y-6 w-full border-2 border-gray-300 items-center justify-center flex flex-col font-kr">
          <span className="font-medium text-gray-500 text-base pt-4">
            전체 공부 시간
          </span>

          <span className="items-center justify-center">
            <div className="font-light text-5xl text-gray-700 mb-4">
              00:00:00
            </div>
          </span>
        </div>
      </div>

      {/* chart */}
      <div className="w-full items-start justify-start flex flex-col px-12 py-2 ">
        <Chart />
      </div>
    </div>
  );
}

export default DashLeft;
