<script setup lang="ts">
import userUserLogin from "~/composables/useUserLogin";
import { getToastOpts } from "~/helpers";

export type FormData = {
  username: string;
  password: string;
};

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

const { login } = await userUserLogin();
const toast = useToast();

const { validateUsername, validatePassword, isFormInValid } = useFormLogic(
  formData,
  formErrors
);

const handleLogin = async () => {
  if (isFormInValid.value || loading.value) return;

  loading.value = true;
  const response = await login(formData);

  if (!response.error) {
    toast.add(getToastOpts({ description: "Login succesfully!! :))" }));
    setTimeout(() => {
      router.push("/");
    }, 1500);
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
                  >Dang Nhap
                </SharedButton>
                <NuxtLink href="/register">Dang Ky</NuxtLink>
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
