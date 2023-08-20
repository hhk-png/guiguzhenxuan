// 角色管理模块的接口
import request from '@/utils/request'
import { RoleResponseData, RoleData, MenuResponseData } from './types'

enum API {
  // 获取全部职位
  ALLROLE_URL = '/admin/acl/role/',
  // 添加职位
  ADDROLE_URL = '/admin/acl/role/save',
  // 更新已有职位
  UPDATEROLE_URL = '/admin/acl/role/update',
  // 获取全部的菜单与按钮的数据
  ALLPERMISSION = '/admin/acl/permission/toAssign/',
  // 给相应的职位分配权限
  SETPERMISSION = '/admin/acl/permission/doAssign/?',
  // 删除已有的职位
  DELETEROLE_URL = '/admin/acl/role/remove/'
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
export const reqAllMenuList = (roleId: string | number) => {
  return request.get<any, MenuResponseData>(API.ALLPERMISSION + roleId)
}
export const reqSetPermission = (roleId: number, permissionId: number[]) => {
  return request.post<any, any>(API.SETPERMISSION + `roleId=${roleId}&permissionId=${permissionId}`)
}
export const reqDeleteRole = (roleId: number | string) => {
  return request.delete<any, any>(API.DELETEROLE_URL + roleId)
}
