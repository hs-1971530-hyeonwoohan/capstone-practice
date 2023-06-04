import React from "react";
import { useState } from "react";
import { AiOutlineCaretDown, AiOutlineCaretUp } from "react-icons/ai";

export default function VerticalDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const userNavigation = [
    { name: "하루 전" },
    { name: "최근 1주일" },
    { name: "최근 1개월" },
  ];

  return (
    <div className="relative flex-col">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className=" flex justify-items-start items-center  font-bold text-2xl text-teal-500 tracking-wider mb-2"
      >
        하루 전
        {!isOpen ? (
          <AiOutlineCaretDown className="h-8" />
        ) : (
          <AiOutlineCaretUp className="h-8" />
        )}
        <p className="font-bold text-black ml-4">누적 공부 시간 랭킹</p>
      </button>

      {isOpen && (
        <div className=" bg-white absolute z-20  flex flex-col items-start rounded-lg p-2 w-full">
          {userNavigation.map((item) => (
            <div className="flex w-full justifiy-between hover:bg-gray-300 cursor-pointer rounded-r-lg">
              <h3 className="font-bold">{item.name}</h3>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}