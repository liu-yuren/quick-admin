import type { ButtonProps, TableColumnInstance, TableProps } from 'element-plus'
import type { CSSProperties, VNode } from 'vue'

/**
 * 表格行拖拽排序参数
 * 用于描述拖拽操作前后的索引位置
 */
export interface DragSortParams {
  newIndex?: number // 拖拽后的新位置索引
  oldIndex?: number //  拖拽前的原始位置索引
}

/**
 * 表格操作按钮点击事件参数
 * @template T - 表格行数据的类型
 */
export interface TableHandleBtnClickParams<T = any> {
  //  作用域数据，包含当前行数据和行索引
  scope: {
    row?: T // 当前行数据
    $index?: number // 当前行索引
  }
  key: string // 按钮的唯一标识键
  label: string // 按钮显示的文本标签
}

/**
 * 表格列类型枚举
 * - default: 默认列
 * - selection: 多选列
 * - index: 序号列
 * - expand: 展开列
 * - custom: 自定义列
 * - image: 图片列
 * - radio: 单选列
 * - sort: 排序列
 * - handle: 操作列
 */
type TableColumnType = 'default'
  | 'selection'
  | 'index'
  | 'expand'
  | 'custom'
  | 'image'
  | 'radio'
  | 'sort'
  | 'handle'

/**
 * 表格列显示控制类型
 * 可以是布尔值或返回布尔值的函数
 */
export type TableColumnShow = boolean | (() => boolean)

/**
 * 表格列配置属性
 * 继承 ElementPlus 的 TableColumnInstance 属性，并扩展自定义属性
 */
export type TableColumnProps = TableColumnInstance['$props'] & {
  /** 列的类型 */
  type?: TableColumnType
  /** 列是否显示的控制 */
  show?: TableColumnShow
  /** 数值单位（如：元、kg 等） */
  unit?: string
  /** 自定义渲染函数 */
  render?: (scope: any) => VNode | string
  /** 图片列的样式配置 */
  imageStyles?: CSSProperties
}

export interface TableData {
  [key: string]: any
}

/**
 * ProTable 组件的属性配置
 */
export interface ProTableProps extends Partial<TableProps<any>> {
  /** ElementPlus Table 组件的原生属性（排除 data 属性） */
  // tableProps?: Omit<TableProps<any>, 'data'>
  /** 表格列配置集合 */
  tableCol: TableColumnProps[]
  /**
   * 表格数据源集合
   */
  tableData: any[]
  /** 表格操作列最多显示的按钮数量，超出部分会收起到更多菜单中 */
  maxTableHandleBtnCount?: number
}

/**
 * ProTable 组件的事件定义
 */
export interface ProTableEmits {
  /** 拖拽排序事件 */
  (e: 'dragSort', params?: DragSortParams): void
  /** 操作按钮点击事件 */
  (e: 'tableHandleClick', params?: TableHandleBtnClickParams): void
}

/**
 * 表格操作列按钮配置
 */
export interface TableHandleBtnProps {
  /** 按钮的唯一标识键 */
  key: string
  /** 按钮显示的文本标签 */
  label: string
  /** 按钮的权限控制，为 false 时不显示该按钮 */
  permission?: boolean
  /** ElementPlus Button 组件的属性配置 */
  btnProps?: Partial<ButtonProps>
}
