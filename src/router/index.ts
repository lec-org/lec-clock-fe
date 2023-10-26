import { createRouter, createWebHistory } from 'vue-router'
import {useLoginStore} from '@/views/login/store/login'
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/home' // 后面改成往home跳转
    },
    {
      path: '/home',
      component: () => import('@/views/home/home-view.vue')
    },
    {
      path: '/login',
      component: () => import('@/views/login/login-view.vue')
    }
  ]
})

router.beforeEach((to) =>{
  const userStore = useLoginStore()
  userStore.token = localStorage.getItem('token') as unknown as string 
  if(!userStore.token && to.path !== '/login') {
    return '/login'
  }
})

export default router
