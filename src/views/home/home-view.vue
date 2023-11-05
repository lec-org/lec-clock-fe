<script setup lang="ts">
import { ref, onMounted } from 'vue'
import BasicLayout from '@/views/common/layout/basic-layout.vue'
import RankList from './components/rank-list.vue'
import clockInfo from './components/clock-info.vue'
import { request } from '@/services/request'

const isLoggedIn = ref(false)
// 检查 token 是否存在
const checkToken = () => {
  const token = localStorage.getItem('token')
  isLoggedIn.value = !!token
}
// const name = localStorage.getItem('name')
// const token = localStorage.getItem('token')
// const expandSidebar = ref(false) // 响应式数据，控制右边栏的展开和收起状态

// const startClockIn = async () => {
//   try {
//     const response = await request.post('/clock/clock', null, {
//       headers: {
//         token: token
//       }
//     })
//     console.log(response.data) // 处理响应数据
//   } catch (error) {
//     console.error(error)
//   }
// }

// const toggleSidebar = async () => {
//   expandSidebar.value = !expandSidebar.value
// }
onMounted(() => {
  checkToken()
  const sidebar = document.getElementById('sidebar')
  if (sidebar) {
    sidebar.style.width = '0'
    sidebar.style.height = '0'
  }
})
</script>

<template>
  <basic-layout>
    <template #default>
      <div class="content-wrapper">
        <div class="left">
          <a-layout>
            <a-layout-header class="header">
              <clock-info />
            </a-layout-header>

            <a-layout-content class="content">
              <clock-button />
              <line-chart />
            </a-layout-content>

            <a-layout-footer>
              <rank-list></rank-list>
            </a-layout-footer>

            <a-layout-footer> </a-layout-footer>
          </a-layout>
        </div>
      </div>
    </template>

    <template #right-sidebar>
      <right-sidebar></right-sidebar>
    </template>
  </basic-layout>
</template>

<style scoped lang="scss">
.content-wrapper {
  display: flex;
  height: 100%;
  gap: 24px;

  .header {
    border-bottom: 1px solid #3333;
  }
  .left {
    flex: 2;
    width: 100%;

    .content {
      display: flex;
      align-items: center;
      gap: 12px;
      max-height: 300px;
    }
  }

  .right {
  }
}
</style>
