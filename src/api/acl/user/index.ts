import request from '@/utils/request'
import type { UserReponseData } from './types'

enum API {
  // 获取全部已有用户账号信息
  ALLUSER_URL = '/admin/acl/user/',
}

export const reqUserInfo = (page: number, limit: number) => {
  return request.get<any, UserReponseData>(API.ALLUSER_URL + `${page}/${limit}`)
}

