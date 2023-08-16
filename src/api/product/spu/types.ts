export interface ResponseData {
  code: number,
  message: string,
  ok: boolean
}

// SPU 数据的ts 类型
export interface SpuData {
  id?: number | string,
  spuName: string,
  description: string,
  category3Id: string | number,
  tmId: number | string,
  spuSaleAttrList: null | SaleAttr[],
  spuImageList: null | SpuImage[]
}

// 元素都是已有SPU数据
export type Records = SpuData[]

// 获取已有SPU 接口返回的数据ts 类型
export interface HasSpuResponseData extends ResponseData {
  data: {
    records: Records,
    total: number,
    size: number,
    current: number,
    searchCount: boolean,
    pages: number
  }
}

// 品牌数据
export interface Trademark {
  id: number,
  tmName: string,
  logoUrl: string
}
// 品牌接口返回的数据
export interface AllTrademark extends ResponseData {
  data: Trademark[]
}

// spu image
export interface SpuImage {
  id?: number,
  createTime?: string,
  updateTime?: string,
  spuId?: number,
  imgName?: string,
  imgUrl?: string,
  name?: string,
  url?: string
}
// 已有spu的照片墙数据的类型
export interface SpuHasImg extends ResponseData {
  data: SpuImage[]
}

// 已有的销售属性值对象
export interface SaleAttrValue {
  id?: number
  createTime?: null
  updateTime?: null
  spuId?: number
  baseSaleAttrId: number
  saleAttrValueName: string
  saleAttrName?: string
  isChecked?: null
}
// 已有的销售属性值数组
export type SpuSaleAttrValueList = SaleAttrValue[]

// 销售属性对象
export interface SaleAttr {
  id?: number
  createTime?: null
  updateTime?: null
  spuId?: number
  baseSaleAttrId?: number
  saleAttrName?: string
  spuSaleAttrValueList?: SpuSaleAttrValueList
  flag?: boolean
  saleAttrValue: string
}

// 已有的销售属性接口
export interface SaleAttrResponseData extends ResponseData {
  data: SaleAttr[]
}

// 全部SPU的返回数据
export interface HasSaleAttr {
  id: number,
  name: string
}
export interface HasSaleAttrResponseData extends ResponseData {
  data: HasSaleAttr[]
}

export interface Attr {
  attrId: string | number,
  valueIs: string | number
}

export interface saleAttr {
  saleAttrId: string | number,
  saleAttrValueId: string | number
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
  skuDefaultImg: string
}

// 获取SKU数据的类型
export interface SkuInfoData extends ResponseData {
  data: SkuData[]
}
