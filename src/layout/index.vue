<template>
  <div class="layout_container">
    <!-- 左侧菜单 -->
    <div class="layout_slider" :class="{ fold: layoutSettingStore.fold ? true : false }">

      <!-- 展示菜单 -->
      <!-- 滚动组件 -->
      <el-scrollbar class="scrollbar">
        <Logo></Logo>
        <el-menu :collapse="layoutSettingStore.fold" active-text-color="#fff" :default-active="router.path"
          background-color="#001529" text-color="#959ea6">
          <Menu :menuList="userUserStore.menuRoutes"></Menu>
        </el-menu>
      </el-scrollbar>
    </div>
    <!-- 顶部导航 -->
    <div class="layout_tabbar" :class="{ fold: layoutSettingStore.fold ? true : false }">
      <Tabbar></Tabbar>
    </div>
    <!-- 内容展示 -->
    <div class="layout_main" :class="{ fold: layoutSettingStore.fold ? true : false }">
      <Main></Main>
    </div>
  </div>
</template>

<script setup lang="ts">
// 路由
import { useRoute } from 'vue-router'
import Logo from './logo/index.vue'
import Menu from './menu/index.vue'
import useUserStore from '@/store/stores/user'
import Main from './main/index.vue'
// tabbar
import Tabbar from './tabbar/index.vue'
// 菜单折叠
import useLayoutSettingStore from '@/store/stores/setting.ts'

let userUserStore = useUserStore()
const router = useRoute()
const layoutSettingStore = useLayoutSettingStore()


</script>

<script lang="ts">
export default {
  name: 'Layout'
}
</script>

<style lang="scss" scoped>
.layout_container {
  width: 100%;
  height: 100vh;

  .layout_slider {
    width: $base-menu-width;
    height: 100vh;
    background-color: $base-menu-background;
    transition: all 0.3s;

    .scrollbar {
      width: 100%;
      height: calc(100vh - $base-menu-logo-height);

      .el-menu {
        border-right: none;
      }
    }

    &.fold {
      width: $base-menu-min-width;
    }
  }

  .layout_tabbar {
    position: fixed;
    width: calc(100% - $base-menu-width);
    height: $base-tabbar-height;
    top: 0px;
    left: $base-menu-width;
    transition: all 0.3s;

    &.fold {
      width: calc(100vw - $base-menu-min-width);
      left: $base-menu-min-width;
    }
  }

  .layout_main {

    position: absolute;
    width: calc(100% - $base-menu-width);
    height: calc(100vh - $base-tabbar-height);
    background: white;
    left: $base-menu-width;
    top: $base-tabbar-height;
    padding: 20px;
    overflow: auto;
    transition: all 0.3s;

    &.fold {
      width: calc(100vw - $base-menu-min-width);
      left: $base-menu-min-width;
    }
  }
}</style>