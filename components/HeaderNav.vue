<script setup lang="ts">
import type { MenuItem } from "~/types";

type Props = {
  menus: MenuItem[];
};

defineProps<Props>()

</script>

<template>
  <ul>
    <li v-for="item in menus">
      <NuxtLink v-bind:href="item.slug">{{ item.label }}</NuxtLink>
      <HeaderNav v-if="item.items.length > 0" v-bind:menus="item.items" />
    </li>
  </ul>
</template>
