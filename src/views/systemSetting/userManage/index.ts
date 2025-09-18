import type { FormOptions } from '@/components/Form'
import type { TableColumnProps, TableHandleBtnList } from '@/components/Table/types'

export const formOptions: FormOptions = {
  showCollapse: true,
  defaultShowCount: 3,
  animationDuration: 300,
  formProps: { size: 'default', labelWidth: 'auto' } as any,
  formFields: [
    {
      component: 'el-input',
      componentProps: {
        placeholder: '请输入用户名',
      },
      formItemProps: {
        label: '用户名',
        prop: 'username',
        rules: [{ required: true }],
      },
      colProps: { span: 6 },
    },
    {
      component: 'el-input',
      componentProps: {
        placeholder: '请输入邮箱',
      },
      formItemProps: {
        label: '邮箱',
        prop: 'email',
      },
      colProps: { span: 6 },
    },
    {
      component: 'el-select',
      componentProps: {
        placeholder: '请选择状态',
        clearable: true,
      },
      formItemProps: {
        label: '状态',
        prop: 'status',
      },
      colProps: { span: 6 },
    },
    {
      component: 'el-input',
      componentProps: {
        placeholder: '请输入手机号',
      },
      formItemProps: {
        label: '手机号',
        prop: 'phone',
      },
      colProps: { span: 6 },
    },
    {
      component: 'el-date-picker',
      componentProps: {
        'type': 'daterange',
        'range-separator': '至',
        'start-placeholder': '开始日期',
        'end-placeholder': '结束日期',
        'format': 'YYYY-MM-DD',
        'value-format': 'YYYY-MM-DD',
      },
      formItemProps: {
        label: '创建时间',
        prop: 'createTime',
      },
      colProps: { span: 12 },
    },
  ],
}

export const tableHeaderBtns: TableHandleBtnList[] = [
  { label: '新增', key: 'add', permission: true, btnProps: { type: 'primary' } },
  { label: '批量删除', key: 'delete', permission: true },
  { label: '批量启用', key: 'enable', permission: true },
  { label: '批量禁用', key: 'disable', permission: true },
  { label: '导出', key: 'export', permission: true },
]

export const tableCol: TableColumnProps[] = [
  { type: 'selection', width: 55 },
  { type: 'index', label: '序号', width: 55 },
  { label: '姓名', prop: 'a' },
  { label: '电话', prop: 'b' },
  { label: '年龄', prop: 'c' },
  { label: '地址', prop: 'd' },
  { label: '图片', prop: 'imgUrl', isImage: true },
  { label: '操作', prop: 'handle', fixed: 'right', width: 160 },
]
