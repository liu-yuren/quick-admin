import type { Arrayable } from '@vueuse/core'
import type { ColProps, ElTooltipProps, FormItemRule, FormProps } from 'element-plus'
import type { Component, MaybeRef, VNode } from 'vue'

export type Recordable = Record<string, any>
export type FormItemShow = boolean | ((formData: Recordable) => boolean)

/** 表单组件插槽内容类型 */
export type FormComponentSlotContent = string | VNode | ((slotScope: any) => string | VNode)

export interface SlotsObj {
  [key: string]: FormComponentSlotContent
}

export interface FormSchemaProps {
  /** 绑定表单数据-用于数据同步 */
  modelValue: Recordable
  /** 表单项配置内容 */
  schema: SchemaFormItems[]
  /** 表单栅格列间距 */
  gutter?: number
  /** 表单栅格列数 */
  wrapperCol?: Partial<ColProps>
  /** 表单提交远程请求方法 */
  request?: (model: Recordable) => Promise<any>

  /** 表单提交按钮 */
  submitBtnText?: string
  /** 表单取消按钮 */
  cancelBtnText?: string
  showBtnArea?: boolean
  showSubmitBtn?: boolean
  showCancelBtn?: boolean
}

export interface FormSchemaEmits {
  (e: 'update:model', model: MaybeRef<Recordable>): void
  (e: 'submit', model?: Record<string, any>): void
  (e: 'submitError', error: any): void
  (e: 'cancel'): void
  (e: 'success' | 'error', res: unknown): void
}

export interface SchemaFormItems {
  // === 布局相关配置 ===
  span?: number // 栅格占位格数 (24栅格系统)
  colProps?: Partial<ColProps> // el-col 组件属性

  // === 组件相关配置 ===
  component?: string | Component // 组件类型或组件对象
  componentClass?: string // 组件样式类
  componentProps?: Recordable // 组件属性
  componentSlots?: Recordable // 组件插槽
  componentEvents?: Record<string, (params: any) => any> // 组件事件 示例：{ change: (value) => console.log(value) }

  // === form-item 相关配置 ===
  name: string // 表单字段名称
  label?: string | VNode | (() => VNode) // 表单字段标签名
  labelWidth?: string | number // 表单字段标签名宽度，默认继承el-form配置
  labelPosition?: string // 表单字段标签名位置，默认继承el-form配置
  rules?: Arrayable<FormItemRule> // 表单控件校验规则
  customClass?: string // form-item 样式类

  //  === 显示控制 ===
  show?: FormItemShow // 是否显示该表单项

  // === 提示配置 ===
  tips?: string // 组件下方提示语
  tipsClass?: string // 提示样式类
  tooltip?: string // 问号icon 提示语
  tooltipProps?: ElTooltipProps // 问号icon 提示语属性
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
