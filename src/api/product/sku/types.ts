export interface ResponseData {
  code: number,
  message: string,
  ok: boolean
}

// sku 的数据类型
export interface Attr {
  id?: string | number,
  attrId: string | number,
  valueIs: string | number,
  valueName?: string,
}

export interface saleAttr {
  saleAttrId: string | number,
  saleAttrValueId: string | number,
  saleAttrName?: string,
}

export interface SkuData {
  category3Id: string | number,
  spuId: string | number,
  tmId: string | number,
  skuName: string,
  price: string | number,
  weight: string | number,
  skuDesc: string,
  skuAttrValueList?: Attr[],
  skuSaleAttrValueList?: saleAttr[],
  skuDefaultImg: string,
  skuImageList: any,
  isSale?: number,
  id?: number,
}

// 获取sku接口返回的数据类型
export interface SkuResponseData extends ResponseData {
  data: {
    records: SkuData[],
    total: number,
    size: number,
    current: number,
    orders: [],
    optimiszCountSql: boolean,
    hitCount: boolean,
    countId: null,
    maxLimit: null,
    searchCount: boolean,
    pages: number
  }
}

// SKU 商品详情
export interface SkuInfoData extends ResponseData {
  data: SkuData
}

