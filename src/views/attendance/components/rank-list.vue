<template>
  <div class="ranking-list">
    <a-radio-group class="radio-group" type="button">
      <template v-for="grade in rankListGrades" :key="grade.value">
        <a-radio :value="grade.value" @click="handleGradeChange(grade.value)">
          {{ grade.text }}
        </a-radio>
      </template>
    </a-radio-group>

    <a-table :data="listData">
      <template #columns>
        <template v-for="col in rankListColumns" :key="col.dataIndex">
          <a-table-column :title="col.title" :data-index="col.dataIndex">
            <template #cell="{ record }" v-if="col.render">
              <div v-html="col.render?.(record)"></div>
            </template>
          </a-table-column>
        </template>
      </template>
    </a-table>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, watch } from 'vue'
import axios from 'axios'
import { checkoutList } from '@/services'
interface User {
  avatar: string
  nickname: string
  totalDuration: number
  targetDuration: number
  grade: number
  status: number
}
const currentGrade = ref(1)
const users = ref<User[]>([])

watch(currentGrade, async (newGrade) => {
  try {
    const response = await checkoutList({
      grade: newGrade,
      pageSize: 40,
      pageNum: 1
    })

    const responseData = response.response
    console.log('responseData:', responseData) // 调试语句
    if (
      responseData?.code === 200 &&
      responseData.data &&
      responseData.data.rows
    ) {
      users.value = responseData.data.rows.map((row: any) => {
        return {
          avatar: row.avatar,
          nickname: row.nickname,
          totalDuration: (row.totalDuration / 60).toFixed(1),
          targetDuration: row.targetDuration / 60,
          grade: row.grade,
          status: row.status
        }
      }) as User[]
      console.log(users.value)
    } else {
      users.value = []
    }
  } catch (error) {
    // 处理错误
    console.error(error)
  }
})

const filteredUsers = watch(users, () => {
  console.log(users.value)
  let sortedUsers = users.value

  sortedUsers.sort((a, b) => b.totalDuration - a.totalDuration)
  let res: User[] = []
  if (currentGrade.value === 1 || currentGrade.value === 2) {
    res = sortedUsers.filter((user) => user.grade === currentGrade.value)
  } else {
    res = sortedUsers.filter((user) => user.grade !== 1 && user.grade !== 2)
  }
  console.log(res)
})
</script>

<style scoped>
body {
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  background-attachment: fixed;
}
.ranking-list {
  margin-top: 2em;
  display: flex;
  flex-direction: column;
}

.nav-bar {
  display: flex;
  justify-content: center;
  margin-bottom: 2em;
}

.nav-item {
  color: gray;
  font-weight: bolder;
  cursor: pointer;
  padding: 1em 2.5em;
  border: 1px solid gray;
  border-radius: 8%;
  margin-right: 1vw;
}

.nav-item.active {
  font-weight: bolder;
  background-color: #343642;
  color: white;
}

.table-header {
  width: 80vw;
  margin: auto;
  border-radius: 3px;
  display: flex;
  background-color: rgb(56, 59, 76); /* 分割行的颜色 */
  font-weight: bold;
  color: #ffffff; /* 分割行的颜色 */
}

.table-cell {
  position: relative;
  /* margin-left: 1vw; */
  flex: 1;
  padding: 1em;
}
.table2-cell {
  position: relative;
  margin-left: 4vw;
  flex: 1;
  padding: 1em;
}
.table3-cell {
  position: relative;
  margin-left: 2vw;
  flex: 1;
  padding: 1em;
}

.ranking-item {
  border-radius: 1%;
  background-color: #d7e2e8;
  width: 80vw;
  font-size: 120%;
  height: 6em;
  display: flex;
  margin: 1vh auto; /* 上下间隔为 1vh，左右间隔保持不变 */
  align-items: center;
}

.avatar {
  margin-left: 2%;
  width: 3em;
  height: 3em;
  border-radius: 50%;
  margin-right: 1em;
}

.nickname {
  font-weight: bold;
}

.duration {
  font-size: 1em;
  color: gray;
}
.status-circle {
  width: 3vh;
  height: 3vh;
  border-radius: 50%;
}

.status-green {
  background-color: green;
}

.status-red {
  background-color: rgba(20, 19, 19, 0.508);
}
</style>
