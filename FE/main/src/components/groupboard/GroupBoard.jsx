import React from "react";

const recruits = [
  {
    situation: "모집중",
    persons: "3/8",
    content: "",
    date: "1시간 전",
    writer: "user11",
    title: "해커톤 팀원 모집",
  },

  {
    situation: "모집중",
    persons: "3/8",
    content: "",
    date: "1시간 전",
    writer: "user11",
    title: "해커톤 팀원 모집",
  },

  {
    situation: "모집중",
    persons: "3/8",
    content: "",
    date: "1시간 전",
    writer: "user11",
    title: "해커톤 팀원 모집",
  },

  {
    situation: "모집중",
    persons: "3/8",
    content: "",
    date: "1시간 전",
    writer: "user11",
    title: "해커톤 팀원 모집",
  },

  {
    situation: "모집중",
    persons: "3/8",
    content: "",
    date: "1시간 전",
    writer: "user11",
    title: "해커톤 팀원 모집",
  },

  {
    situation: "모집중",
    persons: "3/8",
    content: "",
    date: "1시간 전",
    writer: "user11",
    title: "해커톤 팀원 모집",
  },

  {
    situation: "모집중",
    persons: "3/8",
    content: "",
    date: "1시간 전",
    writer: "user11",
    title: "해커톤 팀원 모집",
  },

  {
    situation: "모집중",
    persons: "3/8",
    content: "",
    date: "1시간 전",
    writer: "user11",
    title: "해커톤 팀원 모집",
  },
];

function GroupBoard() {
  return (
    <div className="w-full h-full">
      <div className="my-8 mr-10 flex justify-center">
        <header className="font-kr">스터디 모집</header>
      </div>
      
      {recruits.map((recruit) => (
        <div>
          <div className="mx-40 mt-4 flex flex-col border-b border-gray-200">
            <div className="min-h-[180px] flex flex-col">
              <div className="pb-2">
                <div className="pb-1">
                  <span className="mr-2 font-kr text-sm bg-blue-800 px-2 p-1 text-white rounded">
                    모집중
                  </span>
                  <span className="pt-1 font-semibold text-xs">개발 공부</span>
                </div>

                <div className="flex flex-col mt-2">
                  <div className="font-kr font-semibold">스터디 모집 제목</div>
                  <div className="h-11 font-medium text-sm pt-1 text-gray-400 pl-1  overflow-hidden ">
                    스터디 모집 내용/스터디 모집 내용/스터디 모집 내용/스터디
                    모집 내용/스터디 모집 내용/스터디 모집 내용/스터디 모집
                    내용/스터디 모집 내용/스터디 모집 내용/스터디 모집
                    내용/스터디 모집 내용/스터디 모집 내용/스터디 모집
                    내용/스터디 모집 내용/스터디 모집 내용/스터디 모집
                    내용/스터디 모집 내용/스터디 모집 내용/스터디 모집
                    내용/스터디 모집 내용/스터디 모집 내용/
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
          </div>
        </div>
      ))}
     <div className="relative flex justify-center items-center my-10">
        <div></div>
</div>
    </div>
  );
}

export default GroupBoard;
