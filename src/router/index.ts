import {createRouter, createWebHashHistory} from 'vue-router'
import {routes} from './routes'

let router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
  scrollBehavior() {
    return {
      left: 0,
      right: 0
    }
  }
})



export default router



