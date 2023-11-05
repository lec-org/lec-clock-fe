<script setup lang="ts">
import { ref, onMounted } from 'vue'
import BasicLayout from '@/views/common/layout/basic-layout.vue'
import RankList from './components/rank-list.vue'
import clockInfo from './components/clock-info.vue'
import { checkoutToken } from '@/services'
import router from '@/router'
import { checkoutInfo, checkoutList, getUserInfoService } from '@/services'
import { User } from './type/index'
import { userMainStore } from './store'
import { Message } from '@arco-design/web-vue'

const userMain = userMainStore()
const { userList, selfUser, dataList } = storeToRefs(userMain)
import { request } from '@/services/request'

const isLoggedIn = ref(false)
// 检查 token 是否存在
const token = localStorage.getItem('token') || ''
const checkToken = async () => {
  isLoggedIn.value = !!token
}
// const name = localStorage.getItem('name')
// const expandSidebar = ref(false) // 响应式数据，控制右边栏的展开和收起状态

// 页面加载时检查 token
onMounted(checkToken)

// const startClockIn = async () => {
//   try {
//     const response = await axios.post(
//       'http://58.87.105.56:8080/clock/clock',
//       null,
//       {
//         headers: {
//           token: token
//         }
//       }
//     )
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

const id = localStorage.getItem('id') || ''
//更新个人信息
onMounted(async () => {
  try {
    const res = await getUserInfoService({ id, token })
    const info = res.response?.data
    if (info) {
      selfUser.value.nickname = info.nickname
      selfUser.value.grade = info.grade
      getCardList()
    } else {
      Message.error('获取用户信息失败')
    }
  } catch (error) {
    console.error()
  }
})

//获取打卡时长
onMounted(async () => {
  const res = await checkoutInfo({ token, id })
  if (res.response?.code === 200) {
    selfUser.value.totalDuration = res.response?.data.totalDuration
    selfUser.value.targetDuration = res.response?.data.targetDuration
    selfUser.value.status = res.response?.data.status
    dataList.value.push(Math.floor(selfUser.value.totalDuration / 60))
  }
})

//获取打卡排名
const getCardList = async () => {
  const response = await checkoutList({
    grade: selfUser.value.grade as number,
    pageSize: 40,
    pageNum: 1
  })
  const responseData = response.response
  // console.log('responseData',responseData);
  if (responseData?.code === 200) {
    userList.value = responseData.data.rows.map((row: any) => {
      return {
        avatar: row.avatar,
        nickname: row.nickname,
        totalDuration: (row.totalDuration / 60).toFixed(1),
        targetDuration: row.targetDuration / 60,
        grade: row.grade,
        status: row.status
      }
    }) as User[]
    userList.value.sort((a, b) => b.totalDuration - a.totalDuration)
  }
  userList.value.forEach((item, index) => {
    if (item.nickname === selfUser.value.nickname) {
      dataList.value.push(index + 1)
    }
  })
  dataList.value.push(0)
}
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
