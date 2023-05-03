import React, {useState, useEffect} from "react";
import {
  FaSistrix,
  FaRegClock,
  FaPrint,
  FaLink,
  FaThumbsUp,
  FaThumbsDown,
  FaPaperclip,
} from "react-icons/fa";
import {
  BsAward,
  BsCardList,
  BsFillShareFill,
  BsFillChatLeftQuoteFill,
  BsHandThumbsUp,
  BsHandThumbsDown,
} from "react-icons/bs";
import PageNation2 from "../pagenation/PageNation2";
import {axios} from 'axios';

const posts = [
  {
    pid: 1,
    uid: "김삿갓11313",
    title: "이거 맞나요?",
    url: "http//:www.naver.com",
    pcontent: "",
    totalcomments: 33,
    recommend: 76,
    discourage: 3,
    postdate: "1시간 전",
    comments: [
      {
        uid: "임시123",
        ccontent: "이거 맞는 거 같음",
        commentdate: "1시간 전",
      },
      { uid: "김계란", ccontent: "이거 맞는 거 같음", commentdate: "2시간 전" },
      { uid: "랄로", ccontent: "이거 맞는 거 같음", commentdate: "30분 전" },
      { uid: "임시1234", ccontent: "이거 맞는 거 같음", commentdate: "3분 전" },
      {
        uid: "갈축키보드",
        ccontent: "이거 맞는 거 같음",
        commentdate: "1시간 전",
      },
      {
        uid: "M2맥프로350",
        ccontent: "이거 맞는 거 같음",
        commentdate: "5시간 전",
      },
      {
        uid: "임시113",
        ccontent: "이거 맞는 거 같음",
        commentdate: "1시간 전",
      },
    ],
  },
  {
    pid: 2,
    uid: "김삿갓",
    title: "이거 맞아요?",
    url: "",
    totalcomments: 33,
    recommend: 76,
    discourage: 3,
    postdate: "1시간 전",
  },
  {
    pid: 3,
    uid: "김삿갓",
    title: "이거 맞아요?",
    url: "",
    totalcomments: 33,
    recommend: 76,
    discourage: 3,
    postdate: "1시간 전",
  },
];



 

function Post() {
  return (
    <div className="w-full h-full bg-lightbeige">
      <div className="mx-52 flex flex-col bg-white">
        <span className="ml-4 font-kr font-extrabold text-2xl">
          자유 게시판
        </span>
        <div className="flex justify-between my-2 mx-4 cursor-pointer">
          <FaSistrix className="w-5 h-5" />
          <div className="flex">
            <BsAward className="mb-1 w-5 h-5" />
            <span className="pl-1 font-bold">인기글</span>
          </div>
        </div>

        <div className=" py-1 border-b-2 border-indigo-900 flex">
          <h2 className="ml-4 font-semibold text-2xl">{posts[0].title}</h2>
        </div>

        {/*여기서 부터 실질적인 게시물과 관련된 파트*/}
        <div className="w-full">
          <div className="flex justify-between mt-1 h-6 w-fulls pl-5">
            <div className="flex cursor-pointer">
              {posts[0].uid}
              <FaRegClock className="mt-2 mr-1 ml-4 w-3 h-3 text-gray-300" />
              <span className="mt-1 text-gray-300 text-sm">
                {posts[0].postdate}
              </span>
            </div>
            <div className="pr-4 cursor-pointer">
              <FaPrint />
            </div>
          </div>
          <div className="flex ml-6 pt-2">
            <div className="pt-1">
              <FaLink />
            </div>
            <span className="pl-2 text-gray-400 cursor-pointer hover:text-gray-500">
              {posts[0].url}
            </span>
          </div>
          <main className="pt-10 px-10">
            여기서 부터 본문 내용이 작성 됩니다. 추후 post.content로 꾸며질
            예정.
          </main>
          <div className="flex justify-center py-10">
            <div className="flex px-2 py-2 mr-2 hover:bg-gray-200 rounded-xl">
              <FaThumbsUp className="w-5 h-5" />
              <span className="text-center pl-2 font-semibold text-green-300">
                {posts[0].recommend}
              </span>
            </div>
            <div className="flex ml-2 px-2 py-2 hover:bg-gray-200 rounded-xl ">
              <FaThumbsDown className="w-5 h-5" />
              <span className="pl-2 font-semibold text-red-400">
                {posts[0].discourage}
              </span>
            </div>
          </div>
          <div className="flex justify-end pr-2 text-gray-400 pb-5 cursor-pointer hover:text-gray-500">
            <span className="pt-1 pr-1">
              <FaPaperclip />
            </span>
            첨부 파일 n개
          </div>
          <div className="ml-6 mr-4 mt-6 mb-10 flex justify-between">
            <div className="hover:text-gray-400">
              <BsCardList className="w-5 h-5" />
            </div>
            <div className="hover:text-gray-400">
              <BsFillShareFill className="w-5 h-5" />
            </div>
          </div>

          <div className="ml-6 flex">
            <div className="pt-1 pr-1">
              <BsFillChatLeftQuoteFill className="w-5 h-5" />
            </div>
            <span className="text-lg font-semibold">
              {posts[0].totalcomments}개의 댓글
            </span>
          </div>
          {/*comment*/}
          <div className="mt-3">
            {/*여기서 부터 comment map
                 {navLinks.slice(0, 4).map((link) => (
            <NavItem link={link} key={`${link.id}-${activeNav}`} activeNav={activeNav} setActiveNav={setActiveNav} />
          ))}
            */}
            {posts[0].comments.map((comment) => (
              <div key={`${posts[0].pid} +${comment.uid}`}>
                <div className="bg-stone-200 rounded-md text-sm h-7 mx-6 pl-3 flex items-center justify-between">
                  {comment.uid}
                  <div className="text-gray-400 text-xs pr-3">
                    {comment.commentdate}
                  </div>
                </div>
                <main className="mx-10 pt-1 text-base">{comment.ccontent}</main>
                <div className="flex justify-end mr-8 mb-1">
                  <div className="pr-3 flex text-gray-400">
                    <BsHandThumbsUp className="w-4 h-4" />
                    <span className="pl-1 text-sm">4</span>
                  </div>
                  <div>
                    <BsHandThumbsDown className="w-4 h-4 text-gray-400" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full h-auto flex flex-col mt-2">
          <div className=" py-1 font-semibold flex">
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
                      {post.totalcomments}
                    </span>
                  </span>
                  <div className="flex justify-items-stretch">
                    <span className="w-28 h-6 min-w-[112px] pr-2 cursor-pointer">
                      {post.uid}
                    </span>
                    <span className="w-12 h-6 min-w-[48px] text-center text-blue-600  pr-2">
                      {post.recommend}
                    </span>
                    <span className="w-20 h-6 min-w-[80px] text-center text-gray-300 ">
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

export default Post;
