<script setup lang="ts">

import AppHeader from "~/layouts/AppHeader.vue";
import AppFooter from "~/layouts/AppFooter.vue";
</script>

<template>
  <div class="flex flex-col h-full">
    <AppHeader/>
    <main class="flex-1 my-2">
      <div class="flex h-full">
        <slot />
      </div>
    </main>
    <AppFooter/>
  </div>
</template>

<style scoped>

</style>
