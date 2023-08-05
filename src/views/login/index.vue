<script setup lang="ts">
import { User, Lock } from "@element-plus/icons-vue"
// import type { FormRules } from "@element-plus/icons-vue"
import { reactive, ref } from 'vue'
import userStore from '@/store/stores/user'
import { useRouter } from 'vue-router'
import { ElNotification } from 'element-plus'

const useUserStore = userStore()
const router = useRouter()

const loginForms = ref()

const loading = ref(false)
const loginForm = reactive({
  username: 'admin',
  password: '123456'
})

const login = async () => {
  console.log(loginForms.value.validate())
  // 登录
  loading.value = true
  const userLoginResult = await useUserStore.userLogin(loginForm)
  if (userLoginResult === 'ok') {
    router.push('/')
    ElNotification({
      type: 'success',
      message: '登陆成功'
    })
  } else {
    ElNotification({
      type: 'error',
      message: userLoginResult
    })
  }
  loading.value = false
}

const validateForUsername = (rule: any, value: any, callback: any) => {
  if (value.length >= 5) {
    callback()
  } else {
    callback(new Error('账号长度至少5位'))
  }
}

const validateForPassword = (rule: any, value: any, callback: any) => {
  if (value.length >= 6) {
    callback()
  } else {
    callback(new Error('账号长度至少5位'))
  }
}

const rules = reactive({
  username: [
    // { required: true, message: 'Please input Activity name', trigger: 'blur' },
    {trigger: 'change', validator: validateForUsername}
  ],
  password: [
    // { required: true, message: 'Please input Activity name', trigger: 'blur' },
    {trigger: 'change', validator: validateForPassword}
  ]
})



</script>

<template>
  <div class="login_container">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-form :model="loginForm" :rules="rules" class="login_form" ref="loginForms">
          <h1>Hello</h1>
          <h2>欢迎来到硅谷甄选</h2>
          <el-form-item prop="username">
            <el-input v-model="loginForm.username" :prefix-icon="User"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="loginForm.password" :prefix-icon="Lock" type="password" show-password></el-input>
          </el-form-item>
          <el-form-item>
            <el-button :loading="loading" @click="login" class="login_btn" type="primary" size="default">登录</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>


<style lang="scss" scoped>
.login_container {
  width: 100%;
  height: 100vh;
  background: url('@/assets/images/background.jpg') no-repeat;
  background-size: cover;

  .login_form {
    position: relative;
    width: 80%;
    top: 30vh;
    background: url('@/assets/images/login_form.png') no-repeat;
    background-size: cover;
    padding: 40px;

    h1 {
      color: white;
      font-size: 40px;
    }

    h2 {
      font-size: 20px;
      color: white;
      margin: 20px 0px;
    }

    .login_btn {
      width: 100%;
    }
  }
}
</style>