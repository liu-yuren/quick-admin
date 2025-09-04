import { reactive } from 'vue'

export function useAppStore() {
  const state = reactive({
    collapse: false,
  })

  return {
    ...state,
  }
}
