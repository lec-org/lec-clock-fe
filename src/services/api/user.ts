import { request } from '@/services/request'
import { transformFormData } from '@/util'

//注册功能
export const userRegister = ({
  usertname,
  nickname,
  password,
  grade,
  code
}: Record<string, number>) => {
  return request.post('/user/register', {
    usertname,
    nickname,
    password,
    grade,
    code
  })
}

//发送验证码功能
export const userSendCode = (params: { email: string }) => {
  return request.post('/user/register/sendCode', transformFormData(params))
}
