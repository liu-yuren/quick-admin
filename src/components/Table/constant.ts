import type { InjectionKey } from 'vue'
import type { ProTableContextKey } from './types'

export const columnHandleTypes = ['handle']
export const columnTypes = [
  'selection',
  'radio',
  'index',
  'expand',
  'sort',
  'checked',
  'default',
  'image',
  'costom',
]

export const proTableContextKey: InjectionKey<ProTableContextKey> = Symbol('proTableContextKey')
