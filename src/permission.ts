// 路由鉴权
import type { RouteLocationNormalized, NavigationGuardNext } from 'vue-router'
import router from '@/router'
import useUserStore from '@/store/stores/user'
import pinia from './store'

const userStore = useUserStore(pinia)
console.log(userStore)

router.beforeEach(async (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  const token = userStore.token
  const username = userStore.username

  if (token) {
    if (to.path === '/login') {
      next({ path: '/home' })
    } else {
      if (username) {
        next()
      } else {
        try {
          await userStore.userInfo()
          next()
        } catch (e) {
          userStore.userLogout()
          next({ path: '/login' })
        }
      }
    }
  } else {
    // 用户未登录
    if (to.path === '/login') {
      next()
    } else {
      next({ path: '/login', query: { redirect: to.path } })
    }
  }

})


router.afterEach((to: RouteLocationNormalized, from: RouteLocationNormalized) => {

})


