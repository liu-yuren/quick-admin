<script setup lang="ts">
import type { TableColumnProps } from '@/components/ProTable/types'
import { onMounted, ref } from 'vue'
import ProTable from '@/components/ProTable/index.vue'

const tableCol: TableColumnProps[] = [
  { prop: 'date', label: '日期', align: 'center' },
  { prop: 'name', label: '姓名', align: 'center' },
  { prop: 'address', label: '地址', align: 'center' },
  { type: 'handle', prop: 'handle', label: '操作', align: 'center', width: 220 },
]

const data = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
]

const tableData = ref<any[]>([])

onMounted(() => {
  tableData.value = data.map((item) => {
    return {
      ...item,
      tableHandleBtnList: [
        { key: 'view', label: '查看', permission: true },
        { key: 'edit', label: '编辑', permission: true },
        { key: 'view', label: '启用', permission: true },
        { key: 'edit', label: '停用', permission: true },
        { key: 'edit', label: '静默', permission: true },
      ],
    }
  })

  // tableData.value.forEach((item) => {
  //   console.log(item.tableHandleBtnList)
  // })
})
</script>

<template>
  <div>
    <ProTable
      :table-data="tableData"
      :table-col="tableCol"
      :max-table-handle-btn-num="3"
    />
  </div>
</template>
