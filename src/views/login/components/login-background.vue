<template>
  <div class="wrapper">
    <div class="title">
      <img src="/login/block2.png" alt="lec" />
      <span class="white">
        <i>LEC STUDIO</i>
      </span>
      <span class="blue">
        <i>ALL IN ONE</i>
      </span>
    </div>

    <div class="login">
      <img src="/login/block1.png" alt="lec" />
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.wrapper {
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  width: 100vw;
  z-index: -1;

  .title {
    position: relative;
    font-size: 72px;
    font-weight: 900;
    .white {
      position: absolute;
      top: 32px;
      left: 32px;
      color: #fff;
    }
    .blue {
      position: absolute;
      left: 550px;
      top: 32px;
      color: #336add;
    }
  }

  .login {
    position: absolute;
    right: 0;
    top: 0;
    img {
      height: 100vh;
      min-height: 900px;
    }
  }
}
</style>
