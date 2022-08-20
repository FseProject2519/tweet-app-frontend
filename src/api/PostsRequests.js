import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:8090/api/v1.0/tweets" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("loginData")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("loginData")).token
    }`;
  }

  return req;
});

const EXPORT_API = axios.create({
  baseURL: "http://localhost:8090/api/v1.0/tweets",
  responseType: "blob",
});

EXPORT_API.interceptors.request.use((req) => {
  if (localStorage.getItem("loginData")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("loginData")).token
    }`;
  }

  return req;
});

export const getTimelinePosts = () => API.get(`/all?isPaged=false`);
export const getUserPosts = (userId) =>
  API.get(`/${userId}?isPaged=false&withComments=true`);
export const likePost = (id, userId) => API.patch(`/${userId}/like/${id}`);
export const getTrends = () => API.get(`/trend`);
export const deletePost = (id, userId) => API.delete(`/${userId}/delete/${id}`);
export const exportPost = (userId) => EXPORT_API.get(`/${userId}/export`);
export const getTrendingPosts = (hashtags) =>
  API.get(`/search?$isPaged=false&tag=${hashtags}&withComments=true`);
export const getHashtags = () => API.get(`/all/hashtags`);
