<template>
  <router-view v-slot="{ Component, route }">
    <transition name="fade">
      <div :key="route.name || 'transitionKey'">
        <component :is="Component" v-if="flag"/>
      </div>
    </transition>
  </router-view>
</template>

<script setup lang="ts">
import useLayoutSettingStore from '@/store/stores/setting'
import { watch, ref, nextTick } from 'vue';
const layoutSettingStore = useLayoutSettingStore()

// 控制当前组件是否销毁重建
let flag = ref(true)

watch(() => layoutSettingStore.refresh, () => {
  flag.value = false
  nextTick(() => {
    flag.value = true
  })
  console.log('change')
})

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