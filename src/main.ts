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
import router from './router/index'
// 路由守卫
import './permission'
import pinia from './store/index'



const app = createApp(App)
app.use(router)
app.use(ElementPlus, {
  locale: zhCn,
})
app.use(globalComponents)
app.use(pinia)

app.mount('#app')
