<script setup lang="ts">

</script>

<template>
  <div>
    <div class="wrapper-content">
      <Header />
      <NuxtPage />
      <Footer />
    </div>
    <UNotifications :ui="{ position: 'top-0 bottom-[unset]', wrapper: 'z-[100]' }" />
  </div>
</template>
