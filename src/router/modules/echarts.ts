import Layout from '@/layouts/index.vue'

export const echartsRoutes = [
  {
    path: '/echarts',
    name: 'echarts',
    component: Layout,
    meta: {
      title: 'bi可视化',
      permissionCode: 'echarts',
    },
    children: [
      {
        path: 'bar',
        name: 'bar',
        meta: {
          title: '柱状图',
          permissionCode: 'bar',
          icon: 'menu',
        },
      },
      {
        path: 'line',
        name: 'line',
        meta: {
          title: '折线图',
          permissionCode: 'line',
          icon: 'menu',
        },
      },
      {
        path: 'radar',
        name: 'radar',
        meta: {
          title: '雷达图',
          permissionCode: 'radar',
          icon: 'menu',
        },
      },
    ],
  },
]
