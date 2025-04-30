<script setup lang="ts">
import WetterDatenView from "~/components/WetterDatenView.vue";
import DateTimeView from "~/components/DateTimeView.vue";
</script>

<template>
  <div class="flex flex-row w-full h-full space-x-5">
    <div class="flex w-4/6 h-full flex-col space-y-4">
      <div class="flex w-full h-1/3 rounded-3xl shadow bg-custom-image-today">
        <DateTimeView/>
      </div>
      <div class="flex w-full h-2/3 rounded-3xl shadow bg-custom-image">
        <WetterDatenView/>
      </div>
    </div>
    <div class="flex bg-pink-600 w-2/6 h-full rounded-3xl shadow"></div>
  </div>
</template>

<style scoped>
.bg-custom-image {
  background-image: url('/R.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
.bg-custom-image-today {
  background-image: url('/today.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
</style>
