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

export const uploadImage = (data) => API.post("/upload/", data);
export const uploadPost = (data) => API.post(`/${data.createdBy}/add`, data);
export const editPost = (data) =>
  API.put(`/${data.createdBy}/update/${data.id}`, data);
