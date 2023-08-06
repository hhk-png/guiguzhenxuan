<template>
  <router-view v-slot="{ Component, route }">
    <transition name="fade">
      <div :key="route.name">
        <component :is="Component"/>
      </div>
    </transition>
  </router-view>
</template>

<script setup lang="ts">

</script>

<style scoped>
.fade-enter-from {
  opacity: 0;
}

.fade-enter-active {
  transition: all 1s;
}

.fade-enter-to {
  opacity: 1;
}
</style>