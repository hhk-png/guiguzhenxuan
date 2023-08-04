import SvgIcon from '../SvgIcon/index.vue'
import { App, Component } from 'vue'

const allGlobalComponents: Record<string, Component> = {
  // Svg 
  SvgIcon
}

export default {
  install(app: App) {
    Object.keys(allGlobalComponents).forEach((val) => {
      app.component(val, allGlobalComponents[val])
    })
  }
}
