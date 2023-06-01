import React, { useState } from "react";
import { AiOutlineCaretDown, AiOutlineCaretUp } from "react-icons/ai";

export default function VerticalDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState("하루 전");

  const userNavigation = [
    { name: "하루 전" },
    { name: "최근 1주일" },
    { name: "최근 1개월" },
  ];

  const handleItemClick = (name) => {
    setSelectedItem(name);
    setIsOpen(false);
  };

  return (
    <div className="relative flex-col">
      <div className="flex">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className=" flex justify-items-start items-center  font-bold text-2xl text-teal-500 tracking-wider mb-2"
      >
        {selectedItem}
        {!isOpen ? (
          <AiOutlineCaretDown className="h-8" />
        ) : (
          <AiOutlineCaretUp className="h-8" />
        )}
        </button>
        <p className="justify-items-start items-center  font-bold text-2xl text-black tracking-wider mb-2 ml-4">누적 공부 시간 랭킹</p>
        </div>

      {isOpen && (
        <div className=" bg-white absolute z-20  flex flex-col items-start rounded-lg p-2 w-full">
          {userNavigation.map((item) => (
            <div
              key={item.name}
              onClick={() => handleItemClick(item.name)}
              className="flex w-full justifiy-between hover:bg-gray-300 cursor-pointer rounded-r-lg"
            >
              <h3 className="font-bold">{item.name}</h3>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
