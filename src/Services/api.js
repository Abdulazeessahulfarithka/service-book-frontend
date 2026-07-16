import axios from "axios";

const API = axios.create({
  baseURL: "https://service-book-backend-1.onrender.com/",
});

export default API;