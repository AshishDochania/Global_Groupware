import axios from "axios";

const API = axios.create({
  baseURL: "https://reqres.in/api",
});

export default API;
