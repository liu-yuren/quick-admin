import microApp from '@micro-zoe/micro-app'
import { initMicroAppNotify } from '@/utils/micro/event'
import { listenGlobalEvent, listenPartialEvent } from '@/utils/micro/listenEvent'
import { registerMainAppRouter } from '@/utils/micro/microHandler'

// 开启微前端基座
microApp.start({
  'clear-data': true, // 子应用卸载时清除缓存数据
})

// 注册主应用路由，用于控制子应用路由跳转
registerMainAppRouter(router)

// 初始化全局通知方法，挂载到 Vue 原型
initMicroAppNotify(Vue)

// 监听全局消息（来自所有子应用）
listenGlobalEvent()

// 监听局部消息（来自特定子应用）
listenPartialEvent()
