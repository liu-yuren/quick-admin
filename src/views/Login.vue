<script setup lang="ts">
import { computed, reactive, toRefs } from 'vue'
// import { useRoute } from 'vue-router'
// import router from '@/router'

type LoginTab = 'account' | 'phone'

interface IState {
  name: string
  namePlaceholder: string
  nameError: boolean
  password: string
  passwordPlaceholder: string
  passwordError: boolean
  confirmCode: string
  confirmPlaceholder: string
  confirmCodeError: boolean
  timerText: string
  timerShow: boolean
  getComfirmCodeLoading: boolean
  isLogin: boolean
  activeTab: LoginTab
  [key: string]: any
}

// const route = useRoute()

const state = reactive<IState>({
  name: '',
  nameError: false,
  namePlaceholder: '请输入账号',
  password: '',
  passwordError: false,
  passwordPlaceholder: '请输入密码',
  confirmCode: '',
  confirmCodeError: false,
  confirmPlaceholder: '请输入验证码',
  timerShow: false,
  timerText: '',
  getComfirmCodeLoading: false,
  isLogin: false,
  activeTab: 'account',
})

const {
  name,
  namePlaceholder,
  nameError,
  password,
  passwordPlaceholder,
  passwordError,
  confirmCode,
  confirmPlaceholder,
  confirmCodeError,
  timerText,
  timerShow,
  isLogin,
  activeTab,
} = toRefs(state)

const isAccountMode = computed(() => state.activeTab === 'account')

function getFieldLabel(fieldName: 'name' | 'password' | 'confirmCode') {
  if (fieldName === 'name')
    return state.activeTab === 'phone' ? '手机号' : '账号'
  if (fieldName === 'password')
    return '密码'
  return '验证码'
}

function requestVerificationCode() {
  state.timerShow = !state.timerShow
  let count = 60
  state.timerText = `${count}S后可重发`
  const timer = setInterval(() => {
    count--
    if (count === 0) {
      state.timerShow = !state.timerShow
      clearInterval(timer)
    }
    else {
      state.timerText = `${count}S后可重发`
    }
  }, 1000)
}

async function handleSubmit() {
  const validName = handleInputBlur('name')
  const validPassword = isAccountMode.value ? handleInputBlur('password') : true
  const validCode = isAccountMode.value ? true : handleInputBlur('confirmCode')
  if (validName && validPassword && validCode) {
    if (state.isLogin)
      return

    state.isLogin = true
    try {
      setTimeout(() => {
        state.isLogin = false
        // window.location.href = decodeURIComponent(`${route.query?.redirect || '/'}`)
        window.location.href = '/'
      }, 1000)
    }
    finally {
      // state.isLogin = false
    }
  }
}

function handleNameInput() {
  // 占位：根据账号联动手机号等
}

function handleInputFocus(fieldName: 'name' | 'password' | 'confirmCode') {
  if (state[`${fieldName}Error`]) {
    state[`${fieldName}Error`] = false

    const label = getFieldLabel(fieldName)
    state[fieldName] = ''
    state[`${fieldName}Placeholder`] = `请输入${label}`
    return false
  }
  else {
    return true
  }
}

function handleInputBlur(fieldName: 'name' | 'password' | 'confirmCode') {
  state[fieldName] = String(state[fieldName]).trim()

  if (state[`${fieldName}`] === '') {
    state[`${fieldName}Error`] = true

    const label = getFieldLabel(fieldName)
    state[fieldName] = ''
    state[`${fieldName}Placeholder`] = `请输入正确的${label}`
    return false
  }
  else {
    return true
  }
}

function switchTab(tab: LoginTab) {
  if (state.activeTab === tab)
    return
  state.activeTab = tab
  // reset fields and errors when switching
  state.name = ''
  state.password = ''
  state.confirmCode = ''
  state.nameError = false
  state.passwordError = false
  state.confirmCodeError = false
  state.namePlaceholder = tab === 'phone' ? '请输入手机号' : '请输入账号'
  state.passwordPlaceholder = '请输入密码'
  state.confirmPlaceholder = '请输入验证码'
}
</script>

<template>
  <div class="login">
    <div class="login-form">
      <div class="tabs">
        <button
          type="button"
          class="tab"
          :class="{ active: activeTab === 'account' }"
          @click="switchTab('account')"
        >
          账号登录
        </button>
        <button
          type="button"
          class="tab"
          :class="{ active: activeTab === 'phone' }"
          @click="switchTab('phone')"
        >
          手机号登录
        </button>
      </div>
      <div class="box with-label">
        <input
          v-model="name"
          :type="activeTab === 'phone' ? 'tel' : 'text'"
          :class="[nameError ? 'error' : '']"
          :placeholder="namePlaceholder"
          :autocomplete="activeTab === 'phone' ? 'tel' : 'username'"
          @focus="handleInputFocus('name')"
          @blur="handleInputBlur('name')"
          @input="handleNameInput()"
          @keyup.enter="handleSubmit"
        >
      </div>
      <div v-if="activeTab === 'account'" class="box with-label">
        <input
          v-model="password"
          type="password"
          :class="[passwordError ? 'error' : '']"
          :placeholder="passwordPlaceholder"
          autocomplete="new-password"
          @focus="handleInputFocus('password')"
          @blur="handleInputBlur('password')"
          @keyup.enter="handleSubmit"
        >
      </div>
      <div v-if="activeTab === 'phone'" class="box confirm-input with-label">
        <input
          v-model="confirmCode"
          type="text"
          :class="[confirmCodeError ? 'error' : '']"
          :placeholder="confirmPlaceholder"
          autocomplete="one-time-code"
          @focus="handleInputFocus('confirmCode')"
          @blur="handleInputBlur('confirmCode')"
          @keyup.enter="handleSubmit"
        >
        <button v-show="!timerShow" type="button" class="code-action" @click="requestVerificationCode">
          获取验证码
        </button>
        <span v-show="timerShow">{{ timerText }}</span>
      </div>
      <button type="button" class="submit-btn" :disabled="isLogin" @click="handleSubmit">
        <span v-if="isLogin" class="spinner" aria-hidden="true" />
        <span>{{ isLogin ? '登录中...' : '登录' }}</span>
      </button>
    </div>
    <div class="wave-before" />
    <div class="wave-after" />
  </div>
</template>

<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100%;
  min-height: 700px;
  position: relative;
  background: rgba(255, 255, 255, 1);
  overflow: hidden;

  .login-form {
    position: absolute;
    z-index: 4;
    left: 50%;
    top: 20%;
    box-sizing: content-box;
    width: auto;
    height: auto;
    padding: 40px 73px;
    background: rgba(251, 254, 255, 0.74);
    border: 1px solid rgba(241, 241, 241, 1);
    transform: translate(-50%, 0);

    .tabs {
      display: flex;
      gap: 40px;
      align-items: center;
      margin: 0 0 27px;

      .tab {
        position: relative;
        height: 28px;
        font-size: 20px;
        font-family:
          PingFangSC-Medium,
          PingFang SC;
        font-weight: 500;
        color: rgba(180, 180, 180, 1);
        line-height: 28px;
        background: transparent;
        border: none;
        padding: 0;
        cursor: pointer;
        outline: none;
        transition: color 200ms ease;

        &::before {
          position: absolute;
          bottom: -3px;
          content: ' ';
          width: 40px;
          height: 4px;
          background: rgba(36, 80, 216, 1);
          border-radius: 2px;
          left: 50%;
          transform: translateX(-50%) scaleX(0);
          transform-origin: center;
          transition: transform 220ms ease;
        }
      }

      .tab.active {
        color: rgba(52, 46, 44, 1);

        &::before {
          transform: translateX(-50%) scaleX(1);
        }
      }
    }

    .box {
      margin: 20px 0 0;

      &.with-label {
        position: relative;
      }

      .field-label {
        position: absolute;
        left: 0;
        top: 10px;
        width: 60px;
        text-align: right;
        color: rgba(52, 46, 44, 1);
        font-size: 16px;
      }

      .error-text {
        margin: 6px 0 0 0;
        color: #fb5854;
        font-size: 14px;
      }

      &.confirm-input {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        background: rgba(249, 249, 249, 1);
        input {
          display: block;
          width: 150px;
        }

        span,
        .code-action {
          display: block;
          height: 43px;
          font-family:
            PingFangSC-Regular,
            PingFang SC;
          font-weight: 400;
          font-size: 16px;
          line-height: 43px;
          color: rgba(208, 208, 208, 1);
          text-align: center;
          text-decoration: none;
        }

        .code-action {
          display: block;
          margin: 0 20px 0 0;
          width: 100px;
          color: rgba(36, 80, 216, 1);
          text-decoration: none;
          background: transparent;
          border: none;
          cursor: pointer;
          padding: 0;
        }

        span {
          width: 100px;
          margin: 0 20px 0 0;
        }

        &.error {
          border: 1px solid #fb5854;

          input {
            &::-webkit-input-placeholder {
              color: #fb5854;
            }

            &::-moz-placeholder {
              color: #fb5854;
            }

            &:-moz-placeholder {
              color: #fb5854;
            }

            &::-ms-input-placeholder {
              color: #fb5854;
            }
          }
        }
      }

      input {
        width: 278px;
        height: 43px;
        padding: 0px 20px;
        background: rgba(249, 249, 249, 1);
        border: 1px solid rgba(249, 249, 249, 1);
        border-radius: 5px;
        font-size: 16px;
        font-family:
          PingFangSC-Regular,
          PingFang SC;
        font-weight: 400;
        color: rgba(52, 46, 44, 1);
        line-height: 22px;
        outline: none;

        &.error {
          border: 1px solid #fb5854;

          &::-webkit-input-placeholder {
            color: #fb5854;
          }

          &::-moz-placeholder {
            color: #fb5854;
          }

          &:-moz-placeholder {
            color: #fb5854;
          }

          &::-ms-input-placeholder {
            color: #fb5854;
          }
        }
      }
    }

    .submit-btn {
      display: block;
      width: 320px;
      height: 45px;
      margin: 30px 0 0;
      background: rgba(36, 80, 216, 1);
      border-radius: 5px;
      font-size: 16px;
      line-height: 45px;
      color: #fff;
      text-align: center;
      text-decoration: none;
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;

      &:disabled {
        opacity: 0.8;
        cursor: not-allowed;
      }
    }
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.spinner {
  width: 18px;
  height: 18px;
  border: 2px solid rgba(255, 255, 255, 0.6);
  border-top-color: #ffffff;
  border-radius: 50%;
  display: inline-block;
  animation: spin 0.8s linear infinite;
}
</style>
