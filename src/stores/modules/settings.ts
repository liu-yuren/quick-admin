import { reactive } from 'vue'

export function useSettingsStore() {
  const state = reactive({
    collapse: false,
  })

  return {
    ...state,
  }
}
