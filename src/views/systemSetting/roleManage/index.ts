import type { FormSchema } from '@/components/Form'

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
