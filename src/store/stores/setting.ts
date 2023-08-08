import { defineStore } from "pinia";

// layout 组件相关配置仓库
const useLayoutSettingStore = defineStore('SettingStore', {
  state() {
    return {
      // 用于控制菜单是否收起
      fold: false,
      // 控制刷新效果
      refresh: false
    }
  }
})

export default useLayoutSettingStore
