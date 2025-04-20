<script setup lang="ts">
import { defineProps, ref, defineModel } from "vue";

const props = withDefaults(
  defineProps<{
    label: string;
    error: string;
    type?: string;
    placeholder?: string;
  }>(),
  { type: "text" }
);

const modelValue = defineModel("modelValue");

const isHidePassword = ref(true);

const htmlType = computed(() => {
  if (props.type === "password") {
    return isHidePassword.value ? "password" : "text";
  }
  return props.type;
});
</script>

<template>
  <div class="form-control">
    <div class="relative">
      <label for="">{{ label }}</label>
      <i
        v-if="props.type === 'password'"
        class="toggle-password"
        v-on:click="isHidePassword = !isHidePassword"
        v-bind:class="isHidePassword ? 'ion-eye' : 'ion-eye-disabled'"
      ></i>
      <input
        v-bind:type="htmlType"
        v-model="modelValue"
        required
        v-bind:class="{
          'outline-[red]': error,
          'outline-gray-300': !error,
        }"
        :placeholder="props.placeholder"
      />
    </div>
    <p v-if="error" class="text-[red] text-sm/6">{{ error }}</p>
  </div>
</template>
