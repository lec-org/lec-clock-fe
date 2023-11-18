<template>
  <basic-layout hide-right-sidebar>
    <calendar-table></calendar-table>
  </basic-layout>
</template>

<script lang="ts" setup>
import BasicLayout from '@/views/common/layout/basic-layout.vue'
import CalendarTable from './components/calendar-table.vue'
import { request } from '@/services/request'

onMounted(async () => {
  // TODO: zhr的临时接口，后面可以考虑迁移一下
  const data = await request.post(
    '/calendar',
    {},
    { baseURL: 'http://47.108.52.110:8888/' }
  )
  console.log('data', data)
})
</script>
