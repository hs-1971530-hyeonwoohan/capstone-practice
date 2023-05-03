import axios from "axios";
import React, { useState } from "react";
import { BsHandThumbsUp, BsHandThumbsDown } from "react-icons/bs";

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

//컴포넌트 사용예시) <Comment postId={postID}> 지금은 렌더링 에러 때문에 props를 빼놓은 것 뿐임.

function Comment() {
    const {commentValue,setcommentValue} = useState("")

    //const postId = props.mathch.params.postId 얘를 완전히 구현하려면, post에 데이터가 내려진 상태에서만 가능함. 얘는 URL에서의 유동적인 부분을 캐치해서 그 값을 변수에 집어넣는 방식이기 때문임. 근데 뭔가 구조상 문제가 좀 생겨서 그냥 pros.postId로 postId를 전달하기로 했음.

    const handleClick = (event) => {
        setcommentValue(event.currentTarget.value)
    }

    const onSubmit = (event) => {
        event.preventDefault(); //입력 값이 발생할 때 마다 리렌더링 됨을 막아 주기 위함.

        const variables = {
            content:"" , //댓글의 내용 
            writer:"" , // 댓글 작성자의 활동명
            userId:"" , //  댓글 작성자의 db상의 id
            postId:"" , //어떤 게시글에 매칭시켜야 할지 필요하니까.
            //댓글 작성은 로그인한 본인만 작성 할 수 있는 기능이니까.
        }

        axios.post('/api/Freeboards/${postId}', variables)
        .then(response => {
            if(response.data.success){
                console.log(response.data.result)
            } else {
                alert('댓글이 저장되지 못하였습니다.')
            }
        })
    }
  return (
    <div className="mb-3">
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

        {/* Comment Form */}
        <div className=" rounded-md text-sm mx-6 pl-3 flex items-center justify-between">
          <form onSubmit={onSubmit} className="flex w-full">
            <textarea
              name=""
              id=""
              cols="150"
              rows="2"
              value={commentValue}
              placeholder="코멘트를 작성해 주세요."
              onClick={handleClick}
            className="resize-none"></textarea>
            <button className="font-kr ml-1 rounded hover:bg-black hover:text-white py-1 px-2" onClick>
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Comment;
