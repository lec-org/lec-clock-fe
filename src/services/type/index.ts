import type { RequestError } from '../request'

export interface ResponseData<T = any> {
  code: number
  msg: string
  data: T
}

export interface RequestResult<T> {
<<<<<<< HEAD
=======
  data: any
>>>>>>> 96096f18bd850164bbda7ebb3dbd496fe0bfa982
  response?: ResponseData<T>
  error?: RequestError
}

export * from './api'
