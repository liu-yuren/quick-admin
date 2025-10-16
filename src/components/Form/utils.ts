import type { SelectOptions } from './types'

/**
 * 给定val值和字典 返回字典中的label
 * @param val number | string
 * @param dict Array
 */
export function getLabelFromDict(val: number | string, dict: SelectOptions<number | string>[]) {
  const target = dict.find(item => `${item.value}` === `${val}`)
  if (target) {
    return target.label
  }
}
