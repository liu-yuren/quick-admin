import type { FormSchema } from './types'

export function useFormApi(options: any) {
  /**
   * 修改表单字段的属性
   * @param formSchema 表单配置项数组
   * @param schemas 需要更新的字段及其属性，例如：{"vin": { show: false, disabled: true }}
   * @returns 更新后的表单配置项数组
   */
  function setFormSchema(formSchema: FormSchema[], schemas: Record<string, Partial<FormSchema>>) {
    for (const key in formSchema) {
      if (Object.prototype.hasOwnProperty.call(schemas, key)) {
        let obj = formSchema.find(item => item.name === key)
        if (obj) {
          obj = Object.assign(obj, schemas[key])
        }
      }
    }
    return formSchema
  }

  return {
    setFormSchema,
  }
}
