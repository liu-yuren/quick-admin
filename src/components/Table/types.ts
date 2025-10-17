import type { ButtonProps, TableColumnInstance, TableProps } from 'element-plus'
import type { CSSProperties, VNode } from 'vue'

export interface TableToolBarBtns {
  key: string
  label: string
  permission?: boolean
  btnProps?: Partial<ButtonProps>
  isDropdown?: boolean
}

export type TableColumnShow = boolean | (() => boolean)

type TableColumnType = 'default'
  | 'selection'
  | 'index'
  | 'expand'
  | 'custom'
  | 'image'
  | 'radio'
  | 'sort'

export type TableColumnProps = TableColumnInstance['$props'] & {
  // 属性拓展
  type?: TableColumnType
  show?: TableColumnShow
  unit?: string
  render?: (scope: any) => VNode | string
  imageStyles?: CSSProperties
}

export interface TableData {
  actionBtns: TableToolBarBtns[]
  [key: string]: any
}

export interface BasicTable {
  tableCol: TableColumnProps[]
  tableData: Array<TableData>
  tableProps?: Omit<TableProps<any>, 'data'>
  tableHeaderBtns?: TableToolBarBtns[]
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
