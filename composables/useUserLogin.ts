import AuthServices from "~/services/auth";
import useUserInfo from "~/composables/useUserInfo";
import type { FormUserData } from '~/types'

const useUserLogin = async () => {
  const router = useRouter();
  const userInfo = await useUserInfo()

  onMounted(() => {
    if (userInfo.value) {
      router.push("/");
    }
  });

  const login = async (formData: Ref<FormUserData>) => {
    const response = await AuthServices.login(formData.value);

    if (response.token) {
      userInfo.value = await AuthServices.getUserInfo();
      return { error: '' }
    }

    return { error: response.error }
  }

  return { login }
}

export default useUserLogin