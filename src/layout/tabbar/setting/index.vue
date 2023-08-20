<template>
  <el-button @click="updateRefresh" type="primary" size="small" circle icon="Refresh"></el-button>
  <el-button @click="fullScreen" type="primary" size="small" circle icon="FullScreen"></el-button>
  <!-- 主题颜色 -->
  <el-popover 
    replacement="bottom" title="主题设置" :width="200" trigger="hover">
    <el-form>
      <el-form-item label="主题颜色">
        <el-color-picker @change="setThemeColor" v-model="color" :predefine="predefineColors"></el-color-picker>
      </el-form-item>
      <el-form-item label="暗黑模式">
        <el-switch @change="changeDark" v-model="dark" size="default" class="mt-2" inline-prompt active-icon="MoonNight" inactive-icon="Sunny"></el-switch>
      </el-form-item>
    </el-form>
    <template #reference>
      <el-button type="primary" size="small" circle icon="Setting"></el-button>
    </template>
  </el-popover>

  <img :src="userStore.avatar" style="height: 24px; width: 24px;margin: 10px; border-radius: 50%;" alt="">
  <!-- 下拉菜单 -->
  <el-dropdown>
    <span class="el-dropdown-link">
      {{ userStore.username }}
      <el-icon class="el-icon-right">
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import useLayoutSettingStore from '@/store/stores/setting'
// user store
import useUserStore from '@/store/stores/user'
// router
import { useRouter, useRoute } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()
const route = useRoute()

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

// 退出登录
const logout = async () => {
  // 需要向服务器发请求，退出登录
  //  清空仓库中的相关数据
  // 转到登陆界面
  try {
    await userStore.userLogout()
    // 携带query 参数
    router.push({ path: '/login', query: { redirect: route.path } })
  } catch (e) {
    console.log(e)
  }
}

// 颜色选择
const color = ref('rgba(255, 69, 0, 0.68)')
const predefineColors = ref([
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
  'rgba(255, 69, 0, 0.68)',
  'rgb(255, 120, 0)',
  'hsv(51, 100, 98)',
  'hsva(120, 40, 94, 0.5)',
  'hsl(181, 100%, 37%)',
  'hsla(209, 100%, 56%, 0.73)',
  '#c7158577',
])
// 暗黑模式的开启
const dark = ref<boolean>(false)
// 暗黑模式的切换
const changeDark = () => {
  const html = document.documentElement
  dark.value ? html.classList.add('dark') : html.classList.remove('dark')
}
// 设置主体颜色
const setThemeColor = () => {
  const html = document.documentElement
  html.style.setProperty('--el-color-primary', color.value)
}

</script>

<script lang="ts">
export default {
  name: 'Setting'
}
</script>

<style scoped></style>