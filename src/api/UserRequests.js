import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8090/api/v1.0/tweets/users",
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("loginData")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("loginData")).token
    }`;
  }

  return req;
});

export const getUser = (userId) => API.get(`/search/${userId}`);
export const updateUser = (id, formData) => API.put(`/user/${id}`, formData);
export const getAllUser = () => API.get("/all?isPaged=false");
export const followUser = (id, data) => API.put(`/user/${id}/follow`, data);
export const unfollowUser = (id, data) => API.put(`/user/${id}/unfollow`, data);
export const deleteUser = (userId) => API.delete(`/delete/${userId}`);
