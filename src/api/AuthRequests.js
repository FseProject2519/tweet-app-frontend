import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8085/api/v1.0/authorization/tweets",
});

export const logIn = (formData) => API.post("/userlogin", formData);

export const signUp = (formData) => API.post("/register", formData);
