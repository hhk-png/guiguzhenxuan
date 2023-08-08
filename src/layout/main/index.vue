<template>
  <router-view v-slot="{ Component, route }">
    <transition name="fade">
      <div :key="route.name || 'transitionKey'">
        <component :is="Component"/>
      </div>
    </transition>
  </router-view>
</template>

<script setup lang="ts">

</script>

<script lang="ts">
export default {
  name: 'Main'
}
</script>

<style scoped>
.fade-enter-from {
  opacity: 0;
}

.fade-enter-active {
  transition: all 0.3s;
}

.fade-enter-to {
  opacity: 1;
}
</style>