<template>
  <el-icon @click="changeIcon" style="margin-right:10px">
    <component :is="layoutSettingStore.fold ? 'Fold' : 'Expand'"></component>
  </el-icon>
  <!-- 左侧面包屑 -->
  <el-breadcrumb separator-icon="ArrowRight">
    <!-- 面包屑动态展示路由名字与标题 -->
    <el-breadcrumb-item :to="item.path" v-for="(item, index) in router.matched" :key="index" v-show="item.meta.title">
      <el-icon style="margin: 0 5px;">
        <component :is="item.meta.icon"></component>
      </el-icon>
      <span>{{ item.meta.title }}</span>
    </el-breadcrumb-item>

  </el-breadcrumb>
</template>

<script setup lang="ts">
import useLayoutSettingStore from '@/store/stores/setting'
import {useRoute} from 'vue-router'

let layoutSettingStore = useLayoutSettingStore()
const router = useRoute()
// 用于控制菜单的折叠
const changeIcon = () => {
  layoutSettingStore.fold = !layoutSettingStore.fold
}


</script>

<script lang="ts">
export default {
  name: 'Breadcrumb'
}
</script>

<style scoped></style>