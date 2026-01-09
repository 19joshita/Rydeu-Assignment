import axios from "axios";

export const api = axios.create({
  baseURL: "https://api-staging.rydeu.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});
