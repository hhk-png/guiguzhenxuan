export interface LoginForm {
  username: string,
  password: string
}
export interface Response {
  code: number,
  message: string,
  ok: boolean,
}

interface dataType {
  token?: string,
  message?: string
}

// 登录接口返回数据类型
export interface LoginResponse extends Response{
  data: string
}

// 定义服务器返回用户信息
interface userInfo {
  userId: number,
  avatar: string,
  username: string,
  password: string,
  desc: string,
  roles: string[],
  buttons: string[],
  routes: string[],
  token: string
}
interface user {
  checkUser: userInfo
}
export interface UserInfoResponse extends Response {
  data: {
    routes: string[],
    buttons: string[],
    roles: string[],
    name: string,
    avatar: string
  }
}
