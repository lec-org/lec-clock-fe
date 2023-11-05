<template>
  <div class="clock-info">
    <h2>
      {{
        selfUser.nickname ? `🎉 欢迎回来，${selfUser.nickname}` : '🤯 用户名加载失败'
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
        <template v-for="(item,index) in clockInfoDataList" :key="item.key">
          <div class="statistics-item">
            <div class="left">
              <img :src="item.icon" />
            </div>

            <div class="right">
              <div class="title">{{ item.title }}</div>
              <div class="data">
                <span class="current-value">{{dataList[index]}} {{ item.unit }}</span>
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
import { checkoutInfo, checkoutList, getUserInfoService } from '@/services';
import { clockInfoDataList, weatherInfoList } from '../configs'
import { User } from '../type/index'
import { userMainStore } from '../store'
import { Message } from '@arco-design/web-vue';

const userMain = userMainStore()
const { userList,selfUser,dataList } = storeToRefs(userMain)

const id = localStorage.getItem('id') || ""
const token = localStorage.getItem("token") || ""
//更新个人信息
onMounted(async()=>{
    try{
        const res = await getUserInfoService({id,token})
        const info = res.response?.data
        if(info){
            selfUser.value.nickname = info.nickname
            selfUser.value.grade = info.grade
            getCardList()
        }else{
            Message.error("获取用户信息失败")
        }
    }catch(error){
        console.error()
    }
})


//获取打卡时长
onMounted(async()=>{
    const res = await checkoutInfo({token,id})
    if(res.response?.code===200){
        selfUser.value.totalDuration = res.response?.data.totalDuration
        selfUser.value.targetDuration = res.response?.data.targetDuration
        dataList.value.push(Math.floor(selfUser.value.totalDuration/60))
    }
})

//获取打卡排名
const getCardList = async()=>{
    const response = await checkoutList({
      grade: selfUser.value.grade as number,
      pageSize: 40,
      pageNum: 1
    })
    const responseData = response.response
    console.log('responseData',responseData);
    
    if(responseData?.code===200){
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
    userList.value.forEach((item,index)=>{
        if(item.nickname===selfUser.value.nickname){
            dataList.value.push(index+1)
        }
    })
    dataList.value.push(0)
}

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
