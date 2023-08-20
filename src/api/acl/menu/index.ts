import request from '@/utils/request'
import { PermissionResponseData, MenuParams } from './types'

enum API {
  // 获取全部菜单与按钮的标识数据
  ALLPERMISSION = '/admin/acl/permission',
  // 给某一级菜单新增一个子菜单
  ADDMENU_URL = '/admin/acl/permission/save',
  // 更新某一个已有的菜单
  UPDATE_URL = '/admin/acl/permission/update',
  // 删除已有的菜单
  DELETEMENU_URL = '/admin/acl/permission/remove/',
}

export const reqAllPermission = () => {
  return request.get<any, PermissionResponseData>(API.ALLPERMISSION)
}
export const reqAddOrUpdateMenu = (data: MenuParams) => {
  if (data.id) {
    return request.put<any, any>(API.UPDATE_URL, data)
  } else {
    return request.post<any, any>(API.ADDMENU_URL, data)
  }
}
export const reqDeleteMenu = (id: number) => {
  return request.delete<any, any>(API.DELETEMENU_URL + id)
}
