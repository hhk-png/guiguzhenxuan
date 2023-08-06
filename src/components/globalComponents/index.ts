import SvgIcon from '../SvgIcon/index.vue'
import { App, Component } from 'vue'
// 引入elementplus全部图标组件
import * as ElementPlusIconsVue from '@element-plus/icons-vue'


const allGlobalComponents: Record<string, Component> = {
  // Svg
  SvgIcon,
}

export default {
  install(app: App) {
    Object.keys(allGlobalComponents).forEach((val) => {
      app.component(val, allGlobalComponents[val])
    })
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
    }
  },
}
