import request from '@/utils/request'
import type { UserReponseData, User, AllRoleReponseData, SetRoleData } from './types'

enum API {
  // 获取全部已有用户账号信息
  ALLUSER_URL = '/admin/acl/user/',
  // 添加一个新用户账号
  ADDUSER_URL = '/admin/acl/user/save',
  // 更新已有用户账号信息
  UPDATEUSER_URL = '/admin/acl/user/update',
  // 获取全部职位，当前帐号拥有的职位接口
  ALLROLEURL = '/admin/acl/user/toAssign/',
  // 给已有用户分配角色接口
  SETROLE_URL = '/admin/acl/user/doAssignRole',
  // 删除某一个账号
  DELETEUSER_URL = '/admin/acl/user/remove/',
  // 批量删除接口
  DELETEALLUSER_URL = '/admin/acl/user/batchRemove',
}

export const reqUserInfo = (page: number, limit: number, username: string) => {
  return request.get<any, UserReponseData>(API.ALLUSER_URL + `${page}/${limit}?username=${username}`)
}

export const reqAddOrUpdateUser = (data: User) => {
  if (data.id) {
    return request.put<any, UserReponseData>(API.UPDATEUSER_URL, data)
  } else {
    return request.post<any, UserReponseData>(API.ADDUSER_URL, data)
  }
}

export const reqAllRole = (userId: string | number) => {
  return request.get<any, AllRoleReponseData>(API.ALLROLEURL + userId)
}

export const reqSetUserRole = (data: SetRoleData) => {
  return request.post<any, any>(API.SETROLE_URL, data)
}

export const reqDeleteUser = (userId: string | number) => {
  return request.delete<any, any>(API.DELETEUSER_URL + userId)
}

export const reqDeleteSelectUser = (userIdList: number[]) => {
  return request.delete<any, any>(API.DELETEALLUSER_URL, { data: userIdList })
}



