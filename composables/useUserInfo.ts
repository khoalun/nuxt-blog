import AuthServices, { COOKIE_TOKEN_NAME } from "~/services/auth";

export type UserInfo = {
  id: number;
  email: string;
  nickname: string;
  avatar: string;
  // ....
};

const useUserInfo = async () => {
  const token = useCookie(COOKIE_TOKEN_NAME);
  const userInfo = useState<UserInfo | null>("userInfo", () => null);

  await callOnce(async () => {
    if (token.value && !userInfo.value) {
      userInfo.value = await AuthServices.getUserInfo(token.value);
    }
  });

  // onMounted(() => {
  //   if (token.value && !userInfo.value) {
  //     AuthServices.getUserInfo().then(result => {
  //       userInfo.value = result
  //     })
  //   }
  // })

  return userInfo;
};

export default useUserInfo;
