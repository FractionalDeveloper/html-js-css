<script setup lang="ts">

</script>

<template>
    <div class="flex flex-col w-full justify-center">
            <h1 class="text-2xl text-center mt-3 font-bold w-full">{{new Date().toDateString()}}</h1>
    <div>
        <h2 class="text-2xl text-center mt-3 font-bold">{{new Date().toLocaleTimeString()}}</h2>
        <div class="flex flex-row justify-center">
            <!-- <div class="flex flex-col w-1/2">
                <h3 class="text-2xl text-center mt-3 font-bold w-full">Latitude: {{latitude}}</h3>
                <h3 class="text-2xl text-center mt-3 font-bold w-full">Longitude: {{longitude}}</h3>
            </div> -->
        </div>
    </div>
    </div>

</template>

<style scoped>

</style>