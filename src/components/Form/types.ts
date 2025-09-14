import type { ColProps, FormItemProps, FormProps, RowProps } from 'element-plus'
import type { Component } from 'vue'
import type { GridProps } from '../Grid/types'

export interface FormField {
  component: string | Component
  componentProps: Record<string, any>
  formItemProps: FormItemProps
  colProps: ColProps
}

export interface FormOptions {
  showCollapse?: boolean
  rowProps?: RowProps
  formProps?: FormProps
  gridProps?: GridProps
  formFields?: FormField[]
}
