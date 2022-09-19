import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8085/api/v1.0/authorization/tweets",
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("loginData")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("loginData")).token
    }`;
  }

  return req;
});

export const logIn = (formData) => API.post("/userlogin", formData);

export const signUp = (formData) => API.post("/register", formData);

export const logOut = () => API.get("/logout");

export const forgotPassword = (userId) => API.get(`/${userId}/forgot`);

export const verifyOtp = (userId, otp) => API.post(`/${userId}/verifyOtp`, otp);

export const resetPassword = (userId, passwordResetData) =>
  API.post(`/${userId}/resetpassword`, passwordResetData);

export const updateUser = (userId, formData) =>
  API.put(`/${userId}/update`, formData);
