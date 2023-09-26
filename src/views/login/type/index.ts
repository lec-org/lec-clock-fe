import { UserLoginParams, UserRegisterParams } from '@/services/type'

export type LoginInfo = UserLoginParams

export interface RegisterInfo extends UserRegisterParams {
  email: string
}
