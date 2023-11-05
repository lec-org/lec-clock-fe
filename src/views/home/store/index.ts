import { User } from '../type'
export const userMainStore = defineStore('userMain', () => {
  const userList:User[] = ref<Array<User>>([])
  const selfUser:User = reactive<User>({
    avatar: '',
    nickname: '',
    totalDuration: 0,
    targetDuration: 0,
    grade: 0,
    status: 0
  })
  const dataList:any[] = reactive<any>([])

  return {
    userList,
    selfUser,
    dataList,

  }
},{persist:true})

