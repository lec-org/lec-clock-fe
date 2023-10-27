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

//上下卡
export const startClockInService = (token:string)=>{
    const config = {
        headers: {
            token: token,
        },
    }
    return request.post('/clock/clock',null,config)
}

// 验证token
export const checkoutToken = (token:string)=>{
    const config:Object = {
        headers:{
            token:token,
        },
    }
    return request.get('/user/isDead',config)
}

// 获取个人信息
export const getUserInfoService =async ({
    id,
    token,
}:Record<string,any>)=>{
    const config = {
        headers: {
          token: token
        }
      }
    return await request.get(`/user/info/${id}`,config)  
}
//个人信息————保存昵称
export const saveNameService = async({
    name,
    token
}:Record<string,any>)=>{
    return await request.post('/user/info/update',{
        nickname:name
    },{
        headers:{
            token:token
        }
    })
}
//个人信息————保存个性签名
export const saveSignatureService = async ({
    signature,
    token
}:Record<string,any>)=>{
    return await request.post('user/info/update',{
        signature
    },{
        headers:{
            token
        }
    })
}

// 上传头像
export const uploadFileServices = async ({
    file,
    token
}:Record<string,any>)=>{
    const formData = new FormData()
    formData.append('images',file)
    const config = {
        headers: {
          token: token,
        },
      }
    return await request.post('/user/upload',formData,config)
}