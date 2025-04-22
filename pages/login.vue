<script setup lang="ts">
import AuthServices from "~/services/auth";
import useUserInfo from "~/composables/useUserInfo";
import { ToastRoot, ToastTitle, ToastDescription, ToastClose } from "reka-ui";

type FormData = {
  username: string;
  password: string;
};

const toastOpen = ref(false);
const formData = ref<FormData>({
  username: "khoa.bui",
  password: "Portal@123",
});
const loading = ref(false);
const formErrors = ref<FormData>({
  username: "",
  password: "",
});

const router = useRouter();
const userInfo = await useUserInfo();

const validatePassword = () => {
  const newPassword = formData.value.password;

  if (!newPassword) {
    formErrors.value.password = "Vui lòng nhập mật khẩu!";
    return;
  }

  if (newPassword.length < 5) {
    formErrors.value.password = "Mật khẩu phải có ít nhất 5 ký tự!";
    return;
  }

  const hasUpperCase = /[A-Z]/.test(newPassword);
  const hasLowerCase = /[a-z]/.test(newPassword);
  const hasNumbers = /[0-9]/.test(newPassword);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(newPassword);

  const errors = [];

  if (!hasUpperCase) errors.push("chữ hoa");
  if (!hasLowerCase) errors.push("chữ thường");
  if (!hasNumbers) errors.push("số");
  if (!hasSpecialChar) errors.push("ký tự đặc biệt");

  if (errors.length > 0) {
    formErrors.value.password = `Mật khẩu phải chứa ít nhất một ${errors.join(
      ", "
    )}!`;
    return;
  }
  formErrors.value.password = "";
};

const validateUsername = () => {
  if (!formData.value.username) {
    formErrors.value.username = "Vui lòng nhập username!";
    return;
  }

  formErrors.value.username = "";
};

const isFormInValid = computed(() => {
  const listKeys = Object.keys(formData.value) as (keyof FormData)[];
  for (let index = 0; index < listKeys.length; index++) {
    const key = listKeys[index];
    const value = formData.value[key];
    const error = formErrors.value[key];

    const isInvalid = error || (!value && !error);

    if (isInvalid) {
      console.log("Ton tai mot field co key", key, " la sai");
      return true;
    }
  }
  return false;
});

const handleLogin = async () => {
  if (isFormInValid.value || loading.value) return;

  loading.value = true;
  const response = await AuthServices.login(formData.value);

  if (response.token) {
    userInfo.value = await AuthServices.getUserInfo();

    if (userInfo.value) {
      // setTimeout(() => {
      //   alert("Dang nhap thanh cong!");
      // }, 100);
      toastOpen.value = true;
      setTimeout(() => {
        router.push("/");
      }, 1500);
    }
  } else {
    setTimeout(() => {
      alert(response.error);
    }, 100);
  }

  loading.value = false;
};
</script>

<template>
  <main class="login">
    <div class="spacing"></div>
    <div class="tcl-container">
      <div class="tcl-row">
        <div class="tcl-col-12 tcl-col-sm-6 block-center">
          <h1 class="form-title text-center">Login</h1>
          <h1 v-if="userInfo">Login thanh cong{{ userInfo.id }}</h1>
          <div class="form-login-register">
            <form v-on:submit.prevent="handleLogin">
              <SharedInput
                label="Username"
                v-bind:error="formErrors.username"
                v-model="formData.username"
                v-on:input="validateUsername"
                placeholder="Enter Username ..."
              />
              <SharedInput
                label="Password"
                type="password"
                v-bind:error="formErrors.password"
                v-model="formData.password"
                v-on:input="validatePassword"
                placeholder="Enter Password ..."
              />
              <div class="d-flex tcl-jc-between tcl-ais-center">
                <SharedButton
                  variant="primary"
                  size="large"
                  :loading="loading"
                  :disabled="isFormInValid"
                  >Dang Nhap</SharedButton
                >
                <NuxtLink href="/register">Dang Ky</NuxtLink>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <div class="spacing"></div>
  </main>

  <ToastRoot v-if="toastOpen" v-model:open="toastOpen" :duration="5000">
      <ToastTitle>Đăng nhập thành công</ToastTitle>
      <ToastDescription>Chào mừng trở lại!</ToastDescription>
      <ToastClose />
  </ToastRoot>
  
</template>

<style>
.form-login-register {
  width: 100%;
  padding: 2rem;
  border-radius: 1rem;
  background-color: #fff;
  box-shadow: rgba(1, 1, 1, 0.05) 1px 1px 5px 0px;
}

.form-control {
  position: relative;
  margin-bottom: 1.25rem;
}
.form-control input {
  box-sizing: border-box;
  margin: 0;
  min-width: 0;
  display: block;
  width: 100%;
  padding: 0.5rem 1rem;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  font-size: inherit;
  line-height: inherit;
  border: 1px solid;
  border-radius: 4px;
  color: inherit;
  background-color: transparent;
  border: none;
  background-color: #edf2f7;
  outline: none;
}
.form-control .toggle-password {
  right: 0;
  bottom: 0;
  z-index: 2;
  padding: 0.5rem 1rem;
  cursor: pointer;
  position: absolute;
}
.form-control .toggle-password:hover {
  color: #5a67d8;
}
.form-control .toggle-password + input {
  padding-right: 3rem;
}

.form-title {
  box-sizing: border-box;
  min-width: 0px;
  font-family: Muli, sans-serif;
  line-height: 1.33;
  display: block;
  color: #2d3748;
  font-weight: 900;
  font-size: 1.875rem;
  margin: 0px 0px 1.5rem;
  text-decoration: none;
}
@media screen and (min-width: 640px) {
  .form-title {
    font-size: 2.25rem;
  }
}
</style>
