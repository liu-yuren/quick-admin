import type { ButtonProps, TableColumnInstance, TableProps } from 'element-plus'
import type { SetupContext } from 'vue'
import type { ProTableEmits } from './layouts/ProTable/proTable'

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

export interface HandleTableActionParams<T = any> {
  scope: { row?: T }
  key: string
  label: string
}

export interface TableHandleBtnList {
  key: string
  label: string
  permission?: boolean
  btnProps?: ButtonProps
  isMore?: boolean
}

export interface ProTableContextKey extends ProTableProps {
  emit: SetupContext<ProTableEmits>['emit']
}
