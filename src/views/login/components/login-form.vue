<<<<<<< HEAD
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
import { userLoginService } from '@/services'
import { Message } from '@arco-design/web-vue'
import router from '@/router'

const loginStore = useLoginStore()
const { activeForm, loginInfo } = storeToRefs(loginStore)
const isActive = computed(() => activeForm.value === 'login')
const {setToken, setId} = loginStore
// 这组件库类型标的有点nt
const handleSubmit = async(info: Record<string, any>) => {
  const res = await userLoginService(info)
  setToken(res.response?.data.token)
//   console.log(res.response?.data.token);
  setId(res.response?.data.userInfoVo.id)
  Message.success('登陆成功')
  router.push('/')
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
=======
<template>
  <div class="login-form" v-show="isActive">
    <div class="login-form__container">
      <a-form
        class="login-form__content"
        :model="loginInfo"
        @submit-success="handleSubmit"
        layout="vertical"
      >
        <a-space class="board" direction="vertical">
          <h2 class="title">欢迎回来</h2>

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

          <a-form-item class="remember-check" field="isRemembered">
            <a-checkbox v-model="isRemembered">记住我</a-checkbox>
          </a-form-item>

          <a-button
            class="login-form__submit"
            type="primary"
            html-type="submit"
          >
            登录
          </a-button>

          <a-space class="register">
            <div>没有账号?</div>
            <a-link @click="checkToRegister">注册一个!</a-link>
          </a-space>
        </a-space>
      </a-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useLoginStore } from '../store/login'
import { userLoginService } from '@/services'
import { Message } from '@arco-design/web-vue'
import router from '@/router'

const loginStore = useLoginStore()
const { activeForm, loginInfo } = storeToRefs(loginStore)
const isActive = computed(() => activeForm.value === 'login')
const isRemembered = ref(false)

const handleSubmit = async (info: Record<string, any>) => {
  const res = await userLoginService(info)
  loginStore.setToken(res.response?.data.token)
  Message.success('登录成功')
  router.push('/home')
}

const checkToRegister = () => {}
</script>

<style lang="scss">
.login-form {
  height: 100%;
  position: absolute;
  top: 0;
  right: 100px;

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
    position: absolute;
    left: 96px;
    width: 420px;
    height: 400px;
    .board {
      min-height: 400px;
      padding: 24px 32px;
      border-radius: 36px;
      background-color: #fff;
      box-shadow: 2px 10px 20px #333e;

      .title {
        text-align: center;
        font-weight: 600;
        margin-bottom: 12px;
      }

      .remember-check {
        /* transform: translateY(-24px); */
        margin-top: -24px;
      }

      .register {
        width: 100%;
        display: flex;
        justify-content: center;
      }
    }
  }

  &__submit {
    width: 100%;
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
>>>>>>> 96096f18bd850164bbda7ebb3dbd496fe0bfa982
