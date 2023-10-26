<template>
  <a-layout class="wrapper">
    <a-layout-header class="header">
      <basic-header></basic-header>
    </a-layout-header>

    <div class="main">
      <a-layout-sider class="sider" collapsible breakpoint="xl">
        <basic-sidebar></basic-sidebar>
      </a-layout-sider>

      <a-layout-content class="content">
        <slot></slot>
      </a-layout-content>
    </div>

    <a-layout-footer class="footer"></a-layout-footer>
  </a-layout>
</template>

<script setup lang="ts">
import BasicSidebar from './components/basic-sidebar.vue'
import BasicHeader from './components/basic-header.vue'
</script>

<style scoped lang="scss">
$header-height: 64px;
$header-bottom-gap: 12px;
$footer-height: 14px; // footer后面再加
$footer-top-gap: 40px;
$common-gap: 14px;
.wrapper {
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 0 $common-gap $common-gap $common-gap;

  .header {
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: $header-height;
    display: flex;
    overflow: hidden;
    box-shadow: 1px 1px 6px #aaa;
    z-index: 100;
    background: #fff;
  }

  .main {
    display: flex;
    gap: $common-gap;
    margin-top: calc($header-height + $header-bottom-gap);
    max-height: calc(
      100vh - $header-height - $header-bottom-gap - $footer-height
    );
    /* overflow: hidden; */
    .sider {
      box-shadow: 1px 1px 10px #aaa;
    }

    .content {
      overflow: auto;
      box-shadow: 1px 1px 6px #aaa;
    }
  }

  .footer {
  }
}
</style>
