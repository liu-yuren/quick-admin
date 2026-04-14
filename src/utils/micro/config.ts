// 全局通信事件
export const microAppGlobalEventKey = {
  reqGlobalData: 'reqGlobalData', // 子应用请求全局数据
  ackGlobalData: 'ackGlobalData', // 主应用响应全局数据
  reqLogout: 'reqLogout', // 请求登出
  reqPermissionData: 'reqPermissionData', // 请求权限数据
}

// 局部通信事件
export const microAppPartialEventKey = {
  RequestStartSip: 'RequestStartSip', // 请求发起 SIP 通话
  RouterChange: 'RouterChange', // 路由变化通知
  SetWinLocationHref: 'SetWinLocationHref', // 页面跳转
}
