<script setup lang="ts">
import type { TableColumnProps, TableData, TableToolBarBtns } from '@/components/Table'
import { onMounted, ref } from 'vue'
import { BasicTable } from '@/components/Table'

const tableHeaderBtns: TableToolBarBtns[] = [
  { label: '新增', key: 'add', permission: true, btnProps: { type: 'primary' } },
  { label: '批量删除', key: 'delete', permission: true },
  { label: '批量启用', key: 'enable', permission: true },
  { label: '批量禁用', key: 'disable', permission: true },
  { label: '导出', key: 'export', permission: true },
]

const tableCol: TableColumnProps[] = [
  { type: 'selection' },
  { type: 'radio', label: '单选', prop: 'radio' },
  { type: 'index', label: '序号', width: 55 },
  { type: 'sort', label: '排序' },
  { type: 'image', label: '图片', prop: 'imgUrl', imageStyles: { height: '100px', width: '100%' } },
  { label: '姓名', prop: 'a' },
  { label: '电话', prop: 'b' },
  { label: '年龄', prop: 'c' },
  { label: '地址', prop: 'd' },
  { type: 'handle', label: '操作', prop: 'handle', fixed: 'right', width: 160 },
]

const tableData = ref<TableData[]>([])

onMounted(() => {
  for (let i = 0; i < 10; i++) {
    tableData.value.push({
      id: i,
      a: `姓名${i}`,
      b: `电话${i}`,
      c: `年龄${i}`,
      d: `地址${i}`,
      imgUrl: 'https://test-iov-fs.smartlink.com.cn/group1/M00/01/5D/rB0eGWfPmMSAFNsZAAHaXxip9iY877.jpg',
      radio: null,
      actionBtns: [
        { label: '查看', key: 'view', permission: true },
        { label: '编辑', key: 'edit', permission: true },
        { label: '冻结', key: 'freeze', permission: true, isDropdown: true },
        { label: '删除', key: 'delete', permission: true, isDropdown: true },
      ],
    })
  }
})
</script>

<template>
  <div class="container">
    <BasicTable
      :table-col="tableCol"
      :table-data="tableData"
      :table-props="{
        rowKey: 'id',
      }"
      :table-header-btns="tableHeaderBtns"
    />
  </div>
</template>

<style scoped>
.container {
  padding: 20px;
  height: 100%;
  background-color: #fff;
  box-sizing: border-box;
  overflow: auto;
}
</style>
