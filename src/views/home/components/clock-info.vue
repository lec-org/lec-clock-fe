<template>
  <div class="clock-info">
    <h2>
      {{
        data.username ? `🎉 欢迎回来，${data.username}` : '🤯 用户名加载失败'
      }}
    </h2>

    <div class="info-list">
      <div class="weather">
        <template v-for="item in weatherInfoList" :key="item.text">
          <div class="weather-item">
            <div>{{ item.date }}</div>
            <div>{{ item.text }}</div>
            <!-- TODO: 温度、天气及icon映射 -->
          </div>
        </template>
      </div>

      <div class="statistics">
        <template v-for="item in clockInfoDataList" :key="item.key">
          <div class="statistics-item">
            <div class="left">
              <img :src="item.icon" />
            </div>

            <div class="right">
              <div class="title">{{ item.title }}</div>
              <div class="data">
                <span class="current-value">30{{ item.unit }}</span>
                <span class="max-value">
                  /{{ item.maxValue }}{{ item.unit }}
                </span>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { checkoutInfo, getUserInfoService } from '@/services';
import { clockInfoDataList, weatherInfoList } from '../configs'

const data = reactive({
  username: '',
  totalDuration:'',
  targetDuration:''
})
const id = localStorage.getItem('id') || ""
const token = localStorage.getItem("token") || ""
//更新个人信息
onMounted(async()=>{
    const res = await getUserInfoService({id,token})
    const info = res.response?.data
    data.username = info.nickname
    
})


//获取打卡时长
onMounted(async()=>{
    const res = await checkoutInfo({token,id})
    if(res.response?.code===200){
        data.totalDuration = res.response?.data.totalDuration
        data.targetDuration = res.response?.data.targetDuration
    }
})

</script>

<style scoped lang="scss">
.clock-info {
  .info-list {
    height: 120px;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    .weather {
      width: 240px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 12px;

      &-item {
        display: flex;
        gap: 9px;
        font-size: 14px;
        font-weight: 400;
        color: var(--color-neutral-6);
      }
    }

    .statistics {
      flex: 1;
      display: flex;
      justify-content: space-between;

      .statistics-item {
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 12px;

        .left {
        }
        .right {
          display: inline-block;
          .title {
            font-size: 14px;
            color: var(--color-neutral-6);
            margin-bottom: 4px;
          }
          .data {
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: baseline;
            gap: 12px;

            .current-value {
              font-size: 20px;
              font-weight: 600;
            }

            .max-value {
              color: var(--color-neutral-6);
              font-size: 14px;
            }
          }
        }
      }
    }
  }
}
</style>
