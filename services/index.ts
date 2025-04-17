import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost/wp-api/wp-json",
});
