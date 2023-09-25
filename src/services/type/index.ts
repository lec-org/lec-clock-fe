import type { RequestError } from '../request'

export interface ResponseData<T = any> {
  code: number
  msg: string
  data: T
}

export interface RequestResult<T> {
  response?: ResponseData<T>
  error?: RequestError
}

export * from './api'
