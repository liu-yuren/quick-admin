import type { ButtonProps, TableColumnInstance, TableProps } from 'element-plus'

export type TableColumnShow = boolean | (() => boolean)

export type TableColumnProps = TableColumnInstance['$props'] & {
  // 属性拓展
  show?: TableColumnShow
  unit?: string
  isCustom?: boolean
  isImage?: boolean
}

export interface ProTableProps {
  tableHeaderBtns?: Array<TableHandleBtnList>
  tableProps: TableProps<any>
  tableCol?: Array<TableColumnProps>
}

export interface TableHandleBtnParams<T = any> {
  scope: { row?: T }
  key: string
  label: string
}

export interface TableHandleBtnList {
  key: string
  label: string
  permission?: boolean
  btnProps?: ButtonProps
  isMore: boolean
}
