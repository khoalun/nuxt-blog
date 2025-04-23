import { api, delay } from ".";
import Cookies from "js-cookie";

type LoginParams = {
  username: string;
  password: string;
};

type RegisterParams = {
  username: string;
  password: string;
  email: string;
};
export const COOKIE_TOKEN_NAME = "tk";

const parseJwt = (token: string = "") => {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );
  console.log("Token nhan duoc 15", token);

  return JSON.parse(jsonPayload);
};

const AuthServices = {
  async login({ username, password }: LoginParams) {
    try {
      const response = await api.call().post("/jwt-auth/v1/token", {
        username,
        password,
      });

      if (response.data.token) {
        Cookies.set(COOKIE_TOKEN_NAME, response.data.token, { expires: 7 });
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
  async getUserInfo(tokenSsr?: string) {
    try {
      const tokenCsr = Cookies.get(COOKIE_TOKEN_NAME);
      const token = tokenSsr || tokenCsr;
      const payload = parseJwt(token);

      if (!payload?.data.user?.id) {
        return null;
      }

      const response = await api.callWithToken(token).get("/wp/v2/users/me");       
      // await delay(1)
      if (response.data.id) {
        return response.data; // Transform format data
      }

      throw new Error();
    } catch (err: any) {
      Cookies.remove(COOKIE_TOKEN_NAME); // Chi chay client side
      return null;
    }
  },
  async register({
    username,
    password,
    email,
  }: RegisterParams): Promise<{ error: string }> {
    try {
      const response = await api.call().post("/wp/v2/users/register", {
        username,
        password,
        email,
      });

      if (response.data?.author) {
        return {
          error: "",
        };
      }

      throw new Error(response.data.code)
    } catch (err: any) {
      const errorCode = err.response?.data?.code || err.message
      const mapErrorMessage: Record<string, string> = {
        existing_user_email: 'Email da ton tai!',
        existing_user_login: 'Username da ton tai!',
      }
      const message = mapErrorMessage[errorCode] || 'Co loi xay ra trong qua trinh dang ky. Vui long thu lai!'
      return { error: message };
    }
  },
};

export default AuthServices;

// token=
// token=fhsdjkfhskfhkfd -> co gia tri
// user.name -> read property name of user
// obj.key -> read proterty key of obj
// undefined.replace -> read property replace of undefined | Cannot read properties of undefined (reading 'replace')
