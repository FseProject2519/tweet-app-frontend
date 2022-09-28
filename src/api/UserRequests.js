import axios from "axios";

const API = axios.create({
  baseURL: "http://tweet-app-lb-2024223405.ap-northeast-1.elb.amazonaws.com/api/v1.0/tweets/users",
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("loginData")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("loginData")).token
    }`;
  }

  return req;
});

export const getUser = (userId) => API.get(`/search/${userId}?isCloud=true`);
export const getAllUser = () => API.get("/all?isCloud=true");
export const followUser = (id, data) => API.put(`/user/${id}/follow`, data);
export const unfollowUser = (id, data) => API.put(`/user/${id}/unfollow`, data);
export const deleteUser = (userId) => API.delete(`/delete/${userId}`);
