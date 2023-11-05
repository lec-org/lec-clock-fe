<template>
  <div id="chart" ref="chartRef"></div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import { clockLineChartOption } from '../configs'

const chartRef = ref()
const dataList: Ref<Array<Array<number>>> = ref([
  [10, 10, 20, 40, 100, 0, 10, 2, 101, 20],
  [30, 20]
])

onMounted(() => {
  const echart = echarts.init(chartRef.value)
  // TODO: 获取每日打卡数据 dataList
  // 将数据整合进配置项
  clockLineChartOption.series = clockLineChartOption.series.map(
    (config, index) => {
      return {
        ...config,
        data: dataList.value[index] ?? []
      }
    }
  )
  echart.setOption(clockLineChartOption)
  window.addEventListener('resize', () => {
    echart.resize()
  })
})
</script>

<style scoped lang="scss">
#chart {
  flex: 1;
  height: 300px;
}
</style>
