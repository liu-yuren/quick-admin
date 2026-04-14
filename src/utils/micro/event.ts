import microApp from '@micro-zoe/micro-app'

/**
 * 主应用向所有子应用发送全局消息
 */
export function sendGlobalMessageToMainApp(data, callback) {
  return new Promise((resolve, reject) => {
    try {
      if (typeof callback === 'function') {
        microApp.setGlobalData(data, (res) => {
          callback(res)
          resolve(res)
        })
      }
      else {
        microApp.setGlobalData(data, () => {
          resolve(true)
        })
      }
    }
    catch (error) {
      console.error('发送消息失败:', error)
      reject(error)
    }
  })
}

/**
 * 发送特定类型的全局数据
 */
export function globalNotifySubApps(eventType, payload = null, callback = null) {
  if (!payload) {
    payload = {}
  }
  payload.app_id = 'main-app'
  payload.create_time = getCurrentTime()

  const data = { [eventType]: payload }
  return sendGlobalMessageToMainApp(data, callback)
}

/**
 * 向指定子应用发送消息
 */
export function sendMessageToSub(appName, data, callback) {
  return new Promise((resolve, reject) => {
    try {
      if (typeof callback === 'function') {
        microApp.setData(appName, data, (res) => {
          callback(res)
          resolve(res)
        })
      }
      else {
        microApp.setData(appName, data, () => {
          resolve(true)
        })
      }
    }
    catch (error) {
      console.error('发送消息失败:', error)
      reject(error)
    }
  })
}

/**
 * 发送特定类型的消息给指定子应用
 */
export function notifySubApps(appName, eventType, payload = null, callback = null) {
  if (!payload)
    payload = {}
  payload.app_id = 'main-app'
  payload.create_time = getCurrentTime()

  const data = { [eventType]: payload }
  return sendMessageToSub(appName, data, callback)
}
