import request from '@/utils/request'
import type { SkuResponseData, SkuInfoData } from './types'

enum API {
  // 获取已有的商品的数据 - SKU
  SKU_URL = '/admin/product/list/',
  // 上架
  SALE_URL = '/admin/product/onSale/',
  // 下架
  CANCELSALE_URL = '/admin/product/cancelSale/',
  // 获取商品详情
  SKUINFO_URL = '/admin/product/getSkuInfo/',
  // 删除已有的商品
  DELETESKU_URL = '/admin/product/deleteSku/',
}

export const reqSkuList = (page: number, limit: number) => {
  return request.get<any, SkuResponseData>(API.SKU_URL + `${page}/${limit}`)
}

export const reqSaleSku = (skuId: string | number) => {
  return request.get<any, any>(API.SALE_URL + skuId)
}

export const reqCancelSale = (skuId: string | number) => {
  return request.get<any, any>(API.CANCELSALE_URL + skuId)
}

export const reqSkuInfo = (skuId: string | number) => {
  return request.get<any, SkuInfoData>(API.SKUINFO_URL + skuId)
}

export const reqDeleteSku = (skuId: string | number) => {
  return request.delete<any, any>(API.DELETESKU_URL + skuId)
}