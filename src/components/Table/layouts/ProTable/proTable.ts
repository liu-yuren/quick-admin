export const proTableEmits = {
  // validate: (prop: FormItemProp, isValid: boolean, message: string) =>
  //   (isArray(prop) || isString(prop))
  //   && isBoolean(isValid)
  //   && isString(message),
  'search': () => true,
  'reset': () => true,

  'handle-table-click': () => true,
}

export type ProTableEmits = typeof proTableEmits
