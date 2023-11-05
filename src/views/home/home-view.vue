<script setup lang="ts">
import { ref, onMounted } from 'vue'
import BasicLayout from '@/views/common/layout/basic-layout.vue'
import clockInfo from './components/clock-info.vue'
import { checkoutToken } from '@/services';
import router from '@/router';
import { Message } from '@arco-design/web-vue';

const isLoggedIn = ref(false)
// 检查 token 是否存在
const token = localStorage.getItem('token') || ""
const checkToken = async() => {
  isLoggedIn.value = !!token
  if(token){
    const res = await checkoutToken(token)
    if(!res.response?.data || res.response?.error.message!=="请求超时"){
        Message.error("token过期了")
        router.push('/login')
    }
  }
}

const expandSidebar = ref(false) // 响应式数据，控制右边栏的展开和收起状态

// 页面加载时检查 token
onMounted(checkToken)
const toggleSidebar = async () => {
  expandSidebar.value = !expandSidebar.value
}
onMounted(() => {
  const sidebar = document.getElementById('sidebar')
  if (sidebar) {
    sidebar.style.width = '0'
    sidebar.style.height = '0'
  }
})
</script>

<template>
  <basic-layout>
    <a-layout class="home-view">
      <a-layout-header>
        <clock-info />
      </a-layout-header>

      <a-layout-content class="content">
        <clock-button />
        <line-chart />
      </a-layout-content>

      <a-layout-footer> </a-layout-footer>
    </a-layout>
  </basic-layout>
</template>

<style scoped lang="scss">
.home-view {
  padding: 14px;
  height: 100%;

  .content {
    display: flex;
    align-items: center;
    gap: 12px;
    max-height: 300px;
  }
}
</style>
