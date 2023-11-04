type PUNCH = '上卡' | '下卡'

export const userMainStore = defineStore('userMain', () => {
  const punch = ref<PUNCH>('上卡')
  const changePunch = () => {
    if (punch.value === '上卡') {
      punch.value = '下卡'
      
    } else {
      punch.value = '上卡'
    }
  }
  return {
    punch,
    changePunch
  }
})

