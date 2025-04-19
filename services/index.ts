import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost/wp-api/wp-json",
});


export const delay = (seconds: number) => new Promise((resolve) => {
  setTimeout(() => {
      resolve(null)
  }, seconds * 1000);
})