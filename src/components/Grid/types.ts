export type BreakPoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export interface Responsive {
  span?: number
  offset?: number
}

// 参考 Naive UI 的 Grid 组件设计
export interface GridProps {
  // 栅格列数，支持数字或响应式字符串
  cols?: number
  // 水平/垂直间距
  gap?: Array<number> | number
  // 是否启用折叠功能
  collapsed?: boolean
  // 折叠时显示的行数
  collapsedRows?: number
}

export interface GridItemProps {
  // 栅格占据的列数，支持数字或响应式字符串
  span?: number | string
  // 栅格左侧的间隔格数
  offset?: number | string
  // 栅格后缀
  suffix?: boolean

  xs?: Responsive
  sm?: Responsive
  md?: Responsive
  lg?: Responsive
  xl?: Responsive
}
