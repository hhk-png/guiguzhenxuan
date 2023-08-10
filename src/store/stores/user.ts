import { defineStore } from 'pinia'
import type { loginForm, loginResponseData } from '@/api/user/type'
import { reqLogin, reqUserInfo, reqLogout } from '@/api/user'
import { UserState } from './types/type'
import { getToken, setToken, removeToken } from '@/utils/token'
import { routes } from '@/router/routes.ts'

const useUserStore = defineStore('User', {
  state(): UserState {
    return {
      token: getToken() || '',
      // 路由
      menuRoutes: routes,
      // 用户名和头像
      username: '',
      avatar: ''
    }
  },
  actions: {
    // 登陆的逻辑
    async userLogin(data: any) {
      const result: any = await reqLogin(data)
      if (result.code === 200) {
        this.token = result.data
        // 本地持久化存储
        setToken(this.token)
        return 'ok'
      }
      return result.data
    },
    // 获取用户信息
    async userInfo() {
      // 获取用户信息并存储
      const result = await reqUserInfo()
      if (result.code === 200) {
        this.username = result.data.name
        this.avatar = result.data.avatar
        return 'ok'
      } else {
        return Promise.reject(new Error(result.data))
      }
    },
    // 退出登录
    async userLogout() {
      const result = await reqLogout()
      if (result.code === 200) {
        // 通知token 失效
        this.token = ''
        this.username = ''
        this.avatar = ''
        removeToken()
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }

    }
  },
  getters: {

  }
})

export default useUserStore
