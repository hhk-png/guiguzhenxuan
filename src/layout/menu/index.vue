<template>
  <template v-for="(item, index) in menuList" :key="item.path">
    <!-- 没有子路由 -->
    <template v-if="!item.children">
      <el-menu-item @click="goRoute" v-if="!item.meta!.hidden" :index="item.path">
        <el-icon>
          <component :is="item.meta!.icon"></component>
        </el-icon>
        <template #title>
          <span>{{ item.meta!.title }}</span>
        </template>
      </el-menu-item>
    </template>

    <!-- 有子路由 长度为1 -->
    <template v-if="item.children && item.children.length === 1">
      <el-menu-item @click="goRoute" v-if="!item.children[0].meta!.hidden" :index="item.children[0].path">
        <el-icon>
          <component :is="item.children[0].meta!.icon"></component>
        </el-icon>
        <template #title>
          <span>{{ item.children[0].meta!.title }}</span>
        </template>
      </el-menu-item>
    </template>
    <!-- 子路由长度大于1 -->
    <el-sub-menu v-if="item.children && item.children.length > 1" :index="item.path">
      <template #title>
        <el-icon>
          <component :is="item.meta!.icon"></component>
        </el-icon>
        <span>{{ item.meta!.title }}</span>
      </template>
      <Menu :menuList="item.children"></Menu>
    </el-sub-menu>
  </template>
</template>

<script setup lang="ts">
import type { RouteRecordRaw } from 'vue-router'
import { useRouter } from 'vue-router'
defineProps<{
  menuList: RouteRecordRaw[]
}>()

const router = useRouter()


const goRoute = (vc: any) => {
  console.log(vc)
  router.push(vc.index)
}

</script>
<script lang="ts">
export default {
  name: 'Menu'
}
</script>

<style scoped></style>