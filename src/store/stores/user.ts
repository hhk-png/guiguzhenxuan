import { defineStore } from 'pinia'
import type { loginForm, loginResponseData } from '@/api/user/type'
import { reqLogin } from '@/api/user'
import { UserState } from './types/type'
import { getToken, setToken } from '@/utils/token'

const useUserStore = defineStore('User', {
  state(): UserState {
    return {
      token: getToken() || ''
    }
  },
  actions: {
    // 登陆的逻辑
    async userLogin(data: loginForm) {
      const result: loginResponseData = await reqLogin(data)
      if (result.code === 200) {
        this.token = result.data.token!
        // 本地持久化存储
        setToken(this.token)
        return 'ok'
      }
      return result.data.message
    }
  },
  getters: {

  }
})

export default useUserStore
