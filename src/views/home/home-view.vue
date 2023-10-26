<template>
  <a-button @click="changePunch">{{ punch }}</a-button>
</template>

<script setup lang="ts">
import { userMainStore } from './store/index'
import { userUpCard } from '@/services/index'
const userMain = userMainStore()
const { punch } = storeToRefs(userMain)
const { changePunch } = userMain
</script>

<style scoped lang="scss"></style>
