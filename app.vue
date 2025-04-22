<script setup lang="ts">
import { ToastProvider, ToastViewport } from 'reka-ui'
</script>

<template>
    <ToastProvider>
    <div class="wrapper-content">
      <Header />
      <NuxtPage />
      <Footer />
    </div>
    <ToastViewport class="fixed bottom-0 right-0 p-4 z-50" />
  </ToastProvider>
</template>

