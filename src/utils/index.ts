/**
 * 清理空值参数
 */
export function cleanEmptyParams(obj: Record<string, any>): Record<string, any> {
  const params = { ...obj }
  for (const key in params) {
    if (
      params[key] === ''
      || (Array.isArray(params[key]) && params[key].length === 0)
      || params[key] == null
    ) {
      delete params[key]
    }
  }
  return params
}

interface FormSchemaItem {
  prop: string
  show?: boolean | ((data: any) => boolean)
  [key: string]: any
}

/**
 * 根据表单 schema 提取需要提交的表单值
 * 过滤隐藏字段，提取显示的表单项值
 * @param schema 表单配置 schema
 * @param formData 表单数据响应式对象
 * @returns 过滤后的参数字典
 */
export function getFormSchemaValue(schema: FormSchemaItem[], formData: Record<string, any>) {
  // 初始化结果对象
  const result: Record<string, any> = {}

  // 遍历 schema，只处理显示的字段
  for (const item of schema) {
    // 字段必须有 prop 才处理
    if (!item?.prop) {
      continue
    }

    // 判断字段是否显示（支持函数/布尔值）
    let isShow = true
    if (typeof item.show === 'function') {
      isShow = item.show(formData)
    }
    else if (typeof item.show === 'boolean') {
      isShow = item.show
    }

    // 只收集显示的字段
    if (isShow) {
      result[item.prop] = formData[item.prop]
    }
  }

  return result
}
