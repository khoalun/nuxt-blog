<script setup lang="ts">
type Props = {
  as?: "button" | "a";
  variant?: "default" | "category" | "primary";
  size?: "large";
  loading?: boolean;
  loadingPos?: "left" | "right";
};
const props = defineProps<Props>();
const position = computed(() => props.loadingPos || "left");
const classes = computed(() => {
  const variant = props.variant || "default";
  const size = props.size || "default";
  return {
    btn: true,
    "btn-default": variant === "default",
    "btn-category": variant === "category",
    "btn-primary": variant === "primary",
    "btn-size-large": size === "large",
  };
});
</script>

<template>
  <NuxtLink v-if="props.as === 'a'" v-bind:class="classes">
    <SharedIconLoading class="inline-block" v-if="loading && position === 'left'" />
    <slot></slot>
    <SharedIconLoading class="inline-block" v-if="loading && position === 'right'" />
  </NuxtLink>
  <button v-else v-bind:class="classes">
    <SharedIconLoading class="inline-block" v-if="loading && position === 'left'" />
    <slot></slot>
    <SharedIconLoading class="inline-block" v-if="loading && position === 'right'" />
  </button>
</template>

<style scoped>
.btn {
  font-size: 0.75rem;
  font-weight: 700;
  white-space: nowrap;
  border-radius: 2px;
  display: inline-block;
  border-radius: 0.5rem;
  font-weight: 600;
  padding: 0.25rem 1rem;
  -webkit-transition: all 250ms ease;
  transition: all 250ms ease;
  border: 0;
}
.btn:disabled {
  pointer-events: none;
}
.btn-default {
  color: #718096;
  background-color: #e2e8f0;
}
.btn-default:hover {
  color: #fff;
  background-color: #717171;
}
.btn-primary {
  color: #fff;
  background-color: #5a67d8;
}
.btn-primary:hover {
  color: #fff;
  background-color: #717171;
}
.btn-category {
  background-color: #e9d8fd;
  color: rgba(0, 0, 0, 0.4);
}
.btn-category:hover {
  color: #e2e8f0;
  background-color: #718096;
}
.btn-size-large {
  font-size: 1rem;
  padding: 0.5rem 2rem;
  font-weight: 400;
  border-radius: 9999px;
}
.btn svg {
  height: 1em;
}
</style>
