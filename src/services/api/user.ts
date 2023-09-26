import { request } from '@/services/request'
import { transformFormData } from '@/util'
import { UserLoginParams, UserRegisterParams } from '../type'

//注册功能
export const userRegister = (params: UserRegisterParams) => {
  return request.post('/user/register', params)
}

//发送验证码功能
export const userSendCode = (params: { email: string }) => {
  return request.post('/user/register/sendCode', transformFormData(params))
}

//登陆功能
export const userLogin = (params: UserLoginParams) => {
  return request.post('/user/login', params)
}
