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
  // const formData = new FormData();
  // formData.append('username', username);
  // formData.append('nickname', nickname);
  // formData.append('password', password);
  // formData.append('email', email);
  // formData.append('grade', grade);
  // formData.append('code', code);
  return request.post('/user/register', {username,nickname,password,email,grade,code,});
}

//发送验证码功能
export const userCodeService = (email: string) => {
  const formData = new FormData()
  formData.append('email', email)

  return request.post('/user/register/sendCode', formData)
}

//登陆功能
export const userLoginService = ({
  username,
  password
}:Record<string,any>)=>{
  return request.post('/user/login',{
    username,
    password
  })
}