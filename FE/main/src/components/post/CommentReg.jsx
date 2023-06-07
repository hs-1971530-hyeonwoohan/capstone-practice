import React from "react";
import { useState } from "react";
import { FaImage, FaRegSmileBeam, FaRegPlayCircle } from "react-icons/fa";
import { postComment } from "../../api/axios";
import { useNavigate } from "react-router-dom";
import { getPostComment } from "../../api/axios";

function CommentReg({ postId, fetchComments }) {
  const [commentText, setCommentText] = useState("");
  const [commentTextLength, setCommentTextLength] = useState(0);
  const pid = postId.toString();
  const navigate = useNavigate();

  const handleCommentTextChange = (e) => {
    const newText = e.target.value;
    setCommentText(newText);
    setCommentTextLength(newText.length);
    
  };

  const user = localStorage.getItem("mid");

  const handleCommentSubmit = async () => {
    if (commentText.trim() === "") {
      alert("댓글을 입력해 주세요.");
      return;
    }
  
    try {
      await postComment(user, commentText, pid);
      
      
      alert("댓글이 등록되었습니다.");
      // 댓글 등록 후 입력창 초기화 및 댓글 목록 업데이트를 수행해야 함..
      fetchComments(pid);
      setCommentText("");
      
      
    } catch (error) {
      
      console.error("Error while submitting comment:", error);
      alert("댓글 등록에 실패했습니다. 다시 시도해 주세요.");
    }
  };

  return (
    <div className="h-full border border-gray-700">
      <div>
        <textarea
          placeholder="댓글을 입력해 주세요."
          rows="1"
          value={commentText}
          onChange={handleCommentTextChange}
          className="w-full pb-12 pl-2 pt-2 outline-none border-gray-300 resize-none scrollbar-hide"
        ></textarea>
      </div>

      <div className="h-10 flex justify-between items-center border-t border-gray-400">
        <div className="flex font-kr">
          <div className="pr-2  pb-1 pl-2 cursor-pointer flex">
            <FaRegSmileBeam className="mt-1 mr-1" />
            이모티콘
          </div>
          <div className="pr-2 pb-1 cursor-pointer flex">
            <FaImage className="mt-1 mr-1" />
            이미지
          </div>
          <div className="pr-2 pb-1 cursor-pointer flex">
            <FaRegPlayCircle className="mt-1 mr-1" />
            동영상
          </div>
        </div>

        <div className="relative flex items-center">
          <div className="pr-3">{commentTextLength}/1000</div>
          <div
            className="w-24 p-2 bg-sky-900 text-center text-white font-kr cursor-pointer"
            onClick={handleCommentSubmit}
          >
            등록
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommentReg;
