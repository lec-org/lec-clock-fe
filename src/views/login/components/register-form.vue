<template>
  <transition name="register-form">
    <div class="register-form" v-show="isActive">
      <div class="register-form__container">
        <a-form
          class="register-form__content"
          :model="form"
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
              v-model="form.username"
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
              v-model="form.nickname"
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
              v-model="form.password"
              placeholder="输入密码..."
              :max-length="20"
              allow-clear
            />
          </a-form-item>
          <a-form-item
            field="confirmPassword"
            label="确认密码"
            :rules="[
              {
                required: true,
                validator: (value, cb) => {
                  if (!value) {
                    cb('确认密码是必填项')
                  } else if (value.length < 4 || value.length > 20) {
                    cb('密码填写不符合规范')
                  } else if (value !== form.password) {
                    cb('两次密码填写不一致')
                  }
                }
              }
            ]"
          >
            <a-input-password
              v-model="form.confirmPassword"
              placeholder="确认密码..."
              :max-length="20"
              allow-clear
            />
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
import { RegisterInfo } from '../type'

const loginStore = useLoginStore()
const { activeForm } = storeToRefs(loginStore)
const isActive = computed(() => activeForm.value === 'register')

const form: RegisterInfo = reactive({
  username: '',
  nickname: '',
  password: '',
  confirmPassword: ''
})

const handleSubmit = (info: Record<string, any>) => {
  console.log(info)
}
</script>

<style lang="scss">
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
