import React, { useState } from "react";
import { Link } from "react-router-dom";
import Carousel2 from "../../components/carousel/Carousel2";
import Ranking from "../../components/ranking/Ranking";
import Studyroom from "../../components/studyroom/Studyroom";
import VerticalTextSlider from "../../components/verticalslider/VerticalSlider";

function Home() {
  const [selectedBoard, setSelectedBoard] = useState("Board1");

  return (
    <div className="w-full min-h-full max-h-full">
      <div className="py-16 pl-10">
        <span className="font-kr font-bold text-3xl">
          ABC지금 여기 한글이라 font weight이 특정 값 이상으로 안올라감.
        </span>
      </div>
      <div className="w-full pb-4 h-fit bg-white grid grid-cols-3 text-black">
        <div className="col-span-2 pl-10 ">
          <div className="h-full font-kr font-normal text-2xl flex flex-col bg-white">
            <span>개발자 맞춤 한글 폰트 구글에서 찾아줘야 할 거임.</span>
            <span>큐레이션을 찾아보세요. 여기도 마찬가지</span>
          </div>
        </div>
        <div className="flex flex-col pr-10">
          <div className="grid grid-cols-3">
            <button
              className={`border-b-4 pt-1 h-11 ${
                selectedBoard === "Board1"
                  ? "border-teal-500 text-teal-400 font-bold"
                  : "border-gray-300 text-gray-600 cursor-pointer font-normal"
              }`}
              onClick={() => setSelectedBoard("Board1")}
            >
              Board1
            </button>
            <button
              className={`flex h-11 items-center justify-center pt-1 border-b-4 ${
                selectedBoard === "Board2"
                  ? "border-teal-500 text-teal-400 font-bold"
                  : "border-gray-300 text-gray-600 cursor-pointer font-normal"
              }`}
              onClick={() => setSelectedBoard("Board2")}
            >
              Board2
            </button>
            <button
              className={`flex h-11 items-center justify-center pt-1 border-b-4 ${
                selectedBoard === "Board3"
                  ? "border-teal-500 text-teal-400 font-bold"
                  : "border-gray-300 text-gray-600 cursor-pointer font-normal"
              }`}
              onClick={() => setSelectedBoard("Board3")}
            >
              Board3
            </button>
          </div>
          {selectedBoard === "Board1" && (
            <div className="flex flex-col items-center justify-between w-full h-44 p-4 bg-white text-center align-middle">
              Board1의 내용
            </div>
          )}
          {selectedBoard === "Board2" && (
            <div className="flex flex-col items-center justify-between w-full h-44 p-4 bg-white text-center align-middle">
              Board2의 내용
            </div>
          )}
          {selectedBoard === "Board3" && (
            <div className="flex flex-col items-center justify-between w-full h-44 p-4 bg-white text-center align-middle">
              Board3의 내용
            </div>
          )}
          <div
            className={`flex flex-col items-center justify-between w-full h-11 min-h-11 p-2 rounded-lg text-white text-center align-middle font-bold cursor-pointer bg-black`}
          >
            <Link to="/Board">Board 바로가기</Link>
          </div>
        </div>
      </div>
      <div className="w-full">
        <Carousel2 />
      </div>
      <div className="m-4">
        {/*ranking*/}
        <Ranking />
        <VerticalTextSlider />
      </div>
      <div>
        <Studyroom />
        {/*content*/}
      </div>
      <div className="mt-10"></div>
    </div>
  );
}

export default Home;
