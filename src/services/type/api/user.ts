export interface UserLoginParams {
  username: string
  password: string
}

export interface UserRegisterParams extends UserLoginParams {
  nickname: string
  grade: number
  code: string
}
