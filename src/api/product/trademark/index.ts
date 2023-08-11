// 品牌管理接口模块
import request from '@/utils/request'
import type {TrademarkResponseData, Trademark} from './types'

enum API {
  TRADEMARK_URL = '/admin/product/baseTrademark/',
  ADDTRADEMARK_URL = '/admin/product/baseTrademark/save',
  UPDATETRADEMARK_URL = '/admin/product/baseTrademark/update',
  DELETE_URL = '/admin/product/baseTrademark/remove/'
}

// 请求品牌信息
export const reqHasTrademark = (page: number, limit: number) => {
  return request.get<any, TrademarkResponseData>(API.TRADEMARK_URL + `${page}/${limit}`)
}
// 添加与修改品牌
export const reqAddOrUpdateTrademark = (data: Trademark) => {
  if (data.id) {
    return request.put<any, any>(API.UPDATETRADEMARK_URL, data)
  } else {
    // 新增品牌
    return request.post<any, any>(API.ADDTRADEMARK_URL, data)
  }
}
// 删除已有品牌
export const reqDeleteTrademark = (id: number) => {
  return request.delete<any, any>(API.DELETE_URL + id)
}

