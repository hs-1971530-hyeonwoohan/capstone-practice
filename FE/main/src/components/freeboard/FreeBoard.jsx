import React from "react";
import { FaSistrix, FaHeart } from "react-icons/fa";
import PageNation from "../pagenation/PageNation";
import PageNation2 from "../pagenation/PageNation2";
import { BsAward } from "react-icons/bs";

const posts = [
  {
    pid: 1,
    uid: "김삿갓11313",
    title: "이거 맞나요?",
    url: "",
    comments: 33,
    recommend: 76,
    postdate: "1시간 전",
  },
  {
    pid: 2,
    uid: "김삿갓",
    title: "이거 맞아요?",
    url: "",
    comments: 33,
    recommend: 76,
    postdate: "1시간 전",
  },
  {
    pid: 3,
    uid: "김삿갓",
    title: "이거 맞아요?",
    url: "",
    comments: 33,
    recommend: 76,
    postdate: "1시간 전",
  },
];

function FreeBoard() {
  return (
    <div className="w-full h-full">
      <div className="mx-52 flex flex-col">
        <span className="ml-4 font-kr font-extrabold text-2xl">
          자유 게시판
        </span>
        <div className="flex justify-between my-2 mx-4 cursor-pointer">
          <FaSistrix className="w-5 h-5"/>
          <div className="flex">
            <BsAward className="mb-1 w-5 h-5" />
            <span className="pl-1 font-bold">인기글</span>
          </div>
        </div>

        <div className="w-full h-auto flex flex-col mt-2">
          <div className=" py-1 border-b-2 border-gray-300 font-semibold flex">
            <span className="basis-3/4 pl-2 text-center">제목</span>
            <span className="pr-14">글쓴이</span>
            <span className="pr-7">추천수</span>
            <span className="pr-7">날짜</span>
          </div>

          <div className=" flex flex-col divide-y divide-gray-200 ">
            {posts.map((post) => (
              <div key={post.pid} className="w-full">
                {/*<a
                  href={post.url}
                  className="block p-1 rounded-lg hover:bg-gray-100 bg-black"
            />*/}
                <div className="flex">
                  <span className="basis-3/4 px-2 cursor-pointer">
                    <span className="pl-3 font-medium text-base text-black mr-1 hover:underline decoration-1 hover:text-blue-500">
                      {post.title}
                    </span>
                    <span className="text-base text-blue-600">
                      {post.comments}
                    </span>
                  </span>
                  <div className="flex justify-items-stretch">
                    <span className="w-28 h-6 min-w-[112px] pr-2 cursor-pointer">
                      {post.uid}
                    </span>
                    <span className="w-12 h-6 min-w-[48px] text-center text-blue-600  pr-2">
                      {post.recommend}
                    </span>
                    <span className="w-20 h-6 min-w-[80px] text-center text-gray-300">
                      {post.postdate}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <PageNation2 />
    </div>
  );
}

export default FreeBoard;
