import type { FormSchema, SelectOptions } from './types'

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

/**
 * 动态更新表单字段的属性
 * @param formSchemas 表单配置项数组
 * @param fieldUpdates 需要更新的字段及其属性，例如：{"vin": { show: false, disabled: true }}
 * @returns 更新后的表单配置项数组
 */
export function updateFormSchema(
  formSchemas: FormSchema[],
  schemas: Record<string, Partial<FormSchema>>,
) {
  for (const key in schemas) {
    if (Object.prototype.hasOwnProperty.call(schemas, key)) {
      let obj = formSchemas.find(item => item.name === key)
      if (obj) {
        obj = Object.assign(obj, schemas[key])
      }
    }
  }
  return formSchemas
}
