export interface ResponseData {
  code: number,
  message: string,
  ok: boolean
}

export interface CategoryObj {
  id: number | string,
  name: string,
  category1Id?: number,
  category2Id?: number
}

export interface CategoryResponseData extends ResponseData {
  data: CategoryObj[]
}

// 属性与属性值


// 属性值对象
export interface AttrValue {
  id?: number,
  valueName: string,
  attrId?: number,
  // 控制属性值的编辑模式与预览模式的切换
  flag?: boolean
}
// 每一个属性值的数组类型
export type AttrValueList = AttrValue[]
// 属性对象
export interface Attr {
  id?: number
  attrName: string
  categoryId: number | string
  categoryLevel: number
  attrValueList: AttrValueList
}
// 每一个属性对象的数组
export type AttrList = Attr[]
// 属性接口返回数据
export interface AttrResponseData extends ResponseData {
  data: Attr[]
}







