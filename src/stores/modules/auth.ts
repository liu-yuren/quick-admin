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
    result.push({ enName: data[i].enName, value: true })
    if (data[i].children && data[i].children.length)
      result = result.concat(flatTree(data[i].children))
  }
  return result
}

export const useAuthStore = defineStore('auth', () => {
  const authMenuList = ref<AuthMenuList[]>([])
  const flatRole = ref<Record<string, boolean>>({})

  function filterAsyncRoutes(routes: any) {
    const res = []

    for (let i = 0; i < routes.length; i++) {
      let obj: any = {}
      if (flatRole.value[routes[i].name] || flatRole.value[routes[i].meta.permissionCode]) {
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
      console.log(res, 'res')
    })
    // const flatRoutes = treeToArray(allAsyncRoutes)
    // console.warn(flatRoutes, 'flatRoutes ==')
    // authMenuList.value = res.data
    // const flat = treeToArray(res.data)
    // const permissionMap = arrTransformObj(flat, 'permissionCode', 'value')
  }

  return { authMenuList, generateRoutes }
})
