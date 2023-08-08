import { defineStore } from "pinia";

// layout 组件相关配置仓库
let useLayoutSettingStore = defineStore('SettingStore', {
  state() {
    return {
      // 用于控制菜单是否收起
      fold: false
    }
  }
})

export default useLayoutSettingStore
