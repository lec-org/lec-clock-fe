import { request } from '@/services/request'
//注册功能
export const userRegisterService = ({
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
export const userCodeService = (email: string) => {
  const formData = new FormData()
  formData.append('email', email)

  return request.post('/user/register/sendCode', formData)
}
