import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'

export const useTabsViewStore = defineStore('tagsView', () => {
  // state
  const tabsView = ref<any[]>([])

  // actions
  const addTabsView = (tab: any) => {
    console.log(tab, 'tab')

    console.log(tabsView.value, '1')

    if (tabsView.value.some((item: any) => item.path === tab.path))
      return

    if (tab.meta.title) {
      tabsView.value.push({
        ...tab,
        title: tab.meta.title,
      })
    }
  }
  return {
    tabsView,
    addTabsView,
  }
})
