<template>
  <div class="core-card">
    <div class="banner"></div>
    <core-card-level></core-card-level>
  </div>
</template>

<script setup>
import coreCardLevel from "./coreCardLevel.vue"
</script>
<style lang="scss" scoped>
  .core-card {
    background: linear-gradient(245.4deg, #D8DFE6 1.4%, rgba(209, 213, 216, 0) 82.89%);
    .banner {
      height: 460px;
    }
  }
</style>