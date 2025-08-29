import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { getMenuListApi } from '@/api/menu'

export const useAuthStore = defineStore('auth', () => {
  // 
  const authMenuList = ref([])

  async function getMenuList() {
    await getMenuListApi().then((res) => {
      authMenuList.value = res.data
    })
  }

  return { authMenuList, getMenuList }
})
