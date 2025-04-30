<script lang="ts" setup>
  import AppFooter from './AppFooter.vue';
  import AppHeader from './AppHeader.vue';
</script>

<template>
    <div class="flex flex-col h-full">
        <AppHeader/>
      <main class="flex-1">
            <div class="flex h-full">
                <a>a</a>
                <slot/>
            </div>
            <div>
                <a>b</a>
            </div>
            <div>
                <a>c</a>
            </div>
        </main>
        <AppFooter/>
    </div>
</template>


<style scoped>

</style>