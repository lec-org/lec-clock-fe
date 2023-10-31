<script setup lang="ts">
import axios from 'axios'
import { ref, onMounted } from 'vue'
import BasicLayout from '@/views/common/layout/basic-layout.vue'
import clockInfo from './components/clock-info.vue'

const isLoggedIn = ref(false)
// 检查 token 是否存在
const checkToken = () => {
  const token = localStorage.getItem('token')
  isLoggedIn.value = !!token
}
const name = localStorage.getItem('name')
const token = localStorage.getItem('token')
const expandSidebar = ref(false) // 响应式数据，控制右边栏的展开和收起状态

// 页面加载时检查 token
onMounted(checkToken)

const startClockIn = async () => {
  try {
    const response = await axios.post(
      'http://58.87.105.56:8080/clock/clock',
      null,
      {
        headers: {
          token: token
        }
      }
    )
    console.log(response.data) // 处理响应数据
  } catch (error) {
    console.error(error)
  }
}

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
  height: 100%;

  .content {
    display: flex;
    align-items: center;
    gap: 12px;
    max-height: 300px;
  }
}
</style>
