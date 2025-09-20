<script setup lang="ts">
import type { TableColumnProps } from '../../types'
import { Setting } from '@element-plus/icons-vue'
import { computed } from 'vue'
import { columnHandleTypes, columnTypes } from '../../constant'

const tableCol = defineModel<TableColumnProps[]>('tableCol')

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
</script>

<template>
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
</template>
