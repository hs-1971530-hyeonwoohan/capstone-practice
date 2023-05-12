import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/api",
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

export const getPostsPage = async (pageParam = 1) => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
  } else {
    delete axiosInstance.defaults.headers.common['Authorization'];
  }

  try {
    const response = await axiosInstance.get(`/freeboards?page=${pageParam}`);
    console.log("getPostapi호출됨");
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

/*export const getPostComment = async (postParam) => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
  } else {
    delete axiosInstance.defaults.headers.common['Authorization'];
  }
  try {
    const response = await axiosInstance.get(`/freeboards/${postParam}/comments`);
    console.log("getPostComment호출됨");
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}*/


export const getPostComment = async (postParam) => {
 
  const response = await axiosInstance.get(
    `/freeboards/${postParam}/comments`
  
  );

  console.log(
    `/freeboards/${postParam}/comments에서`,
    "getPostCommentapi호출됨"
  );
  console.log("getPostCommentapi호출됨", response.data);

  return response.data;
};

export const sendComment = async (postId, commentText) => {
  try {
    const response = await axiosInstance.post(`/freeboards/${postId}/comments`, {
      content: commentText,
    });
    return response.data;
  } catch (error) {
    console.error("Error while sending comment:", error);
    throw error;
  }
};
//원래 content: commentText 다음에 사용자Id에 대한 정보도 함께 전달하게 되있을 거임.
