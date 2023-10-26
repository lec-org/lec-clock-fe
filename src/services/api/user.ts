import { request } from '@/services/request'
//注册功能
export const userRegisterService = ({
  username,
  nickname,
  password,
  email,
  grade,
  code
}: Record<string, any>) => {
  return request.post('/user/register', {
    username,
    nickname,
    password,
    email,
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

// 登录功能
export const userLoginService = ({
  username,
  password
}: Record<string, any>) => {
  return request
    .post('/user/login', {
      username,
      password
    })
    .then((response) => {
      if (
        response.data &&
        response.data.code !== undefined &&
        response.data.data !== undefined
      ) {
        const { code, data } = response.data
        if (code === 0 && data && data.userInfoVo && data.userInfoVo.id) {
          const userId = data.userInfoVo.id
          localStorage.setItem('userId', userId) // 存储id信息到localStorage
        }
      }
      return response
    })
}
