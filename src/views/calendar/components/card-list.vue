<template>
  <div class="card-list-wrapper">
    <div class="header">
      <div class="time">2023/11/19</div>
      <div class="options">
        <a-button type="primary" size="large">添加自定义活动</a-button>
      </div>
    </div>

    <div class="body">
      <template v-for="card in mockData" :key="card">
        <a-card class="card" title="Arco Card" hoverable>
          <template #extra>
            <a-link>More</a-link>
          </template>
          Card content <br />
          Card content
        </a-card>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
const mockData = ref(Array(10).fill(0))
</script>

<style lang="scss" scoped>
.card-list-wrapper {
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
    }
  }
}
</style>
