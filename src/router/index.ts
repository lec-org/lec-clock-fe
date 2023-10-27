import { createRouter, createWebHistory } from 'vue-router'
<<<<<<< HEAD
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
=======
import { useLoginStore } from '@/views/login/store/login'

const routes = [
  {
    path: '/',
    redirect: '/login' // 后面改成往home跳转
  },
  {
    path: '/home',
    component: () => import('@/views/home/home-view.vue')
  },
  {
    path: '/login',
    component: () => import('@/views/login/login-view.vue')
  },
  {
    path: '/attendance',
    component: () => import('@/views/attendance/attendance-view.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to) => {
  const userStore = useLoginStore()
  userStore.token = localStorage.getItem('token') as unknown as string
  if (!userStore.token && to.path !== '/login') return '/login'
>>>>>>> 96096f18bd850164bbda7ebb3dbd496fe0bfa982
})

export default router
