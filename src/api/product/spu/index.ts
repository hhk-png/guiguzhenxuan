import request from '@/utils/request'
import { SkuInfoData, SkuData, HasSaleAttrResponseData, HasSpuResponseData, AllTrademark, SpuHasImg, SaleAttrResponseData, SpuData } from './types'

enum API {
  // 获取已有SPU的数据
  HASSPU_URL = '/admin/product/',
  // 获取全部品牌的数据
  ALLTRADEMARK_URL = '/admin/product/baseTrademark/getTrademarkList',
  // // 修改已有品牌
  // UPDATETRADEMARK_URL = '/admin/product/baseTrademark/update',
  // // 删除已有品牌
  // DELETE_URL = '/admin/product/baseTrademark/remove',
  // 获取某个SPU 下的全部售卖商品的图片数据
  IMAGE_URL = '/admin/product/spuImageList/',
  // 获取某一个SPU下全部的已有销售属性接口
  SPUHASSALEATTR_URL = '/admin/product/spuSaleAttrList/',
  // 获取整个项目的全部销售属性 颜色、版本、尺码
  ALLSALEATTR_URL = '/admin/product/baseSaleAttrList',
  // 添加SPU
  ADDSPU_URL = '/admin/product/saveSpuInfo',
  // 更新已有的SPU
  UPDATESPU_URL = '/admin/product/updateSpuInfo',
  // 追加一个新的SKU的地址
  ADDSKU_URL = '/admin/product/saveSkuInfo',
  // 查看某一个已有的SPU下全部售卖的商品
  SKUINFO_URL = '/admin/product/findBySpuId/',
  // 删除已有的SPU
  REMOVESPU_URL = '/admin/product/deleteSpu/'
}


// 获取某个三级分类下已有SPU的数据
export const reqHasSpu = (page: number, limit: number, c3Id: number | string) => {
  return request.get<any, HasSpuResponseData>(API.HASSPU_URL + `${page}/${limit}?category3Id=${c3Id}`)
}

export const reqAllTrademark = () => {
  return request.get<any, AllTrademark>(API.ALLTRADEMARK_URL)
}

export const reqSpuImageList = (spuId: number | string) => {
  return request.get<any, SpuHasImg>(API.IMAGE_URL + spuId)
}

export const reqSpuHasSaleAttr  = (spuId: number | string) => {
  return request.get<any, SaleAttrResponseData>(API.SPUHASSALEATTR_URL + spuId)
}

// 获取整个项目的全部销售属性
export const reqAllSaleAttr  = () => {
  return request.get<any, HasSaleAttrResponseData>(API.ALLSALEATTR_URL)
}

// 添加 | 更新SPU
export const reqAddOrUpdateSpu = (data: SpuData) => {
  if (data.id) {
    return request.post<any, any>(API.UPDATESPU_URL, data)
  } else {
    return request.post<any, any>(API.ADDSPU_URL, data)
  }
}

// 添加SKU
export const reqAddSku = (data: SkuData) => {
  return request.post<any, any>(API.ADDSKU_URL, data)
}

export const reqSkuList = (spuId: string | number) => {
  return request.get<any, SkuInfoData>(API.SKUINFO_URL + spuId)
}

export const reqRemoveSpu = (spuId: string | number) => {
  return request.delete<any, any>(API.REMOVESPU_URL + spuId)
}



