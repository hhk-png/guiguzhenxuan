<template>
  <el-button @click="updateRefresh" type="primary" size="small" circle icon="Refresh"></el-button>
  <el-button @click="fullScreen" type="primary" size="small" circle icon="FullScreen"></el-button>
  <el-button type="primary" size="small" circle icon="Setting"></el-button>
  <img src="../../../assets/images/logo.jpg" style="height: 24px; width: 24px;margin: 10px" alt="">
  <!-- 下拉菜单 -->
  <el-dropdown>
    <span class="el-dropdown-link">
      admin
      <el-icon class="el-icon-right">
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-item>退出登录</el-dropdown-item>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import useLayoutSettingStore from '@/store/stores/setting'
const layoutSettingStore = useLayoutSettingStore()
// 刷新
const updateRefresh = () => {
  layoutSettingStore.refresh = !layoutSettingStore.refresh
}
// 全屏
const fullScreen = () => {
  let full = document.fullscreenElement
  if (!full) {
    // 实现全屏模式
    document.documentElement.requestFullscreen()
  } else {
    // 退出全屏模式
    document.exitFullscreen()
  }
}

</script>

<script lang="ts">
export default {
  name: 'Setting'
}
</script>

<style scoped></style>