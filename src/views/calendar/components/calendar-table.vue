<template>
  <div class="calendar-wrapper">
    <card-list></card-list>
    <a-calendar v-model="value" class="calendar-table">
      <!-- <template #default="scope"> </template> -->
    </a-calendar>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const value = ref(new Date('2023-01-01'))
</script>

<style lang="scss" scoped>
.calendar-wrapper {
  height: 100%;
  display: flex;
  justify-content: space-between;
  gap: 14px;
  .calendar-table {
    flex: 1;
  }
}
</style>
