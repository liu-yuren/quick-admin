<script setup lang="ts">
import { Loading } from '@element-plus/icons-vue'
import { onMounted, reactive, toRefs } from 'vue'
import { useRoute } from 'vue-router'
import router from '@/router'
// import { useUserStore } from '@/stores/modules/user'
// import { encryptFn } from '@/utils/cryptoJS'

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
  [key: string]: any
}

const route = useRoute()
// const userStore = useUserStore()

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
  phoneByName: '',
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
  getComfirmCodeLoading,
  isLogin,
} = toRefs(state)

function getComfirmCode() {
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

async function submit() {
  if (inputBlur('name') && inputBlur('password') && inputBlur('confirmCode')) {
    if (state.isLogin)
      return

    state.isLogin = true

    try {
      // await userStore.loginFn({
      //   account: state.name,
      //   // password: encryptFn(state.password),
      //   password: state.password,
      //   smsCode: state.confirmCode,
      // })

      // 登录成功直接跳转到要访问的页面
      await router.push({ path: decodeURIComponent(`${route.query?.redirect || '/'}`) })
    }
    finally {
      state.isLogin = false
    }
  }
}

function nameChange() {
  if (state.phoneByName !== '')
    state.phoneByName = ''
}

function inputFocus(name: string) {
  if (state[`${name}Error`]) {
    state[`${name}Error`] = false

    let str = '验证码'
    switch (name) {
      case 'name':
        str = '账号'
        break
      case 'password':
        str = '密码'
        break
    }
    state[name] = ''
    state[`${name}Placeholder`] = `请输入${str}`
    return false
  }
  else {
    return true
  }
}

function inputBlur(name: string) {
  state.name = state.name.trim()
  state.password = state.password.trim()
  state.confirmCode = state.confirmCode.trim()

  if (state[`${name}`] === '') {
    state[`${name}Error`] = true

    let str = '验证码'
    switch (name) {
      case 'name':
        str = '账号'
        break
      case 'password':
        str = '密码'
        break
    }
    state[name] = ''
    state[`${name}Placeholder`] = `请输入正确的${str}`
    return false
  }
  else {
    return true
  }
}
</script>

<template>
  <div class="login">
    <div class="login-form">
      <p class="title">
        账号登录
      </p>
      <div class="box">
        <input
          v-model="name"
          type="text"
          :class="[nameError ? 'error' : '']"
          :placeholder="namePlaceholder"

          @focus="inputFocus('name')"
          @blur="inputBlur('name')"
          @input="nameChange()"
          @keyup.enter="submit"
        >
      </div>
      <div class="box">
        <input
          v-model="password"
          type="password"
          :class="[passwordError ? 'error' : '']"
          :placeholder="passwordPlaceholder"
          value
          @focus="inputFocus('password')"
          @blur="inputBlur('password')"
          @keyup.enter="submit"
        >
      </div>
      <div class="box confirm-input">
        <input
          v-model="confirmCode"
          type="text"
          :class="[confirmCodeError ? 'error' : '']"
          :placeholder="confirmPlaceholder"
          @focus="inputFocus('confirmCode')"
          @blur="inputBlur('confirmCode')"
          @keyup.enter="submit"
        >
        <a v-show="!timerShow" href="javascript:" @click="getComfirmCode">
          <el-icon v-if="getComfirmCodeLoading"><Loading /></el-icon>
          获取验证码
        </a>
        <span v-show="timerShow">{{ timerText }}</span>
      </div>
      <a href="javascript:" class="submit-btn" @click="submit">
        <el-icon v-if="isLogin" style="vertical-align: -0.15em;animation: rotating 2s linear infinite;"><Loading /></el-icon>
        登录
      </a>
    </div>
    <div class="wave-before" />
    <div class="wave-after" />
  </div>
</template>

<style lang="scss" scoped>
// @import '@/styles/common.scss';

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
    width: 320px;
    height: 320px;
    padding: 40px 73px;
    background: rgba(251, 254, 255, 0.74);
    border: 1px solid rgba(241, 241, 241, 1);
    transform: translate(-50%, 0);

    .title {
      position: relative;
      height: 28px;
      font-size: 20px;
      font-family:
        PingFangSC-Medium,
        PingFang SC;
      font-weight: 500;
      color: rgba(52, 46, 44, 1);
      line-height: 28px;
      margin: 0 0 27px;

      &::before {
        position: absolute;
        bottom: -3px;
        content: ' ';
        width: 80px;
        height: 4px;
        background: rgba(255, 191, 19, 1);
        border-radius: 2px;
      }
    }

    .box {
      margin: 20px 0 0;

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
        a {
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
        }

        a {
          display: block;
          margin: 0 20px 0 0;
          width: 100px;
          color: rgba(247, 178, 0, 1);
        }

        span {
          width: 100px;
          margin: 0 20px 0 0;
        }

        &.error {
          border: 1px solid rgba(255, 191, 19, 1);

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
          border: 1px solid rgba(255, 191, 19, 1);

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
      background: rgba(52, 46, 44, 1);
      border-radius: 5px;
      font-size: 16px;
      line-height: 45px;
      color: fff;
      text-align: center;
    }
  }
}
</style>
