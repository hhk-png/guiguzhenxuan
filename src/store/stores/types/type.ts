import type {RouteRecordRaw} from 'vue-router'
import type { CategoryObj } from '@/api/product/attr/types'

// 用户数据store
export interface UserState {
  token: string,
  menuRoutes: RouteRecordRaw[]
  username: string,
  avatar: string
}

// 分类store
export interface CategoryState {
  c1Id: string | number,
  c1Arr: CategoryObj[],
  c2Arr: CategoryObj[],
  c2Id: string | number,
  c3Arr: CategoryObj[],
  c3Id: string | number
}
