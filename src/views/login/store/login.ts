import { LoginInfo, RegisterInfo } from '../type'
<<<<<<< HEAD
// import {defineStore} from 'pinia'
=======
>>>>>>> 96096f18bd850164bbda7ebb3dbd496fe0bfa982
type ActiveForm = 'login' | 'register'

export interface LoginStoreState {
  activeForm: ActiveForm
}

export const useLoginStore = defineStore('loginStore', () => {
  const activeForm = ref<ActiveForm>('login')

  const loginInfo = ref<LoginInfo>({
    username: '',
    password: ''
  })
  const registerInfo = ref<RegisterInfo>({
    username: '',
    nickname: '',
    password: '',
<<<<<<< HEAD
    email: '',
    grade: 1,
    code: undefined
  })

  const changeActiveForm = () => {
    if (activeForm.value === 'login') {
      activeForm.value = 'register'
    } else {
      activeForm.value = 'login'
    }
  }

=======
    email:'',
    grade:1,
    code:undefined
  })

>>>>>>> 96096f18bd850164bbda7ebb3dbd496fe0bfa982
  // 切换自动清空
  watch(activeForm, (value) => {
    if (value === 'register') {
      loginInfo.value = { username: '', password: '' }
    } else {
      registerInfo.value = {
        username: '',
        nickname: '',
        password: '',
<<<<<<< HEAD
        email: '',
        grade: 1,
        code: undefined
=======
        email:'',
        grade:1,
        code:undefined
>>>>>>> 96096f18bd850164bbda7ebb3dbd496fe0bfa982
      }
    }
  })

<<<<<<< HEAD
  //  设置token
  const token = ref<string>('')
  const setToken = (newToken: string) => {
    token.value = newToken
    // console.log('设置了token')
  }
  const localId = localStorage.getItem('Id') || null
  const id = localId ? ref<string>(localId) : ref<string>('')
  const setId = (newId: string) => {
    if (id.value === '') {
      id.value = newId
    }
=======
  const changeActiveForm = () => {
    if (activeForm.value === 'login') {
      activeForm.value = 'register'
    } else {
      activeForm.value = 'login'
    }
  }
  //  设置token
  const token = ref('')
  const setToken = (newToken: string) => {
    token.value = newToken
    localStorage.setItem('token', token.value)
    localStorage.setItem('name', loginInfo.value.username)
    //loginInfo
>>>>>>> 96096f18bd850164bbda7ebb3dbd496fe0bfa982
  }
  return {
    activeForm,
    loginInfo,
    registerInfo,
    changeActiveForm,
    token,
<<<<<<< HEAD
    setToken,
    id,
    setId
  }
})
=======
    setToken
  }
},{persist: true})
>>>>>>> 96096f18bd850164bbda7ebb3dbd496fe0bfa982
