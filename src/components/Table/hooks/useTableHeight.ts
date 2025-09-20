import type { Ref } from 'vue'
import { useElementBounding, useResizeObserver } from '@vueuse/core'
import { onMounted, onUnmounted, ref } from 'vue'

interface Options {
  searchFormSelector?: string
  otherHeight?: number
}

export function useTableHeight(tableRef: Ref<HTMLElement>, options: Options = {}) {
  const {
    searchFormSelector = '.search-form-container',
    otherHeight = 56,
  } = options

  const tableMaxHeight = ref('auto')

  function countTableHeight() {
    const { top } = useElementBounding(tableRef)

    // 延时获取，避免获取不到高度且防止页面抖动
    setTimeout(() => {
      // 表格高度 = 可视区域高度 - 表格距离顶部的高度 - 其他高度(分页高度)
      tableMaxHeight.value = `${window.innerHeight - top.value - otherHeight}px`
    }, 100)
  }

  onMounted(() => {
    window.addEventListener('resize', countTableHeight)

    // 监听搜索表单容器大小变化
    const dom = document.querySelector(searchFormSelector) as HTMLElement
    if (dom) {
      useResizeObserver(dom, () => {
        countTableHeight()
      })
    }
  })

  onUnmounted(() => {
    window.removeEventListener('resize', countTableHeight)
  })

  return {
    tableMaxHeight,
    refreshTableHeight: countTableHeight,
  }
}
