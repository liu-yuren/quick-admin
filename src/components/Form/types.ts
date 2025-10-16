import type { ColProps, FormProps as ElFormProps, FormItemRule } from 'element-plus'
import type { Component } from 'vue'

type Mutable<T> = {
  -readonly [P in keyof T]: T[P];
}

export interface FormOptions extends Mutable<Partial<ElFormProps>> {
  model: Record<string, any>
  schema: FormSchema[]
  gutter: number
  wrapperCol?: Partial<ColProps>
}

export type FormItemShow = boolean | ((formData: Record<string, any>) => boolean)

export interface FormSchema {
  component: ComponentType | Component
  componentProps?: Record<string, any>
  componentSlots?: Record<string, any>
  name: string
  span?: number
  show?: FormItemShow
  required?: boolean
  label?: string
  labelWidth?: string | number
  rules?: FormItemRule[]
  dependencies?: Record<string, any>
  // [key: string]: any
}

export type ComponentType = 'Title'
  | 'Input'
  | 'Password'
  | 'Textarea'
  | 'InputNumber'
  | 'Select'
  | 'CheckboxGroup'
  | 'RadioGroup'
  | 'Switch'
  | 'Cascader'
  | 'ImgUpload'
  | 'Custom'
  | 'DatePicker'

export interface SelectOptions<T> {
  label: string
  value: T
  disabled?: boolean
  children?: SelectOptions<T>[]
}
