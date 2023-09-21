<template>
  <transition name="login-form">
    <div class="login-form" v-show="isActive">
      <div class="login-form__container">
        <a-form
          class="login-form__content"
          :model="loginInfo"
          @submit-success="handleSubmit"
        >
          <h2 class="login-form__title">lec 打卡系统</h2>
          <a-form-item
            field="username"
            label="用户名"
            :rules="[
              { required: true, message: '用户名是必填项' },
              { minLength: 4, maxLength: 16, message: '用户名至少4位' }
            ]"
          >
            <a-input
              v-model="loginInfo.username"
              placeholder="输入用户名..."
              :max-length="16"
            />
          </a-form-item>
          <a-form-item
            field="password"
            label="密码"
            :rules="[
              { required: true, message: '密码是必填项' },
              { minLength: 6, maxLength: 20, message: '密码至少6位' }
            ]"
          >
            <a-input-password
              v-model="loginInfo.password"
              placeholder="输入密码..."
              :max-length="20"
            />
          </a-form-item>
          <a-button
            class="login-form__submit"
            type="primary"
            html-type="submit"
          >
            登录
          </a-button>
        </a-form>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { useLoginStore } from '../store/login'

const loginStore = useLoginStore()
const { activeForm, loginInfo } = storeToRefs(loginStore)
const isActive = computed(() => activeForm.value === 'login')

// 这组件库类型标的有点nt
const handleSubmit = (info: Record<string, any>) => {
  console.log('success', info)
}
</script>

<style lang="scss">
.login-form {
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;

  &__container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 24px;
    width: 560px;
    height: 100%;
  }

  &__content {
    width: 420px;
  }

  &__title {
    text-align: center;
    margin-bottom: 24px;
  }

  &__submit {
    display: block;
    width: fit-content;
    margin: auto;
  }
}

.login-form-enter-active {
  transition: all 0.6s ease-in-out;
}

.login-form-leave-active {
  transition: all 0.6s ease-in-out;
}

.login-form-enter-from,
.login-form-leave-to {
  transform: translateX(40%);
  opacity: 0;
}
</style>
