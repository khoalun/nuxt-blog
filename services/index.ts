import axios from "axios";
import Cookies from "js-cookie";
import { COOKIE_TOKEN_NAME } from "./auth";

export const api = {
  call() {
    return axios.create({
      baseURL: "http://localhost/wp-api/wp-json",
    });
  },
  callWithToken(tokenSsr?: string) {
    const tokenCsr = Cookies.get(COOKIE_TOKEN_NAME)
    return axios.create({
      baseURL: "http://localhost/wp-api/wp-json",
      headers: {
        Authorization: `Bearer ${tokenSsr || tokenCsr}`,
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
