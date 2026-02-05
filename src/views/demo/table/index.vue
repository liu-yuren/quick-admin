<script setup lang="ts">
import { onMounted, ref } from 'vue'
import ProTable from '@/components/ProTable/index.vue'

const tableCol = [
  { prop: 'date', label: 'Date', align: 'center' },
  { prop: 'name', label: 'Name', align: 'center' },
  { prop: 'address', label: 'Address', align: 'center' },
  { type: 'handle', prop: 'action', label: 'Action', align: 'center', width: 160 },
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

const tableData = ref([])

onMounted(() => {
  tableData.value = data.map((item) => {
    const obj = { ...item }
    obj.actionBtns = [
      {
        key: 'view',
        label: '查看',
        permission: true,
      },
      {
        key: 'edit',
        label: '编辑',
        permission: true,
      },
      {
        key: 'view',
        label: '启用',
        permission: true,
      },
      {
        key: 'edit',
        label: '停用',
        permission: true,
      },
      {
        key: 'edit',
        label: '静默',
        permission: true,
      },
    ]

    return obj
  })

  console.log(tableData.value, 'tableData===')
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
