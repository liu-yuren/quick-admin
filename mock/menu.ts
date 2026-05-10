import { arrayToTree } from '../src/utils/tree'

const data = [
  // 系统设置模块
  { id: 1, name: '系统设置', permissionCode: 'system-setting', parentId: null },
  { id: 2, name: '基本设置', permissionCode: 'base-setting', parentId: 1 },
  { id: 3, name: '用户管理', permissionCode: 'user-manage', parentId: 2 },
  { id: 15, name: '新增', permissionCode: 'user-manage-add', parentId: 3 },
  { id: 4, name: '角色管理', permissionCode: 'role-manage', parentId: 2 },
  { id: 5, name: '权限设置', permissionCode: 'permissionCode-setting', parentId: 2 },
  { id: 6, name: '日志管理', permissionCode: 'log-manage', parentId: 1 },

  // ECharts模块
  { id: 7, name: 'ECharts', permissionCode: 'echarts', parentId: null },
  { id: 8, name: '柱状图', permissionCode: 'bar', parentId: 7 },
  { id: 9, name: '折线图', permissionCode: 'line', parentId: 7 },
  { id: 10, name: '雷达图', permissionCode: 'radar', parentId: 7 },

  // 配置中心模块
  { id: 11, name: '配置中心', permissionCode: 'config-center', parentId: null },
  { id: 12, name: '数据字典配置', permissionCode: 'dict-config', parentId: 11 },
  { id: 13, name: '类目管理', permissionCode: 'category', parentId: 12 },
  { id: 14, name: '数据字典', permissionCode: 'dict', parentId: 12 },

  // 示例模块
  { id: 16, name: '示例', permissionCode: 'example', parentId: null },
  { id: 17, name: '表单', permissionCode: 'form', parentId: 16 },
  { id: 18, name: '基本使用', permissionCode: 'basic-form', parentId: 16 },
  { id: 19, name: '插槽使用', permissionCode: 'slots-form', parentId: 16 },
  { id: 20, name: '事件使用', permissionCode: 'events-form', parentId: 16 },
  { id: 21, name: '提示使用', permissionCode: 'tips-form', parentId: 16 },
  { id: 23, name: '提示使用', permissionCode: 'use-form', parentId: 16 },
  { id: 22, name: '搜索表单', permissionCode: 'search-form', parentId: 16 },

  { id: 24, name: '表格', permissionCode: 'table', parentId: 16 },
  { id: 25, name: '基本表格', permissionCode: 'basic-table', parentId: 16 },
]
export default {
  url: '/api/menu/list',
  method: 'post',
  response: () => {
    return {
      code: 200,
      message: 'success',
      data: arrayToTree(data),
    }
  },
}
