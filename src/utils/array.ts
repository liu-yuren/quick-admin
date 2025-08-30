/**
 * 一维数组转对象方法
 * @param {Array} data
 * @param {string} key 一维数组item 的 key
 * @param {string} value 一维数组item 的 key
 */
export function arrTransformObj(data: any[], key: string, value: string) {
  const obj: Record<string, any> = {}
  for (let i = 0; i < data.length; i++) {
    const element = data[i]
    if (typeof element[key] !== 'undefined') {
      obj[element[key] as string] = value && typeof element[value] !== 'undefined' ? element[value] : element
    }
  }
  return obj
}

export default arrTransformObj
