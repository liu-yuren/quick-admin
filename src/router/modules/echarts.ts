import { Menu } from '@element-plus/icons-vue'
import Layout from '@/layouts/index.vue'

export const echartsRoutes = [
  {
    path: '/echarts',
    name: 'echarts',
    component: Layout,
    meta: {
      title: 'ECharts',
      permissionCode: 'echarts',
    },
    children: [
      {
        path: 'bar',
        name: 'bar',
        meta: {
          title: '柱状图',
          permissionCode: 'bar',
          icon: Menu,
        },
      },
      {
        path: 'line',
        name: 'line',
        meta: {
          title: '折线图',
          permissionCode: 'line',
          icon: Menu,
        },
      },
      {
        path: 'radar',
        name: 'radar',
        meta: {
          title: '雷达图',
          permissionCode: 'radar',
          icon: Menu,
        },
      },
    ],
  },
]
