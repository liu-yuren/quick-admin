import type { InjectionKey } from 'vue'
import type { ProTableContextKey } from './types'

export const columnHandleTypes = ['handle']
export const columnTypes = ['selection', 'radio', 'index', 'expand', 'sort', 'checked']

export const proTableContextKey: InjectionKey<ProTableContextKey> = Symbol('proTableContextKey')
