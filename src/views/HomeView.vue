<template>
  <a-space>
    <a-button type="primary" @click="handleClick">Primary</a-button>
    <a-button>Secondary</a-button>
    <a-button type="dashed">Dashed</a-button>
    <a-button type="outline">Outline</a-button>
    <a-button type="text">Text</a-button>
  </a-space>
</template>

<script setup lang="ts">
import { Message } from '@arco-design/web-vue'

const handleClick = () => {
  Message.info('hello world!')
}
</script>

<style></style>
