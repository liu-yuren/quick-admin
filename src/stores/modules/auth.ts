import type { RouteRecordRaw } from 'vue-router'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { getMenuListApi } from '@/api/menu'
import { allAsyncRoutes, staticRoutes } from '@/router'
import arrTransformObj from '@/utils/array'
import { treeToArray } from '@/utils/tree'
// import { arrTransformObj } from '@/utils/array'
// import { treeToArray } from '@/utils/tree'

interface AuthMenuList {
  id: number
  name: string
  path: string
  icon: string
  permissionCode: string
  children?: AuthMenuList[]
}

// 根据常量路由，设置路径键映射
function setKey(routes: any) {
  const pathKeyMap: Record<string, boolean> = {}
  for (let i = 0; i < routes.length; i++) {
    const strippedPath = routes[i].path.replace('/', '')
    const routeKey = strippedPath || '/'
    pathKeyMap[routeKey] = true
    if (routes[i].children && routes[i].children.length > 0)
      setKey(routes[i].children)
  }
  return pathKeyMap
}

// 拉平数组
function flatTree(data: any[]) {
  let result: Array<any> = []

  for (let i = 0; i < data.length; i++) {
    result.push({
      permissionCode: data[i].permissionCode,
      value: true,
    })

    if (data[i].children && data[i].children.length)
      result = result.concat(flatTree(data[i].children))
  }

  return result
}

export const useAuthStore = defineStore('auth', () => {
  const authMenuList = ref<RouteRecordRaw[]>([])
  const permissionMap = ref<Record<string, boolean>>({})

  function filterAsyncRoutes(routes: any) {
    const res = []

    for (let i = 0; i < routes.length; i++) {
      let obj: any = {}
      if (permissionMap.value[routes[i].name] || permissionMap.value[routes[i].meta.permissionCode]) {
        obj = { ...routes[i] }
        if (routes[i].children)
          obj.children = filterAsyncRoutes(routes[i].children)

        res.push(obj)
      }
    }

    return res
  }

  async function generateRoutes() {
    await getMenuListApi().then((res) => {
      // 1. tree数据平铺
      const flatMenu = flatTree(res.data)
      // 2. 转换为map
      const flatPermissionMap = arrTransformObj(flatMenu, 'permissionCode', 'value')

      permissionMap.value = {
        ...flatPermissionMap,
      }

      // 3. 根据权限生成路由
      authMenuList.value = filterAsyncRoutes(allAsyncRoutes)
      console.log(authMenuList.value, '根据权限生成路由-authMenuList.value')
    })
  }

  return { authMenuList, generateRoutes }
})
