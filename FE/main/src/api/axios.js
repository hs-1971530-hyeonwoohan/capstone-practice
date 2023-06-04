import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://passionroad2.com/api",
});

// export const getPostsPage = async (pageParam = 1) => {
//   let headers = new Headers({ "Content-Type": "application/json" });
//   const accessToken = localStorage.getItem("accessToken");
//   if (accessToken && accessToken !== null) {
//     headers.append("Authorization", `Bearer  ${accessToken}`);
//   }
//   const options = { headers: headers };
//   const response = await axiosURL.get(`/freeboards?page=${pageParam}`, options);
//   console.log("getPostapi호출됨");
//   return response.data;
// };

export const getResearchPage = async (page, pageParam) => {
  try {
    const response = await axiosInstance.get(`/freeboards?${pageParam}`);
    console.log("getPostapi호출됨");
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const getStudyRoomList = async (pageParam = 1, options = {}) => {
  try {
    const response = await axiosInstance.get(`/studyroom/pages?page=${pageParam}`);
    console.log("getStudyRoomListapi호출됨(pageParam) :",pageParam, response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const getPostsPage = async (pageParam = 1) => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    axiosInstance.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${accessToken}`;
  } else {
    delete axiosInstance.defaults.headers.common["Authorization"];
  }

  try {
    const response = await axiosInstance.get(`/freeboards?page=${pageParam}`);
    console.log("getPostapi호출됨");
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const getPostPage = async (postId) => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    axiosInstance.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${accessToken}`;
  } else {
    delete axiosInstance.defaults.headers.common["Authorization"];
  }

  try {
    const response = await axiosInstance.get(`/freeboards/${postId}`);
    console.log("getPostapi호출됨");
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const deletePost = async (postId) => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    axiosInstance.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${accessToken}`;
  } else {
    delete axiosInstance.defaults.headers.common["Authorization"];
  }

  try {
    const response = await axiosInstance.delete(`/freeboards/${postId}`, {
      postId:postId,
    });
    console.log("getdeleteapi호출됨");
    alert("게시글이 삭제 되었습니다.");
    return response.data;
  } catch (error) {
    console.error("Error! failed delete page:", error);
  }
};

export const getPostComment = async (postParam) => {
  const response = await axiosInstance.get(`/freeboards/${postParam}/comment`);

  console.log(
    `/freeboards/${postParam}/comments에서`,
    "getPostCommentapi호출됨 + data :",
    response.data
  );

  return response.data;
};

export const postComment = async (user, commentText, postId) => {
  const accessToken = localStorage.getItem("accessToken");
  console.log("user, commentText, postId :", user, commentText, postId);
  if (accessToken) {
    axiosInstance.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${accessToken}`;
  } else {
    delete axiosInstance.defaults.headers.common["Authorization"];
    console.log("댓글 수정 실패 - 토큰 인증 에러");
  }

  try {
    const response = await axiosInstance.post(`/freeboards/${postId}/comment`, {
      commentText: commentText,
      commentWriter: user,
    });
    if (response.status === 200) {
      console.log("게시물이 성공적으로 업데이트되었습니다.");

      //navigate("/");
      //navigate를 post로 해줄 필요가 있음.
    } else {
      console.error(`오류 발생: ${response.statusText}`);
    }
  } catch (error) {
    console.error("Error while sending comment:", error);
    throw error;
  }
};

export const putComment = async (commentId, commentText, postId) => {
  const accessToken = localStorage.getItem("accessToken");
  //console.log("commentId, commentText :", commentId, commentText);
  if (accessToken) {
    axiosInstance.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${accessToken}`;
  } else {
    delete axiosInstance.defaults.headers.common["Authorization"];
    console.log("댓글 수정 실패 - 토큰 인증 에러");
  }

  try {
    const response = await axiosInstance.put(`/freeboards/${postId}/comment`, {
      commentId: commentId,
      commentText: commentText,
    });
    if (response.status === 200) {
      console.log("댓글이 수정되었습니다.");
      alert("댓글이 수정되었습니다.");

      //navigate("/");
      //navigate를 post로 해줄 필요가 있음.
    } else {
      console.error(`오류 발생: ${response.statusText}`);
    }
  } catch (error) {
    console.error("Error while sending comment:", error);
    throw error;
  }
};
//원래 content: commentText 다음에 사용자Id에 대한 정보도 함께 전달하게 되있을 거임.


export const deleteComment = async (commentId, postId) => {
  const accessToken = localStorage.getItem("accessToken");
  console.log("commentId, postId :", commentId, postId);
  if (accessToken) {
    axiosInstance.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${accessToken}`;
  } else {
    delete axiosInstance.defaults.headers.common["Authorization"];
    console.log("댓글 삭제 실패 - 토큰 인증 에러");
  }

  try {
    const response = await axiosInstance.delete(`/freeboards/${postId}/comment`, {
      commentId: commentId,
      postId:postId,
    });
    if (response.status === 200) {
      console.log("댓글이 삭제되었습니다.");
      alert("댓글이 삭제되었습니다.");
    } else {
      console.error(`오류 발생: ${response.statusText}`);
    }
  } catch (error) {
    console.error("Error while sending comment:", error);
    throw error;
  }
};