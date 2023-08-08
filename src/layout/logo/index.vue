<template>
  <div class="logo" v-show="setting.logoHidden">
    <img class="logo_img" :src="setting.logo" alt="图标">
    <p>{{ setting.title }}</p>
  </div>
</template>

<script setup lang="ts">
// 设置标题与logo配置文件
import setting from '@/settings.ts'
</script>

<script lang="ts">
export default {
  name: 'Logo'
}
</script>

<style lang="scss" scoped>
.logo {
  width: 100%;
  height: 50px;
  color: white;
  display: flex;
  align-items: center;
  padding-left: 2px;

  .logo_img {
    margin-right: 20px;
    width: $base-menu-logo-height;
    height: $base-menu-logo-height;
  }

  p {
    font-size: $base-logo-title-fontsize;
  }
}
</style>