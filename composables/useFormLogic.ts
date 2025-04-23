import type { FormUserData } from "~/types";

const useFormLogic = (formData: Ref<FormUserData>, formErrors: Ref<FormUserData>) => {
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
    const listKeys = Object.keys(formData.value) as (keyof FormUserData)[];
    for (let index = 0; index < listKeys.length; index++) {
      const key = listKeys[index];
      const value = formData.value[key];
      const error = formErrors.value[key];
  
      const isInvalid = error || (!value && !error);
  
      if (isInvalid) {
        return true;
      }
    }
    return false;
  });

  return { validatePassword, validateUsername, isFormInValid }
}

export default useFormLogic