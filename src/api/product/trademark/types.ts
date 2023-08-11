
export interface ResponseData {
  code: number,
  message: string,
  ok: boolean
}

// 已有品牌的ts数据类型
export interface Trademark {
  id?: number,
  tmName: string,
  logoUrl: string
}

// 全局品牌数据的ts 类型
export type Records = Trademark[]

export interface TrademarkResponseData extends ResponseData {
  data: {
    records: Records,
    total: number,
    size: number,
    current: number,
    searchCount: true,
    pages: number
  }
}

