<template>
  <div class="go" @click="startClockIn">
    <template v-if="!isClocking">
      <div class="text">开始打卡</div>
    </template>
    <template v-else>
      <div class="text">
        <div class="main">结束打卡</div>
        <div class="time">
          {{ dayjs.unix(clockingTime).format('HH:mm:ss') }}
        </div>
      </div>
    </template>
    <div class="L_">
      <div class="l_"></div>
      <div class="l_"></div>
      <div class="l_"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { request } from '@/services/request'
import { Message } from '@arco-design/web-vue'
import { ref, onMounted } from 'vue'
import dayjs from 'dayjs'

// 时区偏差修正
const timeZoneOffset = -8 * 1000 * 60 * 60
// TODO: 查询当前打卡状态
const isClocking = ref(false)
const isLoggedIn = ref(false)
const clockingTime = ref(timeZoneOffset)
/** 计时器单例 */
const singleInterval = ref<number>()

const token = localStorage.getItem('token')
const checkToken = () => {
  const token = localStorage.getItem('token')
  isLoggedIn.value = !!token
}

const startClockIn = async () => {
  try {
    const response = await request.post('/api/clock/clock', null, {
      headers: {
        token: token
      }
    })
    isClocking.value = !isClocking.value
    console.log(response.data) // 处理响应数据
    if (!singleInterval.value) {
      Message.success('开始打卡')
      singleInterval.value = setInterval(() => {
        clockingTime.value++
      }, 1000)
    } else {
      Message.success('结束打卡')
      clearInterval(singleInterval.value)
      singleInterval.value = 0
      clockingTime.value = timeZoneOffset
    }
  } catch (error) {
    Message.error('未知错误')
    console.error(error)
  }
}

onMounted(checkToken)
</script>

<style scoped lang="scss">
.go {
  width: 18em;
  height: 18em;
  min-width: 18em;
  min-height: 18em;
  position: relative;
  display: flex;
  cursor: pointer;

  .text {
    position: absolute;
    width: 100%;
    left: 50%;
    top: 50%;
    text-align: center;
    transform: translate(-50%, -50%);
    font-size: 36px;
    color: #336add;
    font-weight: bolder;

    .time {
      font-size: 16px;
    }
  }
}

/* .go::after {
  content: '';
  position: absolute;
  display: block;
  height: 50%;
  width: 50%;
} */

.L_ {
  position: absolute;
  width: 18em;
  height: 18em;
  border-radius: 50%;
  top: 0px;
}

.l_ {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

.l_:nth-of-type(1) {
  border-bottom: 6px solid #eba4d2;
  transform: rotatex(35deg) rotatey(-45deg);
  animation: one 3s linear infinite;
}

.l_:nth-of-type(2) {
  border-right: 6px solid #6aaff2;
  transform: rotatex(50deg) rotatey(10deg);
  animation: two 3s linear infinite;
}

.l_:nth-of-type(3) {
  border-top: 6px solid #cc54d0;
  transform: rotatex(35deg) rotatey(55deg);
  animation: three 3s linear infinite;
}

@keyframes one {
  to {
    transform: rotatex(35deg) rotatey(-45deg) rotatez(360deg);
  }
}

@keyframes two {
  to {
    transform: rotatex(50deg) rotatey(10deg) rotatez(360deg);
  }
}

@keyframes three {
  to {
    transform: rotatex(35deg) rotatey(55deg) rotatez(360deg);
  }
}
</style>
