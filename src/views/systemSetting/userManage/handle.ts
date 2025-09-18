import type { FormOptions } from '@/components/Form'

export const formOptions: FormOptions = {
  showCollapse: true,
  defaultShowCount: 3,
  animationDuration: 300,
  formProps: { size: 'default', labelWidth: 'auto' } as any,
  formFields: [
    {
      component: 'title',
      colProps: { span: 24 },
      title: '基本信息',
    },
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
      colProps: { span: 12 },
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
      colProps: { span: 12 },
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
      colProps: { span: 12 },
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
      colProps: { span: 12 },
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
