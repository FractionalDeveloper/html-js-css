<script setup lang="ts">

import WetterDatenView from "~/components/WetterDatenView.vue";
import DateTimeView from "~/components/DateTimeView.vue";

</script>

<template>
  <div class="flex flex-row w-full h-full space-x-5">
    <div class="flex w-4/6 h-full flex-col space-y-4">
      <div class="flex bg-orange-400 w-full h-1/3 rounded-3xl">
        <DateTimeView/>
      </div>
      <div class="flex bg-blue-400 w-full h-2/3  rounded-3xl">
        <WetterDatenView/>
      </div>
    </div>
    <div class="flex bg-pink-600 w-2/6 h-full rounded-3xl"></div>
  </div>
</template>

<style scoped>

</style>
