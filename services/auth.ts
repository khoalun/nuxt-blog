import { api } from ".";
import Cookies from "js-cookie";

type LoginParams = {
  username: string;
  password: string;
};

const parseJwt = (token: string = '') => {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
}

const AuthServices = {
  async login({ username, password }: LoginParams) {
    try {
      const response = await api.call().post("/jwt-auth/v1/token", {
        username,
        password,
      });

      if (response.data.token) {
        Cookies.set("token", response.data.token, { expires: 7 });
        return {
          token: response.data.token,
          error: "",
        };
      }

      throw new Error();
    } catch (err) {
      return {
        token: "",
        error: "Username hoac Password khong hop le!",
      };
    }
  },
  async getUserInfo() {
    try {
      const payload = parseJwt(Cookies.get("token"));
      if (!payload?.data.user?.id) return null

      const response = await api.callWithToken().get("/wp/v2/users/me");

      if (response.data.id) {
        return response.data // Transform format data
      }

      throw new Error()
    } catch (err) {
      return null;
    }
  },
};

export default AuthServices;

// token=
// token=fhsdjkfhskfhkfd -> co gia tri