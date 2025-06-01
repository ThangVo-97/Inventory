import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // Your Node.js backend URL
});

// Add JWT token to every request
API.interceptors.request.use((config) => {
  let token = localStorage.getItem("token");
  if(!token) token = process.env.TOKEN
  if (token) {
    config.headers["token"] = token;
  }
  return config;
});

export default API;