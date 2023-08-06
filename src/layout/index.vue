<template>
  <div class="layout_container">
    <div class="layout_slider">
      <Logo></Logo>
      <!-- 展示菜单 -->
      <el-menu>
      <Menu :menuList="userStore.menuRoutes"></Menu>
      </el-menu>
    </div>
    <div class="layout_tabbar">layout_tabbar</div>
    <div class="layout_main">
      <Main></Main>
    </div>
  </div>
</template>

<script setup lang="ts">
import Logo from './logo/index.vue'
import Menu from './menu/index.vue'
import useUserStore from '@/store/stores/user'
import Main from './main/index.vue'

let userStore = useUserStore()


</script>

<style lang="scss" scoped>
.layout_container {
  width: 100%;
  height: 100vh;
  background: red;

  .layout_slider {
    width: $base-menu-width;
    height: 100vh;
    background-color: $base-menu-background;

    .scrollbar {
      width: 100%;
      height: calc(100vh - $base-menu-logo-height);
      .el-menu {
        border-right: none;
      }
    }
  }

  .layout_tabbar {
    position: fixed;
    background-color: aqua;
    width: calc(100% - $base-menu-width);
    height: $base-tabbar-height;
    top: 0px;
    left: $base-menu-width;
  }

  .layout_main {
    position: absolute;
    width: calc(100% - $base-menu-width);
    height: calc(100vh - $base-tabbar-height);
    left: $base-menu-width;
    top: $base-tabbar-height;
    padding: 20px;
    overflow: auto;
  }
}
</style>