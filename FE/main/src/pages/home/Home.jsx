import React, { useState } from "react";

import Carousel2 from "../../components/carousel/Carousel2";
import Ranking from "../../components/ranking/Ranking";
import Studyroom from "../../components/studyroom/Studyroom";
import VerticalTextSlider from "../../components/verticalslider/VerticalSlider";
import BoardBanner from "../../components/boardbanner/BoardBanner";

function Home() {
  const [selectedBoard, setSelectedBoard] = useState("Board1");
  
  return (
    <div className="w-full min-h-full max-h-full">
      <div className="py-16 pl-10">
        <span className=" font-kr font-bold text-3xl">
          시작해보세요, 당신과 함께 열정을 나눌 사람들이 있습니다.
        </span>
      </div>
      <div className="w-full pb-4 h-fit bg-white grid grid-cols-3 text-black px-8">
        <div className="col-span-2 pl-10 ">
          <div className="h-full font-kr font-normal text-2xl flex flex-col bg-white">
            <span>현재 <span className="text-teal-500">000</span>명의 사람이 함께하고 있습니다.</span>
            <span>스터디룸을 찾아보세요.</span>
          </div>
        </div>
        <BoardBanner/>
      </div>
      <div className="w-full">
        {/*ranking*/}
        <VerticalTextSlider/>
      </div>

      <div className="w-full">
        <Carousel2/>
      </div>
      
      <div className="">
        <Studyroom />
        {/*content*/}
      </div>
      <div className="mt-10">
      </div>
    </div>
  );
}

export default Home;
