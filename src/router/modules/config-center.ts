import component from 'element-plus/es/components/tree-select/src/tree-select-option.mjs'
import Layout from '@/layouts/index.vue'

export const echartsRoutes = [
  {
    path: '/config-center',
    name: 'config-center',
    component: Layout,
    meta: {
      title: '配置中心',
      permissionCode: 'config-center',
    },
    children: [
      {
        path: 'dict-config',
        name: 'dict-config',
        meta: {
          title: '数据字典配置',
          permissionCode: 'dict-config',
          icon: 'menu',
        },
        children: [
          {
            path: 'category',
            name: 'category',
            component: () => import('@/views/config-center/dict-config/category/index.vue'),
            meta: {
              title: '类目管理',
              permissionCode: 'category',
              icon: 'menu',
            },
          },
          {
            path: 'dict',
            name: 'dict',
            component: () => import('@/views/config-center/dict-config/dict/index.vue'),
            meta: {
              title: '数据字典',
              permissionCode: 'dict',
              icon: 'menu',
            },
          },
        ],
      },

    ],
  },
]
