<template>
  <transition name="register-form">
    <div class="register-form" v-show="isActive">
      <div class="register-form__container">
        <a-form
          class="register-form__content"
          :model="registerInfo"
          @submit-success="handleSubmit"
        >
          <h2 class="register-form__title">用户注册</h2>
          <a-form-item
            field="username"
            label="用户名"
            :rules="[
              { required: true, message: '用户名是必填项' },
              { minLength: 4, maxLength: 16, message: '用户名应在4-16位' }
            ]"
          >
            <a-input
              v-model="registerInfo.username"
              placeholder="输入用户名..."
              :max-length="16"
            />
          </a-form-item>
          <a-form-item
            field="nickname"
            label="昵称"
            :rules="[{ required: true, message: '昵称是必填项' }]"
          >
            <a-input
              v-model="registerInfo.nickname"
              placeholder="输入昵称..."
              :max-length="8"
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
              v-model="registerInfo.password"
              placeholder="输入密码..."
              :max-length="20"
              allow-clear
            />
          </a-form-item>
          <a-form-item
            field="grade"
            label="年级"
            :rules="[{ required: true, message: '年级是必填项' }]"
          >
            <a-select placeholder="please select" v-model="registerInfo.grade">
              <a-option :value="1">大一萌新</a-option>
              <a-option :value="2">大二老东西</a-option>
            </a-select>
          </a-form-item>
          <a-form-item
            field="email"
            label="邮箱"
            :rules="[
              { required: true, message: '邮箱是必填项' },
              { type: 'email', message: '邮箱格式不正确' }
            ]"
          >
            <a-input
              placeholder="邮箱是必填项"
              v-model="registerInfo.email"
            ></a-input>
            <a-button type="primary" shape="round" @click="sendEmail"
              >发送验证码</a-button
            >
          </a-form-item>
          <a-form-item
            field="code"
            label="验证码"
            :rules="[{ required: true, message: '验证码是必填项' }]"
          >
            <a-input 
            placeholder="请输入邮箱验证码" 
            v-model="registerInfo.code"
            ></a-input>
          </a-form-item>
          <a-button
            class="register-form__submit"
            type="primary"
            html-type="submit"
          >
            注册
          </a-button>
        </a-form>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { useLoginStore } from '../store/login'
import { userRegisterService, userCodeService } from '@/services'
import { Message } from '@arco-design/web-vue'
import router from '@/router'
const loginStore = useLoginStore()
const { activeForm, registerInfo } = storeToRefs(loginStore)
const isActive = computed(() => activeForm.value === 'register')

const handleSubmit = async (info: Record<string, any>) => {
  await userRegisterService(info)
  
  Message.success('注册成功')
  router.push('/')
}

const sendEmail = async () => {
  const { email } = unref(registerInfo)

  await userCodeService(email)
//   console.log(res)
}
</script>
<style>
.register-form {
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;

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

.register-form-enter-active {
  transition: all 0.6s ease-in-out;
}

.register-form-leave-active {
  transition: all 0.6s ease-in-out;
}

.register-form-enter-from,
.register-form-leave-to {
  transform: translateX(-40%);
  opacity: 0;
}
</style>


