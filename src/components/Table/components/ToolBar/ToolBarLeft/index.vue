<script setup lang="ts">
import type { HandleTableActionParams } from '@/components/Table/types'
import { computed, inject } from 'vue'
import { proTableContextKey } from '../../../constant'

const proTalbeContext = inject(proTableContextKey, undefined)

// 表格头部按钮（已过滤权限）
const headerBtns = computed(() => {
  return proTalbeContext?.tableHeaderBtns?.filter(item => item.permission) ?? []
})

/**
 * 表格操作列---按钮点击事件
 * @param {HandleTableActionParams} params 按钮点击参数
 */
function handleTableAction(params: HandleTableActionParams) {
  proTalbeContext?.emit('handle-table-action', params)
}
</script>

<template>
  <div class="table-tool-bar-left">
    <template
      v-for="item in headerBtns"
      :key="item.key"
    >
      <el-button
        v-if="item.permission"
        v-bind="item.btnProps"
        @click="handleTableAction({
          scope: {},
          label: item.label,
          key: item.key,
        })"
      >
        {{ item.label }}
      </el-button>
    </template>
  </div>
</template>
