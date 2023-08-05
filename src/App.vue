<template>
  <div>测试</div>
</template>

<script setup lang="ts">
import { reqLogin } from './api/user/index'
import { onMounted } from 'vue'
// url: mock axios instance
onMounted(async () => {
  console.log(reqLogin)
  console.log(await reqLogin({
    username: 'admin',
    password: '123456',
  }))
})
</script>

<style scoped></style>
