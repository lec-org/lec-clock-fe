export interface LoginInfo {
  username: string
  password: string
}

export interface RegisterInfo extends LoginInfo {
  nickname: string
  confirmPassword: string
  grade?: number
}
