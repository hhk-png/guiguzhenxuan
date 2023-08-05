import { createApp } from 'vue'
import ElementPlus from 'element-plus'
//@ts-ignore
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import 'element-plus/dist/index.css'
import App from '@/App.vue'
// svg 插件需要配置的代码
import 'virtual:svg-icons-register'
// 全局组件
import globalComponents from '@/components/globalComponents/index.ts'
// 清除默认样式
import '@/styles/index.scss'

const app = createApp(App)
// 安装element plus 插件
app.use(ElementPlus, {
  locale: zhCn,
})
// 注册全局插件
app.use(globalComponents)
app.mount('#app')
