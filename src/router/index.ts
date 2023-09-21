import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/login' // 后面改成往home跳转
    },
    {
      path: '/home',
      component: () => import('@/views/HomeView.vue')
    },
    {
      path: '/login',
      component: () => import('@/views/LoginView.vue')
    }
  ]
})

export default router
