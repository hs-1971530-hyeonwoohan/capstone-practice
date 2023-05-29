import React from "react";

function CommunityHeader() {
  return (
    <div className="min-h-full border-b border-feay-200">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex items-center overflow-x-auto whitespace-nowrap w-full max-w-[75rem] h-[4.875rem]">
          <a href="" className="flex-shrink-0 text-gray-700 mx-2 text-3xl font-medium">
            Community
          </a>
          <div className="ml-24 flex gap-8">
            <a href="" className="font-kr text-xl font-medium text-orange-500">
                자유게시판
            </a>
            <a href="" className="font-kr text-xl font-medium">스터디 모집</a>
            <a href="/jobboard" className="font-kr text-xl font-medium">채용 공고</a>
            
          </div>
        </div>
      </div>
      </div>
  );
}

export default CommunityHeader;
