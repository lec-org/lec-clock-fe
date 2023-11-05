<template>
  <div class="ranking-list">
    <a-radio-group class="radio-group" type="button">
      <template v-for="grade in rankListGrades" :key="grade.value">
        <a-radio :value="grade.value" @click="handleGradeChange(grade.value)">
          {{ grade.text }}
        </a-radio>
      </template>
      <template #empty>
        <a-empty />
      </template>
    </a-radio-group>

    <a-table :data="listData" :pagination="false" :scroll="{ y: 170 }">
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
import { rankListColumns, rankListGrades } from '../configs'
import { ref } from 'vue'
import { request } from '@/services/request'
import { RankListRow } from '../type'

// TODO: 临时mock数据，类型有一点点问题，调真实数据的时候记得改改
const listData = ref<Array<RankListRow>>([
  {
    rank: 1,
    avatar: '',
    nickname: 'asd',
    currentTime: 1,
    targetTime: 23,
    completionRate: 1 / 23,
    status: 1
  },
  {
    rank: 2,
    avatar: '',
    nickname: 'asd',
    currentTime: 1,
    targetTime: 23,
    completionRate: 1 / 23,
    status: 1
  },
  {
    rank: 3,
    avatar: '',
    nickname: 'asd',
    currentTime: 1,
    targetTime: 23,
    completionRate: 1 / 23,
    status: 1
  },
  {
    rank: 4,
    avatar: '',
    nickname: 'asd',
    currentTime: 1,
    targetTime: 23,
    completionRate: 1 / 23,
    status: 1
  },
  {
    rank: 5,
    avatar: '',
    nickname: 'asd',
    currentTime: 1,
    targetTime: 23,
    completionRate: 1 / 23,
    status: 1
  }
])

const handleGradeChange = async (grade: number | string) => {
  console.log(grade)
  // const res = await request.post('/api/clock/list', {
  //   grade: grade,
  //   pageSize: 40,
  //   pageNum: 1
  // })
  // console.log('grade res', res)
}

// const filteredUsers = watch(users, () => {
//   console.log(users.value)
//   let sortedUsers = users.value

//   sortedUsers.sort((a, b) => b.totalDuration - a.totalDuration)
//   let res: User[] = []
//   if (currentGrade.value === 1 || currentGrade.value === 2) {
//     res = sortedUsers.filter((user) => user.grade === currentGrade.value)
//   } else {
//     res = sortedUsers.filter((user) => user.grade !== 1 && user.grade !== 2)
//   }
//   console.log(res)
// })
</script>

<style scoped>
.ranking-list {
  margin-top: 12px;

  .radio-group {
    margin-bottom: 14px;
  }
}

.status-red {
  background-color: rgba(20, 19, 19, 0.508);
}
</style>
