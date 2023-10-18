<template>
  <a-layout class="layout-demo" >
    
    <a-layout-sider collapsible breakpoint="xl">
      <div class="logo" />
      <a-menu
        :default-open-keys="['1']"
        :default-selected-keys="['0_5']"
        :style="{ width: '100%' }"
        
      >
        <a-menu-item key="0_1" disabled>
          <IconHome></IconHome>
          工作台
        </a-menu-item>
        <a-menu-item key="0_2">
          <IconCalendar></IconCalendar>
          打卡数据
        </a-menu-item>
        <a-menu-item key="0_3">
          <IconCalendar></IconCalendar>
          待办事项
        </a-menu-item>
        <a-menu-item key="0_4">
          <IconCalendar></IconCalendar>
          资源管理
        </a-menu-item>
        <div>
        <a-menu-item key="0_5" @click="toggleSidebar">
          <IconCalendar></IconCalendar>
          打卡排行
        </a-menu-item>
        
        </div>
      </a-menu>
    
      <!-- trigger -->
     
      <template #trigger="{ collapsed }">
        
        <IconCaretRight v-if="collapsed"></IconCaretRight>
        <IconCaretLeft v-else></IconCaretLeft>
      </template>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="padding-left: 2vw;">
        欢迎回来，{{ name }}
      </a-layout-header >
      <a-layout style="padding: 0 24px;">
       
        <a-layout-content v-if="!expandSidebar"> 
          <div class="flex-container"> 
          <information />
           <clockIn />
          </div>  
          <logout />
        </a-layout-content>
      </a-layout>
    </a-layout>
    <div :style="{ width: expandSidebar ? '75%' : '0', height: expandSidebar ? '100vh' : '0' }" id="sidebar">
      <ranking-view v-if="expandSidebar"/>
    </div>
  </a-layout>
</template>

<script setup lang="ts">
import axios from 'axios';
import { ref, onMounted } from 'vue'
import { Message} from '@arco-design/web-vue';
import {
  IconCaretRight,
  IconCaretLeft,
  IconHome,
  IconCalendar,
} from '@arco-design/web-vue/es/icon';

const isLoggedIn = ref(false);
// 检查 token 是否存在
const checkToken = () => {
  const token = localStorage.getItem('token');
  isLoggedIn.value = !!token;
}
const name = localStorage.getItem('name');
const token = localStorage.getItem('token');
const expandSidebar = ref(false); // 响应式数据，控制右边栏的展开和收起状态

// console.log(token);
// 页面加载时检查 token
onMounted(checkToken);

const startClockIn = async () => {
  
  try {
    const response = await axios.post('http://58.87.105.56:8080/clock/clock', null, {
      headers: {
        token: token,
      },
    });
    console.log(response.data); // 处理响应数据
  } catch (error) {
    console.error(error);
  }
};

const toggleSidebar = async () => {
  expandSidebar.value = !expandSidebar.value;
};
onMounted(() => {
  const sidebar = document.getElementById('sidebar');
  if (sidebar) {
    sidebar.style.width = '0';
    sidebar.style.height = '0';
  }
});
</script>

<style scoped>
#sidebar {
  width: 0;
  height: 0;
  transition: width 0.3s, height 0.3s;  /* 添加过渡效果 */
}
.layout-demo {
  height: 100vh;
  background: var(--color-fill-2);
  border: 1px solid var(--color-border);
}
.layout-demo :deep(.arco-layout-sider) .logo {
  height: 5vh;
  margin: 2vh 1vw;
  background: rgba(255, 255, 255, 0.2);
}
.layout-demo :deep(.arco-layout-sider-light) .logo{
  background: var(--color-fill-2);
}
.layout-demo :deep(.arco-layout-header)  {
  height: 6vh;
  line-height: 6vh;
  background: var(--color-bg-3);
}
.layout-demo :deep(.arco-layout-content) {
  color: var(--color-text-2);
  font-weight: 400;
  font-size: 5%;
  background: var(--color-bg-3);
}
.layout-demo :deep(.arco-layout-content)  {
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  color: var(--color-white);
  font-size: 100%;
  font-stretch: condensed;
  text-align: center;
}
.flex-container {  
  display: flex;  
  justify-content: space-between;  
  margin: 0 1vw;
  border-bottom: 1px solid rgb(204, 204, 204);
} 
</style>