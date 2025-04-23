import AuthServices from "~/services/auth";
import useUserInfo from "~/composables/useUserInfo";
import type { FormData as FormLoginData } from "~/pages/login.vue";
import type { FormData as FormRegisterData } from "~/pages/register.vue";

type FormData = FormLoginData | FormRegisterData

const useUserLogin = async () => {
  const router = useRouter();
  const userInfo = await useUserInfo()

  onMounted(() => {
    if (userInfo.value) {
      router.push("/");
    }
  });

  const login = async (formData: Ref<FormData>) => {
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