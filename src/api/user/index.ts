import request from '@/utils/request'

import type { LoginForm, LoginResponse, UserInfoResponse } from './type'

// 用户相关的请求地址
enum API {
  LOGIN_URL = '/admin/acl/index/login',
  USERINFO_URL = '/admin/acl/index/info',
  LOGOUT_URL = '/admin/acl/index/logout'
}

// 登录
export const reqLogin = (data: LoginForm) => {
  return request.post<any, LoginResponse>(API.LOGIN_URL, data)
}
// 获取用户信息
export const reqUserInfo = () => {
  return request.get<any, UserInfoResponse>(API.USERINFO_URL)
}
// 退出登录
export const reqLogout = () => {
  return request.post<any, any>(API.LOGOUT_URL)
}

