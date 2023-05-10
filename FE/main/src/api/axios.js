import axios from "axios";

export const axiosURL = axios.create({
    baseURL: 'http://localhost:8080/api'
})

export const getPostsPage = async (pageParam = 1) => {
    const response = await axiosURL.get(`/freeboards?page=${pageParam}`)
    console.log("getPostapi호출됨");
    return response.data
};

export const getPostComment = async (postParam) => {
    const response = await axiosURL.get(`/freeboards/${postParam}/comments`)
    
    console.log(`/freeboards/${postParam}/comments에서`, "getPostCommentapi호출됨");
    console.log("getPostCommentapi호출됨", response.data);
    
    return response.data
};

export const sendComment = async (postId, commentText) => {
    try {
      const response = await axiosURL.post(`/freeboards/${postId}/comments`, {
        content: commentText,
      });
      return response.data;
    } catch (error) {
      console.error("Error while sending comment:", error);
      throw error;
    }
  };
  //원래 content: commentText 다음에 사용자Id에 대한 정보도 함께 전달하게 되있을 거임.