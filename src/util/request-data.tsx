import { isNumber, isString } from 'lodash-es'

// 对象转表单数据
export const transformFormData = (obj: Record<string, unknown>) => {
  const formData = new FormData()
  for (const key in obj) {
    const value = obj[key]
    if (value instanceof Blob || isString(value)) {
      formData.append(key, value)
    } else if (isNumber(value)) {
      formData.append(key, value.toString())
    } else {
      const str = String(value)
      str && formData.append(key, str)
    }
  }

  return formData
}
