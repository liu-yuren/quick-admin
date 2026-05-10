import type { FormOptions, FormSchema } from '@/components/Form'
import type { TableColumnProps, TableToolBarBtns } from '@/components/Table/types'

export const searchFormSchema: FormSchema[] = [
  {
    component: 'Input',
    componentProps: {
      placeholder: '请输入用户名',
    },
    label: '用户名',
    name: 'username',
    span: 8,
  },
  {
    component: 'Input',
    componentProps: {
      placeholder: '请输入邮箱',
    },
    label: '邮箱',
    labelWidth: '68px',
    name: 'email',
    span: 8,
  },
  {
    component: 'Select',
    componentProps: {
      placeholder: '请选择状态',
      clearable: true,
    },
    label: '状态',
    name: 'status',
    span: 8,
  },
  {
    component: 'Input',
    componentProps: {
      placeholder: '请输入手机号',
    },
    label: '手机号',
    name: 'phone',
    span: 8,
  },
  {
    component: 'DatePicker',
    componentProps: {
      'type': 'daterange',
      'range-separator': '至',
      'start-placeholder': '开始日期',
      'end-placeholder': '结束日期',
      'format': 'YYYY-MM-DD',
      'value-format': 'YYYY-MM-DD',
    },
    label: '创建时间',
    name: 'createTime',
    span: 8,
  },
]

export const formOptions: FormOptions = {
  showCollapse: true,
  defaultShowCount: 3,
  animationDuration: 300,
  formProps: { size: 'default', labelWidth: 'auto' } as any,
  formFields: [
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入用户名',
      },
      formItemProps: {
        label: '用户名',
        name: 'username',
        rules: [{ required: true }],
      },
      colProps: { span: 8 },
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入邮箱',
      },
      formItemProps: {
        label: '邮箱',
        name: 'email',
      },
      colProps: { span: 8 },
    },
    {
      component: 'Select',
      componentProps: {
        placeholder: '请选择状态',
        clearable: true,
      },
      formItemProps: {
        label: '状态',
        name: 'status',
      },
      colProps: { span: 8 },
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入手机号',
      },
      formItemProps: {
        label: '手机号',
        name: 'phone',
      },
      colProps: { span: 8 },
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
        name: 'createTime',
      },
      colProps: { span: 12 },
    },
  ],
}

export const tableHeaderBtns: TableToolBarBtns[] = [
  { label: '新增', key: 'add', permission: true, btnProps: { type: 'primary' } },
  { label: '批量删除', key: 'delete', permission: true },
  { label: '批量启用', key: 'enable', permission: true },
  { label: '批量禁用', key: 'disable', permission: true },
  { label: '导出', key: 'export', permission: true },
]

export const tableCol: TableColumnProps[] = [
  { type: 'selection', width: 55 },
  { type: 'radio', width: 55 },
  { type: 'default', width: 55 },
  { type: 'index', label: '序号', width: 55 },
  { type: 'sort', label: '排序', width: 65 },
  { label: '姓名', name: 'a' },
  { label: '电话', name: 'b' },
  { label: '年龄', name: 'c' },
  { label: '地址', name: 'd' },
  { label: '图片', name: 'imgUrl', isImage: true },
  { label: '操作', name: 'handle', fixed: 'right', width: 160 },
]
