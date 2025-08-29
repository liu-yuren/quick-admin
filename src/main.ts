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

app.use(store)
app.use(router)
app.use(ElementPlus)

app.mount('#app')
