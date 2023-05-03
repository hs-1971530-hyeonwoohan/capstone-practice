import React from "react";

function GroupBoard() {
  return (
    <div className="w-full h-full">
      <div className="my-8 mr-10 flex justify-center">
        <header className="font-kr">스터디 모집</header>
      </div>
      <div className="mx-40 flex flex-col divide-y divide-gray-200">
        <div className="min-h-[160px] flex flex-col">
          <div className="pb-2">
            <div className="pb-1">
              <span className="pr-2 font-kr text-sm">모집중</span>
              <span className="pt-1 font-semibold text-xs">개발 공부</span>
            </div>

            <div className="flex flex-col">
              <div className="font-kr font-semibold">스터디 모집 제목</div>
              <div className="h-11 font-medium text-sm pt-1 text-gray-400 pl-1  overflow-hidden ">
                스터디 모집 내용/스터디 모집 내용/스터디 모집 내용/스터디 모집
                내용/스터디 모집 내용/스터디 모집 내용/스터디 모집 내용/스터디
                모집 내용/스터디 모집 내용/스터디 모집 내용/스터디 모집
                내용/스터디 모집 내용/스터디 모집 내용/스터디 모집 내용/스터디
                모집 내용/스터디 모집 내용/스터디 모집 내용/스터디 모집
                내용/스터디 모집 내용/스터디 모집 내용/스터디 모집 내용/
              </div>
            </div>
          </div>

          <div className="flex justify-between pt-2">
            <div className="text-xs pt-1 pl-1">1/8</div>
            <div className="space-x-2 ">
              <span className="text-xs text-gray-400">1시간 전</span>
              <span className="text-sm font-semibold">작성자</span>
            </div>
          </div>
        </div>

        <div className="min-h-[140px]">2</div>
        <div className="min-h-[140px]">3</div>
        <div className="min-h-[140px]">4</div>
        <div className="min-h-[140px]">5</div>
        <div className="min-h-[140px]">6</div>
      </div>
    </div>
  );
}

export default GroupBoard;
