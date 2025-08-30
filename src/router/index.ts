import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/layouts/index.vue'
import { useAuthStore } from '@/stores/modules/auth'

/**
 * @description 动态导入所有权限路由模块
 * @note 命名规范：模块名 + Routes (例如: systemSettingRoutes)
 * @returns 扁平化的路由数组
 */
const modules = import.meta.glob('./modules/*.ts', { eager: true })
export const allAsyncRoutes = Object.keys(modules).map((path) => {
  const pathArr = path.match(/\.\/modules\/(.*)\.ts/)
  if (pathArr?.length) {
    const module = modules[path] as any
    const routeKeys = Object.keys(module).filter(key => key.endsWith('Routes'))
    if (routeKeys.length > 0) {
      return module[routeKeys[0]]
    }
  }
  return []
}).flat()

/**
 * @description 基础静态路由配置
 * @note 这些路由不需要权限验证，所有用户都可以访问
 */
export const staticRoutes = [
  {
    path: '/',
    component: Layout,
  },
  {
    path: '/login',
    component: () => import('../views/Login.vue'),
  },
]

/**
 * @description 📚 路由参数配置简介
 * @param path ==> 路由菜单访问路径
 * @param name ==> 路由 name (对应页面组件 name, 可用作 KeepAlive 缓存标识 && 按钮权限筛选)
 * @param redirect ==> 路由重定向地址
 * @param component ==> 视图文件路径
 * @param meta ==> 路由菜单元信息
 * @param meta.icon ==> 菜单和面包屑对应的图标
 * @param meta.title ==> 路由标题 (用作 document.title || 菜单的名称)
 * @param meta.activeMenu ==> 当前路由为详情页时，需要高亮的菜单
 * @param meta.isLink ==> 路由外链时填写的访问地址
 * @param meta.isHide ==> 是否在菜单中隐藏 (通常列表详情页需要隐藏)
 * @param meta.isFull ==> 菜单是否全屏 (示例：数据大屏页面)
 * @param meta.isAffix ==> 菜单是否固定在标签页中 (首页通常是固定项)
 * @param meta.isKeepAlive ==> 当前路由是否缓存
 */
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [...staticRoutes],
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  authStore.generateRoutes()
  next()
})

export default router
