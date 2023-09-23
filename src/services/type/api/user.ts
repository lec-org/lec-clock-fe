import { request } from '@/services/request'
//注册功能
export  const userRegisterService = ({usertname, nickname, password, grade, code }:Record<string,number>) => 
request.post('/user/register',{usertname, nickname, password, grade, code})
//发送验证码功能
export const userCodeService = (email:string) =>
  request.post('/user/register/sendCode',email)