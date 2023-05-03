import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { getPostComment } from "../../api/axios";
import DateConversion from "../dateconversion/DateConversion";
import isAuthenticatedAtom from "../../atoms/IsAuthenticatedAtom";
import { useRecoilValue } from "recoil";
import { FaImage, FaRegSmileBeam, FaRegPlayCircle } from "react-icons/fa";

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
  const location = useLocation();
  const { postId, authorId, writer, content, title, date } =
    location.state || {};
  const [comments, setComments] = useState([]);

  async function fetchComments() {
    const fetchedComments = await getPostComment(postId);
    setComments(fetchedComments);
  }

  useEffect(() => {
    fetchComments();
  }, []);

  const dateConvert = (regD, modD) => {
    console.log("date함수 실행 redD, modD :", regD, modD);
    const regDate = regD;
    const modDate = modD ? modD : null;

    const displayDate = modDate ? modDate : regDate;
    const displayText = DateConversion(displayDate);

    return displayText;
  };

  return (
    <div className="w-full h-full bg-lightbeige pt-4 pb-4">
      <div className="mx-72 flex flex-col bg-white">
        <span className="ml-4 font-kr font-bold text-2xl text-indigo-900">
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
          <h2 className="ml-4 font-semibold text-xl">{title}</h2>
        </div>

        {/*여기서 부터 실질적인 게시물과 관련된 파트*/}
        <div className="w-full">
          <div className="flex justify-between mt-1 h-6 w-fulls pl-5">
            <div className="flex cursor-pointer">
              {console.log("location에 들어온 값", location)}
              {console.log("location.state에 들어온 값", location.state)}
              {console.log("writer로 구조 분해 할당 한 writer값", writer)}
              {console.log("title로 구조 분해 할당 한 title값", title)}
              {console.log("postId로 구조 분해 할당 한 postId값", postId)}
              {console.log("postId로 불러온 comment데이터", comments)}

              {writer}
              <FaRegClock className="mt-2 mr-1 ml-4 w-3 h-3 text-gray-300" />
              <span className="mt-1 text-gray-300 text-sm">{date}</span>
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
              localhost3000:/post/{postId}
            </span>
          </div>

          {/*main파트에서 최소한의 height값을 부여해야 게시글이 보여질 때 덜 어색할 것 같음.*/}
          <main className="h-screen pt-10 px-10">
            {console.log(content)}
            {content}
          </main>
          <div className="flex justify-center py-10">
            <div className="flex px-2 py-2 mr-2 hover:bg-gray-200 rounded-xl cursor-pointer">
              <FaThumbsUp className="w-5 h-5" />
              <span className="text-center pl-2 font-semibold text-green-300">
                {/*posts[0].recommend*/}
              </span>
            </div>
            <div className="flex ml-2 px-2 py-2 hover:bg-gray-200 rounded-xl cursor-pointer">
              <FaThumbsDown className="w-5 h-5" />
              <span className="pl-2 font-semibold text-red-400">
                {/*posts[0].discourage*/}
              </span>
            </div>
          </div>

          <div className="flex justify-end pr-2 text-gray-400 pb-5 hover:text-gray-500">
            <span className="flex pt-1 pr-1 cursor-pointer">
              <FaPaperclip className="mt-1 mr-1" />
              첨부 파일 n개
            </span>
          </div>
          <div className="ml-6 mr-4 mt-6 mb-10 flex justify-between">
            <div className="hover:text-gray-400">
              <BsCardList className="w-5 h-5" />
            </div>
            <div className="hover:text-gray-400">
              <BsFillShareFill className="w-5 h-5" />
            </div>
          </div>

          <div className="flex justify-end mb-4 pr-2 ">
            <Link
              to="/textedit"
              state={{
                postId: `${postId}`, // or a valid postId, if needed
                editMode: true,
              }}
            >
              <div>
                <div className="rounded font-kr bg-black text-white px-2 py-1 hover:bg-gray-400 cursor-pointer">
                  수정
                </div>
              </div>
            </Link>
          </div>

          <div className="ml-6 flex">
            <div className="pt-1 pr-1">
              <BsFillChatLeftQuoteFill className="w-5 h-5" />
            </div>
            <span className="text-lg font-semibold">
              {comments.length}개의 댓글
            </span>
          </div>
          {/*comment*/}
          <div className="mt-3">
            {/*여기서 부터 comment map*/}

            {comments.map((comment) => (
              <div key={`${comment.commentId}`}>
                <div className="bg-stone-200 rounded-md text-sm h-7 mx-6 pl-3 flex items-center justify-between">
                  {comment.commentWriter}
                  <div className="text-gray-400 text-xs pr-3">
                    {dateConvert(comment.regDate, comment.modDate)}
                  </div>
                </div>
                <main className="mx-10 pt-1 text-base">
                  {comment.commentText}
                </main>
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
            <div className="px-6 pt-2">
              <div className="border border-gray-700">
                <textarea
                  placeholder="댓글을 입력해 주세요."
                  rows="1"
                  className="w-full pb-16 pl-2 pt-2 outline-none border-b border-gray-300 resize-none scrollbar-hide"
                ></textarea>
                <div className="h-10 flex justify-between items-center">
                  <div className="flex font-kr">
                    <div className="pr-2 pl-2 cursor-pointer flex">
                      <FaRegSmileBeam className="mt-1 mr-1" />
                      이모티콘
                    </div>
                    <div className="pr-2 cursor-pointer flex">
                      <FaImage className="mt-1 mr-1" />
                      이미지
                    </div>
                    <div className="pr-2 cursor-pointer flex">
                      <FaRegPlayCircle className="mt-1 mr-1" />
                      동영상
                    </div>
                  </div>

                  <div className="flex align-middle">
                    <div className="pr-3 pt-2">0/1000</div>
                    <div className="w-24 p-2 bg-sky-900 text-center text-white font-kr cursor-pointer">
                      등록
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
