import axios from "axios";

export const axiosURL = axios.create({
    baseURL: 'http://localhost:8080/api'
})

export const getPostsPage = async (pageParam = 1) => {
    const response = await axiosURL.get(`/freeboards?page=${pageParam}`)
    console.log("getPostapi호출됨");
    return response.data
};