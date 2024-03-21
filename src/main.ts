import { createApp } from 'vue'
import ElementPlus from 'element-plus'
//@ts-ignore
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import 'element-plus/dist/index.css'
// 暗黑模式
import 'element-plus/theme-chalk/dark/css-vars.css'
import App from '@/App.vue'
// svg 插件需要配置的代码
import 'virtual:svg-icons-register'
// 全局组件
import globalComponents from '@/components/globalComponents/index.ts'
// 清除默认样式
import '@/styles/index.scss'
// 路由
import router from './router/index'
// 路由守卫
import './permission'
// pinia
import pinia from './store/index'



const app = createApp(App)
// 注册路由
app.use(router)


// 安装element plus 插件
app.use(ElementPlus, {
  locale: zhCn,
})
// 注册全局插件
app.use(globalComponents)
// pinia
app.use(pinia)
app.mount('#app')
