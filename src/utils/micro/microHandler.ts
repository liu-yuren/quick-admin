import microApp from '@micro-zoe/micro-app'
import { MICRO_APPS } from './microAppSetting'

/**
 * 通过 URL 路径判断是否为子应用
 */
export function isSubAppByPath(currentPath = window.location.pathname, basePath = '/apps/') {
  return currentPath.includes(basePath)
}

/**
 * 根据原始路由路径查找子应用信息
 */
export function findAppInfoByOriginalPath(path: string) {
  const findApp = MICRO_APPS.find(app => path?.includes(app.oldMainRoute))

  if (findApp) {
    return {
      isSubApp: true,
      ...findApp,
    }
  }

  return { isSubApp: false }
}

/**
 * 跳转子应用：区分已激活和未激活状态
 */
export async function navigateToSubApp(data = {}) {
  const { router, appName, path, params, callback } = data

  // 获取当前已激活的子应用列表
  const activeApps = microApp.getActiveApps()

  if (activeApps.includes(appName)) {
    // 子应用已激活，通过消息通知子应用切换路由
    await notifySubApps(appName, microAppPartialEventKey.RouterChange, { path, params }, callback)
  }
  else {
    // 子应用未激活，通过主应用路由跳转加载子应用
    const appInfo = getAppInfoByName(appName)
    await router.push({
      name: appInfo.mainRoute,
      query: genAppRouterParams(path, params),
    })
  }
}

/**
 * 子应用已激活时的路由跳转
 */
export function navigateToSubAppInActive(appName: string, path: string) {
  microApp.router.push({ name: appName, path })
}
