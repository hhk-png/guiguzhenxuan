export interface ResponseData {
  code: number;
  message: string;
  ok: boolean;
}

// 职位数据类型
export interface RoleData {
  id: string | number;
  createTime: string;
  updateTime: string;
  roleName: string;
  remark: string;
}

// 全部职位的数组的ts类型
export type Records = RoleData[];
// 全部职位数据的响应类型
export interface RoleResponseData extends ResponseData {
  data: {
    records: Records;
    total: number;
    size: number;
    current: number;
    orders: [];
    optimizeCountSql: boolean;
    hitCount: boolean;
    countId: null;
    maxLimit: null;
    searchCount: boolean;
    pages: number;
  }
}

