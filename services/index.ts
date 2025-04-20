import axios from "axios";
import Cookies from "js-cookie";

export const api = {
  call() {
    return axios.create({
      baseURL: "http://localhost/wp-api/wp-json",
    });
  },
  callWithToken() {
    return axios.create({
      baseURL: "http://localhost/wp-api/wp-json",
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });
  },
};

export const delay = (seconds: number) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(null);
    }, seconds * 1000);
  });
