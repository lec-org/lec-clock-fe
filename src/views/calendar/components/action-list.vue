<template>
  <div class="action-list-wrapper">
    <div class="header">
      <div class="time">2023/11/19</div>
      <div class="options">
        <a-button type="primary" size="large">添加自定义活动</a-button>
      </div>
    </div>

    <div class="body">
      <template v-if="props.data?.length">
        <template v-for="item in props.data" :key="item.name">
          <a-card class="card" title="Arco Card" hoverable>
            <template #title>
              <h5>{{ item.Type }}</h5>
            </template>
            <template #extra>
              <a-link>查看详情</a-link>
            </template>
            <template #default>
              {{ item }}
            </template>
          </a-card>
        </template>
      </template>
      <template v-else>
        <a-empty class="card empty"></a-empty>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ActionDataList } from '../types'
const props = defineProps<{
  data: ActionDataList
}>()
</script>

<style lang="scss" scoped>
.action-list-wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;

  .header {
    height: 80px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .time {
      font-size: 24px;
      font-weight: 500;
    }
  }

  .body {
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    gap: 12px;
    .card {
      width: 360px;
      flex-shrink: 0;
      height: 200px;
      cursor: pointer;

      &.empty {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
      }
    }
  }
}
</style>
../types
