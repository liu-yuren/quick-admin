import type { Arrayable } from '@vueuse/core'
import type { ColProps, ElForm, ElTooltipProps, FormItemRule, FormProps } from 'element-plus'
import type { Component, MaybeRef, VNode } from 'vue'

type Mutable<T> = {
  -readonly [P in keyof T]: T[P];
}

export type FormSchemaModelValue = Record<string, any>

export interface FormSchemaProps {
  /** 获取ElForm的ref方法 */
  formRef?: (form: InstanceType<typeof ElForm> | null) => void
  /** 绑定表单数据-用于数据同步 */
  modelValue: Record<string, any>
  /** 表单项配置内容 */
  schema: FormSchemaItems[]
  /** 表单栅格列间距 */
  gutter?: number
  /** 表单栅格列数 */
  wrapperCol?: Partial<ColProps>
  /** 表单提交远程请求方法 */
  request?: (model: Record<string, any>) => Promise<any>
}

export interface FormSchemaPropsEmits {
  // (
  //   e: 'change',
  //   field: string,
  //   value: any,
  //   model: MaybeRef<ReFormModelValue>
  // ): void
  (e: 'update:modelValue', model: MaybeRef<FormSchemaModelValue>): void
  (e: 'submit', model?: Record<string, any>): void
  (e: 'cancel'): void
  (e: 'success' | 'error', res: unknown): void
}

export type FormItemShow = boolean | ((formData: Record<string, any>) => boolean)

export interface FormSchemaItems {
  // TODO 表单字段控件名（必须是全局组件，非全局组件请使用插槽渲染）
  component: string | Component
  componentClass?: string
  componentProps?: Record<string, any>
  componentSlots?: Record<string, any>
  // 表单控件事件监听
  componentEvents?: Record<string, (params: any) => any>
  // 表单字段名
  name: string
  // 表单栅格
  span?: number
  // 表单控件是否可见
  show?: FormItemShow
  // 表单字段标签名
  label?: string | VNode | (() => VNode)
  // 表单字段标签名宽度，默认继承el-form配置
  labelWidth?: string | number
  // 表单字段标签名位置，默认继承el-form配置
  labelPosition?: string
  // form-item 样式类
  customClass?: string
  // 表单控件下方提示
  tips?: string
  tipsClass?: string
  // 问号提示语
  tooltip?: string
  // 表单默认提示语自定义样式
  tooltipProps?: ElTooltipProps
  // 表单控件校验规则
  rules?: Arrayable<FormItemRule>
  dependencies?: Record<string, any>
  // [key: string]: any
}

// export type ComponentType = 'Title'
//   | 'Input'
//   | 'Password'
//   | 'Textarea'
//   | 'InputNumber'
//   | 'Select'
//   | 'CheckboxGroup'
//   | 'RadioGroup'
//   | 'Switch'
//   | 'Cascader'
//   | 'ImgUpload'
//   | 'Custom'
//   | 'DatePicker'

// export interface SelectOptions<T> {
//   label: string
//   value: T
//   disabled?: boolean
//   children?: SelectOptions<T>[]
// }
