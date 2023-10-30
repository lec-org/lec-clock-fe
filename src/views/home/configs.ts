import dayjs from 'dayjs'
import * as echarts from 'echarts'

export const clockInfoDataList = [
  {
    title: '本周打卡',
    unit: 'h',
    maxValue: 38,
    icon: '/common/doc.png'
  },
  {
    title: '当前排名',
    unit: '名',
    maxValue: 38,
    icon: '/common/task.png'
  },
  {
    title: '今日截止事项',
    unit: '个',
    maxValue: 10,
    icon: '/common/chat.png'
  }
]

const oneDayTime = 24 * 60 * 60 * 1000
const dateFormatter = (date: Date) => {
  return dayjs(date.getTime()).format('MM/DD')
}

export const weatherInfoList = [
  {
    date: dateFormatter(new Date()),
    text: '今天'
  },
  {
    date: dateFormatter(new Date(new Date().getTime() + oneDayTime)),
    text: '明天'
  },
  {
    date: dateFormatter(new Date(new Date().getTime() + oneDayTime * 2)),
    text: '后天'
  }
]

export const clockLineChartOption = {
  backgroundColor: new echarts.graphic.LinearGradient(
    0,
    0,
    0,
    1,
    [
      {
        offset: 0,
        color: '#c86589'
      },
      {
        offset: 1,
        color: '#06a7ff'
      }
    ],
    false
  ),
  title: {
    text: '每周打卡数据',
    left: 'center',
    bottom: '5%',
    textStyle: {
      color: '#fff',
      fontSize: 16
    }
  },
  grid: {
    top: '20%',
    left: '10%',
    right: '10%',
    bottom: '15%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: Array(16)
      .fill(0)
      .map((_, index) => index + 1),
    axisLabel: {
      margin: 30,
      color: '#ffffff63'
    },
    axisLine: {
      show: false
    },
    axisTick: {
      show: true,
      length: 25,
      lineStyle: {
        color: '#ffffff1f'
      }
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: '#ffffff1f'
      }
    }
  },
  yAxis: [
    {
      type: 'value',
      position: 'right',
      axisLabel: {
        margin: 20,
        color: '#ffffff63'
      },

      axisTick: {
        show: true,
        length: 15,
        lineStyle: {
          color: '#ffffff1f'
        }
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: '#ffffff1f'
        }
      },
      axisLine: {
        lineStyle: {
          color: '#fff',
          width: 2
        }
      }
    }
  ],
  series: [
    {
      name: '打卡时间',
      type: 'line',
      smooth: true, //是否平滑曲线显示
      showAllSymbol: true,
      symbol: 'circle',
      symbolSize: 6,
      lineStyle: {
        normal: {
          color: '#fff' // 线条颜色
        }
      },
      label: {
        show: true,
        position: 'top',
        textStyle: {
          color: '#fff'
        }
      },
      itemStyle: {
        color: 'red',
        borderColor: '#fff',
        borderWidth: 3
      },
      tooltip: {
        show: false
      },
      areaStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(
            0,
            0,
            0,
            1,
            [
              {
                offset: 0,
                color: '#eb64fb'
              },
              {
                offset: 1,
                color: '#3fbbff0d'
              }
            ],
            false
          )
        }
      },
      data: Array(8)
        .fill(0)
        .map((_, index) => index * 10)
    }
  ]
}
