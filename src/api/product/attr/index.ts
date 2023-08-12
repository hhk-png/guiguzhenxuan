// 属性相关的接口
import request from '@/utils/request'
import type { CategoryResponseData, AttrResponseData } from './types'

enum API {
  // 获取一级分类接口地址
  C1_URL = '/admin/product/getCategory1',
  C2_URL = '/admin/product/getCategory2/',
  C3_URL = '/admin/product/getCategory3/',
  // 获取分类下的属性接口
  ATTR_URL = '/admin/product/attrInfoList/',
  // 添加或更新已有属性
  ADDORUPDATEATTR_URL = '/admin/product/saveAttrInfo',
  DELETEATTR_URL = '/admin/product/deleteAttr/'
}

export const reqC1 = () => request.get<any, CategoryResponseData>(API.C1_URL)

export const reqC2 = (category1Id: number | string) => request.get<any, CategoryResponseData>(API.C2_URL + category1Id)

export const reqC3 = (category2Id: number | string) => request.get<any, CategoryResponseData>(API.C3_URL + category2Id)
// 分类属性
export const reqAttr = (c1Id: string | number, c2Id: string | number, c3Id: string | number) => {
  return request.get<any, AttrResponseData>(API.ATTR_URL + `${c1Id}/${c2Id}/${c3Id}`)
}

export const reqAddOrUpdateAttr = (data: Attr) => {
  return request.post<any, any>(API.ADDORUPDATEATTR_URL, data)
}

export const reqRemoveAttr = (attrId: number) => {
  return request.delete<any, any>(API.DELETEATTR_URL + attrId)
}
