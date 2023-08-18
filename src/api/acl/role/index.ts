// 角色管理模块的接口
import request from '@/utils/request'
import { RoleResponseData, RoleData } from './types'

enum API {
  // 获取全部职位
  ALLROLE_URL = '/admin/acl/role/',
  // 添加职位
  ADDROLE_URL = '/admin/acl/role/save',
  // 更新已有职位
  UPDATEROLE_URL = '/admin/acl/role/update',
}

export const reqAllRoleList = (page: number, limit: number, roleName?: string) => {
  return request.get<any, RoleResponseData>(API.ALLROLE_URL + `${page}/${limit}/?roleName=${roleName}`)
}
export const reqAddOrUpdateRole = (data: RoleData) => {
  if (data.id) {
    return request.put<any, any>(API.UPDATEROLE_URL, data)
  } else {
    return request.post<any, any>(API.ADDROLE_URL, data)
  }
}

