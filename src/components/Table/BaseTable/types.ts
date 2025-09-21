import type { ButtonProps, TableColumnInstance, TableProps } from 'element-plus'
import type { VNode } from 'vue'

export interface TableToolBarBtns {
  key: string
  label: string
  permission?: boolean
  btnProps?: ButtonProps
  isDropdown?: boolean
}

export type TableColumnShow = boolean | (() => boolean)

export type TableColumnProps = TableColumnInstance['$props'] & {
  // 属性拓展
  show?: TableColumnShow
  unit?: string
  isCustom?: boolean
  render?: (scope: any) => VNode | string
  isImage?: boolean
}

export interface ProTableProps {
  // search attribute
  formOptions: object

  // table attribute
  // tableProps: TableProps<any>
  tableProps: object
  tableCol: TableColumnProps[]
  tableHeaderBtns: TableToolBarBtns[]
}

export interface DragSortParams {
  oldIndex?: number
  newIndex?: number
}

export interface HandleTableActionParams<T = any> {
  scope: { row?: T }
  key: string
  label: string
}

// 3.3+: 可选的、更简洁的语法
export interface ProTableEmits {
  // search event
  'search': [params: any]
  'reset': []

  // table event
  'drag-sort': [params: DragSortParams]
  'handle-table-action': [params: HandleTableActionParams]
}

export interface ProTableContextKey extends ProTableProps {
  emit: <T extends keyof ProTableEmits>(event: T, ...args: ProTableEmits[T]) => void
}
