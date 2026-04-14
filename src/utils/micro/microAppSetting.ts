// 子应用名称常量
export const APP_EQUIPMENT = 'app-equipment'
export const APP_EQUIPMENT_MAIN_ROUTE_NAME = 'appsEquipment'

// 开发环境子应用地址
const config: Record<string, string> = {
  [APP_EQUIPMENT]: 'http://localhost:5173',
}

// 子应用配置列表
export const MICRO_APPS = [
  {
    name: APP_EQUIPMENT, // 子应用唯一标识
    oldMainRoute: 'equipmentManage', // 原主应用路由（用于匹配跳转）
    mainRoute: APP_EQUIPMENT_MAIN_ROUTE_NAME, // 主应用定义的子应用路由名
    entry: config[APP_EQUIPMENT], // 子应用入口地址
    publicPath: '/bmd/equipment', // 生产环境部署路径
    props: {}, // 传递给子应用的额外属性
  },
]

// 生产环境自动拼接域名
if (import.meta.env.MODE === 'production') {
  Object.keys(config).forEach((key) => {
    const microInfo = MICRO_APPS.find(item => item.name === key)
    config[key] = window.location.origin + microInfo?.publicPath
  })
}

export default config
