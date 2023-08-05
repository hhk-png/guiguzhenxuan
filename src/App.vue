<template>
  <div>
    测试
  </div>
</template>

<script setup lang="ts">
import axios from '@/utils/request'
import { onMounted } from 'vue';
// url: mock axios instance
onMounted(async () => {
  console.log(await axios({
    url: '/user/login',
    method: 'post',
    data: {
      username: 'admin',
      password: '123456'
    }
  }))
})


</script>

<style scoped>

</style>