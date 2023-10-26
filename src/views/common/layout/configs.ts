import router from '@/router'
import { request } from '@/services/request'
import { Message } from '@arco-design/web-vue'

export const sidebarItems = [
  {
    key: '1',
    icon: 'icon-home',
    text: '工作台',
    clickEvent: () => {
      router.push('/home')
    }
  },

  {
    key: '2',
    icon: 'icon-calendar',
    text: '打卡排行',
    clickEvent: () => {
      router.push('/attendance')
    }
  }
]

export const avatarDropdownItems = [
  {
    key: '1',
    icon: 'icon-home',
    text: '个人设置',
    clickEvent: () => {
      console.log(1)
    }
  },
  {
    key: '2',
    icon: 'icon-home',
    text: '退出登录',
    clickEvent: async () => {
      const token = localStorage.getItem('token')
      try {
        await request.post('/api/user/logout', null, {
          headers: {
            token
          }
        })
        Message.info('退出登录成功！')
        router.replace('/login')
      } catch (error) {
        Message.error('出错啦！')
        console.error(error)
      }
    }
  }
]
