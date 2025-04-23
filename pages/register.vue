<script setup lang="ts">
import { getToastOpts } from "~/helpers";
import AuthServices from "~/services/auth";

export type FormData = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const errorMessage = ref<string>("");

const loading = ref(false);
const router = useRouter();

const formData = ref<FormData>({
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
});

const formErrors = ref<FormData>({
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
});
const toast = useToast();
const { login } = await useUserLogin();
const {
  validateUsername,
  validatePassword: commonValidatePassword,
  isFormInValid,
} = useFormLogic(formData, formErrors);

// existing_user_email -> Email da ton tai
// existing_user_login -> Username da ton tai

const validateEmail = () => {
  if (!formData.value.email) {
    formErrors.value.email = "Vui lòng nhập email!";
    return;
  }

  const isValid = String(formData.value.email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );

  if (!isValid) {
    formErrors.value.email = "Email khong hop le!";
    return;
  }

  formErrors.value.email = "";
};

const validateConfirmPassword = () => {
  if (formData.value.password !== formData.value.confirmPassword) {
    formErrors.value.confirmPassword = "Xac nhan mat khau khong khop!";
    return;
  }

  formErrors.value.confirmPassword = "";
};

const validatePassword = () => {
  commonValidatePassword();

  if (formData.value.confirmPassword) {
    validateConfirmPassword();
  }
};

const handleRegister = async () => {
  if (loading.value) return;

  loading.value = true;
  const res = await AuthServices.register(formData.value);
  if (!res.error) {
    const resLogin = await login(formData);

    toast.add(
      getToastOpts({
        description: "Register succesfully!! :))",
      })
    );

    if (resLogin.error) {
      router.push("/login");
      return;
    }
    router.push("/");
  } else {
    errorMessage.value = res.error;
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
          <h1 class="form-title text-center">Register</h1>
          <p class="text-[red] text-center" v-if="errorMessage">
            {{ errorMessage }}
          </p>
          <div class="form-login-register">
            <form v-on:submit.prevent="handleRegister">
              <SharedInput
                label="Email"
                v-bind:error="formErrors.email"
                v-model="formData.email"
                v-on:input="validateEmail"
                placeholder="Enter email ..."
              />
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
              <SharedInput
                label="Confirm Password"
                type="password"
                v-bind:error="formErrors.confirmPassword"
                v-model="formData.confirmPassword"
                v-on:input="validateConfirmPassword"
                placeholder="Confirm Password ..."
              />
              <div class="d-flex tcl-jc-between tcl-ais-center">
                <SharedButton
                  variant="primary"
                  size="large"
                  :loading="loading"
                  :disabled="isFormInValid"
                  >Dang Ky</SharedButton
                >
                <NuxtLink href="/login">Ban da co tai khoan?</NuxtLink>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <div class="spacing"></div>
  </main>
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
