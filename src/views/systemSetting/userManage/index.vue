<script lang="ts" setup>
import type { TableHandleBtnParams } from '@/components/Table/types'
import { onMounted, ref } from 'vue'
import { ProTable } from '@/components/Table'
import router from '@/router'
import { formOptions, tableCol, tableHeaderBtns } from './index'

const tableData = ref<any[]>([])

onMounted(() => {
  for (let i = 0; i < 10; i++) {
    tableData.value.push({
      a: `a${i}`,
      b: `a${i}`,
      c: `a${i}`,
      d: `a${i}`,
      // imgUrl: 'https://test-iov-fs.smartlink.com.cn/group1/M00/01/5D/rB0eGWfPmMSAFNsZAAHaXxip9iY877.jpg',
    })
  }

  tableData.value = tableData.value.map((item) => {
    const obj = { ...item }
    obj.actionBtns = [
      { key: 'edit', label: '编辑', permission: true },
      { key: 'status', label: '启用', permission: true },
      { key: 'status', label: '禁用', permission: true },
      { key: 'delete', label: '删除', isMore: true, permission: true },
      { key: 'permission1', label: '分配', isMore: true, permission: true },
      { key: 'permission2', label: '权限', isMore: true, permission: true },
    ]

    return obj
  })
})

function handleTableClick(scope: TableHandleBtnParams) {
  const { key } = scope
  switch (key) {
    case 'add':
      router.push({ name: 'UserManageAdd' })
      break
    default:
      break
  }
}
function search(_params: any) {
  // 搜索逻辑
}
function reset() {
  // 重置逻辑
}
</script>

<template>
  <div class="user-manage-container">
    <ProTable
      :form-options="formOptions"
      :table-props="{ data: tableData }"
      :table-col="tableCol"
      :table-header-btns="tableHeaderBtns"
      @search="search"
      @reset="reset"
      @table-handle-click="handleTableClick"
    />
    
    <!-- 子路由渲染区域 -->
    <router-view />
  </div>
</template>

<style scoped>
.user-manage-container {
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
