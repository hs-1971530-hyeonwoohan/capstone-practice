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