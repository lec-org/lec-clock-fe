<template>
    <div id="chart" ref="chartRef"></div>
  </template>
  
  <script setup lang="ts">
  import * as echarts from 'echarts'
  const chartRef = ref()
  import { clockLineChartOption } from '../configs'
  
  onMounted(() => {
    const echart = echarts.init(chartRef.value)
    // TODO: 把数据从配置项中分离出来单独配置
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
  