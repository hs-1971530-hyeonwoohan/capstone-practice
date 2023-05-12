import React from "react";
import InvestItem from "./InvestItem";
import { InvestDB } from "./utils/InvestementDB";
import BenefitModal from "../benefitmodal/BenefitModal";
import { useState } from "react";
import { HiOutlineBell } from "react-icons/hi";

function DashLeft() {
  const [open, setOpen] = useState(false);

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
                  <h3 className="text-lg font-black text-gray-800">
                    혜택
                  </h3>
                  <p className="text-sm text-gray-500">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Unde velit nisi magnam similique aperiam numquam ipsam. Magni quidem illum voluptate alias! Consequuntur iusto id debitis deserunt iste reiciendis autem odio.
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
