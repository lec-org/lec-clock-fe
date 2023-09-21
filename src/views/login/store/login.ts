import { defineStore } from 'pinia'

export interface LoginStoreState {
  activeForm: 'login' | 'register'
}

export const useLoginStore = defineStore('loginStore', {
  state: (): LoginStoreState => ({
    activeForm: 'login'
  }),
  actions: {
    changeActiveForm() {
      if (this.activeForm === 'login') {
        this.activeForm = 'register'
      } else {
        this.activeForm = 'login'
      }
    }
  }
})
