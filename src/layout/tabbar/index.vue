<template>
  <div class="tabbar">
    <!-- 顶部左侧静态 -->
    <div class="tabbar_left">
      <Breadcrumb></Breadcrumb>
    </div>
    <!-- 右侧 -->
    <div class="tabbar_right">
      <Setting></Setting>
    </div>
  </div>
</template>

<script setup lang="ts">
import Breadcrumb from './breadcrumb/index.vue'
import Setting from './setting/index.vue'

</script>

<script lang="ts">
export default {
  name: 'Tabbar'
}
</script>

<style lang="scss" scoped>
.tabbar {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .tabbar_left {
    display: flex;
    margin-left: 20px;
  }

  .tabbar_right {
    display: flex;
    align-items: center;
  }
}
</style>