import * as Icons from '@element-plus/icons-vue'

import ElementPlus from 'element-plus'
import { createApp } from 'vue'

import App from './App.vue'
import router from './router'

import store from './stores'
// 样式
import 'element-plus/dist/index.css'
import 'normalize.css/normalize.css'

import '@/styles/index.scss'

const app = createApp(App)

Object.keys(Icons).forEach((key) => {
  app.component(key, Icons[key as keyof typeof Icons])
})

app.use(store)
app.use(router)
app.use(ElementPlus)

app.mount('#app')
