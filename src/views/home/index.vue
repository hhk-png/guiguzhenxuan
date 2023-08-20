<template>
  <el-card>
    <div class="box">
      <img :src="userStrore.avatar" alt="" class="avatar">
      <div class="bottom">
        <h3 class="title">{{ `${getTimeNotification()},${userStrore.username}` }}</h3>
        <p class="subtitle">硅谷甄选运营平台</p>
      </div>
    </div>
  </el-card>
  <div class="home_bottom">
    <svg-icon name="welcome" width="500px" height="500px"></svg-icon>
  </div>
</template>

<script setup lang="ts">
import useUserStore from '@/store/stores/user'
import { getTimeNotification } from '@/utils/timeNotification'

const userStrore = useUserStore()


</script>

<style lang="scss" scoped>
.box {
  display: flex;

  .avatar {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin-right: 20px;
  }

  .bottom {
    margin-left: 20px;
    .title {
      font-size: 30px;
      font-weight: 900;
      margin-bottom: 20px;
    }
    .subtitle {
      font-weight: italic;
      color: gray;
    }
  }
}
.home_bottom {
  display: flex;
  justify-content: center;
}

</style>
