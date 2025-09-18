import type { ExtractPropTypes, PropType } from 'vue'
import type { TableColumnProps, TableHandleBtnList } from '../../types'
import { definePropType } from '@/components/utils'

export const proTableProps = {
  // search attribute
  formOptions: {
    type: definePropType<any>(Object),
    default: () => ({}),
  },

  // table attribute
  tableProps: {
    type: definePropType<any>(Object),
    default: () => ({}),
  },
  tableCol: {
    type: definePropType<TableColumnProps[]>(Array),
    default: () => [],
  },
  tableHeaderBtns: {
    type: definePropType<TableHandleBtnList[]>(Array),
    default: () => [],
  },
} as const

export const proTableEmits = {
  // search event
  'search': (_params: any) => true,
  'reset': () => true,

  // table event
  'table-handle-click': (_scope: any) => true,
} as const

export type ProTableProps = ExtractPropTypes<typeof proTableProps>
export type ProTableEmits = typeof proTableEmits
