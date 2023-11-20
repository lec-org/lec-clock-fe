<template>
  <div class="calendar-wrapper">
    <action-list :data="actionsOfOneDay"></action-list>
    <a-calendar
      v-model="currentDate"
      class="calendar-table"
      @change="handleDateChange"
    >
      <template #default="scope">
        <calendar-cell></calendar-cell>
      </template>
    </a-calendar>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { request } from '@/services/request'
import { ActionDataList, TIME_FORMAT_MODE } from '../types'
import { getBoundaryDayOfOneMonth, formatTime } from '../utils'

const currentDate = ref<Date>(new Date())
// 注意月是从0开始数的
const currentMonth = ref<number>(currentDate.value.getMonth())
const currentYear = ref<number>(currentDate.value.getFullYear())

// TODO: 这是一个mock数据，之后记得换成真实数据
// 本月及相邻两个月的全部活动
const actionsOfThreeMonth = ref<ActionDataList>([
  {
    ContestTime: '2023-11-25T22:35:00+08:00',
    Name: 'CodeTON Round 7 (Div. 1 + Div. 2, Rated, Prizes!)',
    Url: 'https://codeforces.com/contests/1896',
    Type: 'CodeForces'
  },
  {
    ContestTime: '2023-11-24T22:35:00+08:00',
    Name: 'Educational Codeforces Round 158 (Rated for Div. 2)',
    Url: 'https://codeforces.com/contests/1901',
    Type: 'CodeForces'
  },
  {
    ContestTime: '2023-11-20T15:00:00+08:00',
    Name: 'ICPC 2023 Online Challenge powered by Huawei',
    Url: 'https://codeforces.com/contests/1885',
    Type: 'CodeForces'
  }
])
// 某一天的活动列表
const actionsOfOneDay = ref<ActionDataList>([])

// 更新年月
const updateTime = (date: string) => {
  // 不知道为什么arco-vue的双向绑定失效了，这里手动更新一下
  currentDate.value = new Date(date)
  currentMonth.value = currentDate.value.getMonth()
  currentYear.value = currentDate.value.getFullYear()
}

// 更新某一天的活动列表
const updateActionsOfOneDay = () => {
  actionsOfOneDay.value = actionsOfThreeMonth.value.filter((action) => {
    const actionDayTime = formatTime(action.ContestTime, TIME_FORMAT_MODE.day)
    const currentDayTime = formatTime(currentDate.value, TIME_FORMAT_MODE.day)
    return actionDayTime === currentDayTime
  })
}

const handleDateChange = (date: string) => {
  updateTime(date)
  updateActionsOfOneDay()
}

// TODO: zhr的临时接口，目前貌似还没解决跨域问题, 后面可以考虑迁移一下
const getActionData = async (
  beginTime: Date | string,
  endTime: Date | string
) => {
  const data = await request.post(
    '/calendar',
    { beginTime: formatTime(beginTime), endTime: formatTime(endTime) },
    { baseURL: 'http://47.108.52.110:8888/' }
  )
  return data
}

// 更新一个月的活动数据
const updateActionsOfThreeMonth = async () => {
  const [beginTime, endTime] = getBoundaryDayOfOneMonth(
    currentYear.value,
    currentMonth.value
  )
  // 请求一个月内的全部活动
  const data = await getActionData(beginTime, endTime)
  // TODO: 改变最终的数值
  console.log('最终的数值', data)
}

watch(
  () => [currentMonth.value, currentYear.value],
  () => {
    updateActionsOfThreeMonth()
  }
)

onMounted(() => {
  updateActionsOfThreeMonth()
})
</script>

<style lang="scss" scoped>
.calendar-wrapper {
  height: 100%;
  display: flex;
  justify-content: space-between;
  gap: 14px;
  .calendar-table {
    flex: 1;
  }
}
</style>
