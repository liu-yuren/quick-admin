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
        },
        children: [
          {
            path: 'user-manage',
            name: 'UserManage',
            meta: {
              title: '用户管理',
              permissionCode: 'user-manage',
            },
          },
          {
            path: 'role-manage',
            name: 'RoleManage',
            meta: {
              title: '角色管理',
              permissionCode: 'role-manage',
            },
          },
          {
            path: 'permissionCode-setting',
            name: 'permissionCodeSetting',
            meta: {
              title: '权限设置',
              permissionCode: 'permissionCode-setting',
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
        },
      },
    ],
  },
]
