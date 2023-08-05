import axios from 'axios'
import {ElMessage} from 'element-plus'

const Axios = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 5000
})

Axios.interceptors.request.use((config) => {
  // 配置对象
  return config
})

const statusCodeToMessage: Record<number, string> = {
  401: 'TOKEN过期',
  403: '无权访问',
  404: '请求地址错误',
  500: '服务器出现问题',
}
Axios.interceptors.response.use((response) => {
  // 处理返回数据
  return response.data
}, (error) => {
  let message: string = statusCodeToMessage[error.response.status] || '请求地址错误'
  ElMessage({
    type: 'error',
    message
  })
  return Promise.reject(error)
})

export default Axios
