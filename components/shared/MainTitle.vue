<script setup></script>

<template>
  <div class="main-title spacing">
    <h2><slot></slot></h2>
    <slot name="action"></slot>
  </div>
</template>

<style scoped>
.main-title h2 {
  font-family: Muli, sans-serif;
  line-height: 1.33;
  color: #2d3748;
  font-weight: bold;
  font-size: 1.5rem;
  position: relative;
  text-align: center;
}
@media screen and (min-width: 640px) {
  .main-title h2 {
    text-align: left;
    padding-left: 2rem;
  }
  .main-title h2::before {
    background-color: #e2e8f0;
    content: "";
    position: absolute;
    height: 100%;
    width: 5px;
    top: 0px;
    left: 0px;
    border-radius: 100%;
  }
}

.main-title.tcl-jc-between h2 {
  text-align: left;
}

.main-title.main-title__search h2 {
  text-align: center;
}
.main-title.main-title__search h2::before {
  content: none;
}
</style>
