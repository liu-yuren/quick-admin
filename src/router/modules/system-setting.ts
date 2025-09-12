import Layout from '@/layouts/index.vue'

export const systemSettingRoutes = [
  {
    path: '/system-setting',
    name: 'SystemSetting',
    component: Layout,
    meta: {
      title: '系统设置',
      permissionCode: 'system-setting',
    },
    children: [
      {
        path: 'base-setting',
        name: 'BaseSetting',
        meta: {
          title: '基本设置',
          permissionCode: 'base-setting',
          icon: 'setting',
        },
        children: [
          {
            path: 'user-manage',
            name: 'UserManage',
            component: () => import('@/views/systemSetting/userManage/index.vue'),
            meta: {
              title: '用户管理',
              permissionCode: 'user-manage',
              icon: 'menu',
            },
          },
          {
            path: 'role-manage',
            name: 'RoleManage',
            component: () => import('@/views/systemSetting/roleManage/index.vue'),
            meta: {
              title: '角色管理',
              permissionCode: 'role-manage',
              icon: 'menu',
            },
          },
          {
            path: 'permissionCode-setting',
            name: 'permissionCodeSetting',
            component: () => import('@/views/systemSetting/permission/index.vue'),
            meta: {
              title: '权限设置',
              permissionCode: 'permissionCode-setting',
              icon: 'menu',
            },
          },
        ],
      },
      {
        path: 'log-manage',
        name: 'LogManage',
        meta: {
          title: '日志管理',
          permissionCode: 'log-manage',
          icon: 'menu',
        },
      },
    ],
  },
]
