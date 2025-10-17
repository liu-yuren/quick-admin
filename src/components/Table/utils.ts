import type { TableColumnShow } from './types'

// 格式化，空字符串则返回'-'
export function formatEmptyValue(val: any) {
  return val ?? '-'
}

/**
 * 表格列---是否显示
 * @param show 列显示配置，可以是布尔值、函数或未定义
 * @returns 如果列应该显示则返回true，否则返回false
 */
export function shouldColumnShow(show: TableColumnShow | undefined) {
  // 如果未定义，则默认显示列
  if (typeof show === 'undefined') {
    return true
  }
  if (typeof show === 'function') {
    return show()
  }
  return Boolean(show)
}
