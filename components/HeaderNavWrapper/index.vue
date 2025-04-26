<script setup lang="ts">
import MenuService from "~/services/menu";

const { data } = await useAsyncData(() => {
  return MenuService.getList();
});
</script>

<template>
  <HeaderNav v-if="data" class="header-nav__lists" v-bind:menus="data" />
</template>
