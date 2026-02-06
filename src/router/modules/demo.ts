import Layout from '@/layouts/index.vue'

export const demoRoutes = [
  {
    path: '/example',
    name: 'example',
    component: Layout,
    meta: {
      title: '示例',
      permissionCode: 'example',
    },
    children: [
      {
        path: 'form',
        name: 'form',
        meta: {
          title: '表单',
          permissionCode: 'form',
          icon: 'menu',
        },
        children: [
          {
            path: 'basic-form',
            name: 'basic-form',
            component: () => import('@/views/demo/form/basicForm.vue'),
            meta: {
              title: '基本使用',
              permissionCode: 'basic-form',
              icon: 'menu',
            },
          },
          {
            path: 'slots-form',
            name: 'slots-form',
            component: () => import('@/views/demo/form/soltsForm.vue'),
            meta: {
              title: '组件内插槽使用',
              permissionCode: 'slots-form',
              icon: 'menu',
            },
          },
          {
            path: 'events-form',
            name: 'events-form',
            component: () => import('@/views/demo/form/eventsForm.vue'),
            meta: {
              title: '事件使用',
              permissionCode: 'events-form',
              icon: 'menu',
            },
          },
          {
            path: 'tips-form',
            name: 'tips-form',
            component: () => import('@/views/demo/form/tipsForm.vue'),
            meta: {
              title: '提示使用',
              permissionCode: 'tips-form',
              icon: 'menu',
            },
          },
          {
            path: 'search-form',
            name: 'search-form',
            component: () => import('@/views/demo/searchForm.vue'),
            meta: {
              title: '搜索表单',
              permissionCode: 'search-form',
              icon: 'menu',
            },
          },
          {
            path: 'use-form',
            name: 'use-form',
            component: () => import('@/views/demo/form/useForm.vue'),
            meta: {
              title: 'useForm 使用',
              permissionCode: 'useForm',
              icon: 'menu',
            },
          },
        ],
      },
      {
        path: 'table',
        name: 'table',
        meta: {
          title: '表格',
          permissionCode: 'table',
          icon: 'menu',
        },
        children: [
          {
            path: 'basic-table',
            name: 'basic-table',
            component: () => import('@/views/demo/table/index.vue'),
            meta: {
              title: '基本使用',
              permissionCode: 'basic-table',
              icon: 'menu',
            },
          },
        ],
      },
    ],
  },
]
