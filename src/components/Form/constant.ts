import type { Component } from 'vue'
import type { ComponentType } from './types'
import {
  ElCascader,
  ElCheckboxGroup,
  ElDatePicker,
  ElInput,
  ElInputNumber,
  ElRadioGroup,
  ElSelect,
  ElSwitch,
  ElUpload,
} from 'element-plus'

export const componentMap: Partial<Record<ComponentType, Component>> = {
  Input: ElInput,
  Password: ElInput,
  Textarea: ElInput,
  InputNumber: ElInputNumber,
  Select: ElSelect,
  CheckboxGroup: ElCheckboxGroup,
  RadioGroup: ElRadioGroup,
  Switch: ElSwitch,
  Cascader: ElCascader,
  ImgUpload: ElUpload,
  DatePicker: ElDatePicker,
}

export const defaultComponentProps = new Map([
  ['Input', { clearable: true }],
  ['Password', { type: 'password', showPassword: true }],
  ['Textarea', {
    type: 'textarea',
    clearable: true,
    showWordLimit: true,
    maxlength: 200,
    autosize: { minRows: 4, maxRows: 6 },
  }],
  ['ImgUpload', {
    listType: 'picture-card',
    action: '#',
    autoUpload: false,
  }],
])
