<script setup lang="ts">
import type { TableColumnProps } from '@/components/Table/types'
import { FullScreen, Refresh, Setting } from '@element-plus/icons-vue'
import { useFullscreen } from '@vueuse/core'
import { computed } from 'vue'
import { columnHandleTypes, columnTypes } from '@/components/Table/constant'

const tableCol = defineModel<TableColumnProps[]>('tableCol')

const { toggle, isFullscreen } = useFullscreen()

// 过滤出可自定义的列（排除特殊类型列）
const customTableCol = computed(() =>
  tableCol.value?.filter(item => !columnTypes.includes(item.type ?? '')) || [],
)

// 当前选中的自定义列
const checkedCustomCol = computed({
  get: () => customTableCol.value
    .filter(item => item.show)
    .map(item => item.prop ?? ''),

  set: (selectedProps: string[]) => {
    if (!tableCol.value)
      return

    // 更新列的显示状态
    tableCol.value.forEach((item) => {
      // 特殊类型列始终显示
      if (columnTypes.includes(item.type ?? '')) {
        item.show = true
      }
      // 操作列始终显示
      else if (columnHandleTypes.includes(item.prop ?? '')) {
        item.show = true
      }
      // 其他列根据选中状态显示
      else {
        item.show = selectedProps.includes(item.prop ?? '')
      }
    })
  },
})

function refreshTable() {
  location.reload()
}
</script>

<template>
  <div class="table-tool-bar-right">
    <el-tooltip
      effect="dark"
      content="刷新"
      placement="top"
    >
      <el-button :icon="Refresh" circle @click="refreshTable" />
    </el-tooltip>

    <el-tooltip
      effect="dark"
      :content="!isFullscreen ? '全屏' : '退出全屏'"
      placement="top"
    >
      <el-button :icon="FullScreen" circle @click="toggle" />
    </el-tooltip>

    <el-tooltip
      effect="dark"
      content="列设置"
      placement="top"
    >
      <el-button circle>
        <el-popover placement="bottom-end" trigger="click">
          <template #reference>
            <el-button :icon="Setting" circle />
          </template>

          <el-checkbox-group v-model="checkedCustomCol">
            <el-checkbox
              v-for="item in customTableCol"
              :key="item.prop"
              :label="item.prop"
              :disabled="columnHandleTypes.includes(item.prop ?? '')"
            >
              {{ item.label }}
            </el-checkbox>
          </el-checkbox-group>
        </el-popover>
      </el-button>
    </el-tooltip>
  </div>
</template>
