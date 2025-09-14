import type { Ref } from 'vue'
import { defineStore } from 'pinia'
import { reactive, ref, toRefs } from 'vue'

interface AppStoreState {
  isCollapse: boolean
  isDark: boolean
  isWatermark: boolean
  layout: string
  size: string
}

export const useAppStore = defineStore('app', () => {
  const isCollapse = ref(false)
  const isDark = ref(false)
  const isWatermark = ref(true)
  const layout = ref('classic')
  const size = ref('default')

  const stateMap = {
    isCollapse,
    isDark,
    isWatermark,
    layout,
    size,
  } as const

  function setAppSoreState<K extends keyof typeof stateMap>(key: K, value: AppStoreState[K]): void {
    const state = stateMap[key]
    if (state) {
      (state as Ref<any>).value = value
    }
  }

  return {
    isCollapse,
    isDark,
    isWatermark,
    layout,
    size,

    setAppSoreState,
  }
})
