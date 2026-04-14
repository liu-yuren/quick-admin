<script lang="ts" setup>
import type { FormOptions } from '@/components/Form'
import type { TableColumnProps } from '@/components/Table/types'
import { onMounted, reactive, ref, toRefs } from 'vue'
import SearchForm from '@/components/Form/SearchForm/index.vue'
import ProTable from '@/components/ProTable/index.vue'
import { searchFormSchema } from './index'

const formOptions = reactive<FormOptions>({
  model: {},
  gutter: 20,
  schema: searchFormSchema,
})

const tableCol: TableColumnProps[] = [
  { type: 'selection', width: 55 },
  { type: 'index', label: '序号', width: 55 },
  { label: '姓名', prop: 'a' },
  { label: '电话', prop: 'b' },
  { label: '年龄', prop: 'c' },
  { label: '地址', prop: 'd' },
  { label: '图片', prop: 'imgUrl' },
  { label: '操作', prop: 'handle', fixed: 'right', width: 160 },
]
const pageSizes = [10, 20, 50]
const page = reactive({
  pageIndex: 1,
  pageSize: 10,
  total: 20,
})
const { pageIndex, pageSize, total } = toRefs(page)

const tableHeaderBtns = [
  {
    label: '新增',
    key: 'add',
    permission: true,
    btnProps: { type: 'primary' },
  },
  {
    label: '批量删除',
    key: 'delete',
    permission: true,
  },
  {
    label: '批量启用',
    key: 'enable',
    permission: true,
  },
  {
    label: '批量禁用',
    key: 'disable',
    permission: true,
  },
  {
    label: '导出',
    key: 'export',
    permission: true,
  },
]

const tableData = ref<any[]>([])

onMounted(() => {
  for (let i = 0; i < 10; i++) {
    tableData.value.push({
      a: `a${i}`,
      b: `a${i}`,
      c: `a${i}`,
      d: `a${i}`,
      imgUrl: 'https://test-iov-fs.smartlink.com.cn/group1/M00/01/5D/rB0eGWfPmMSAFNsZAAHaXxip9iY877.jpg',
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

function handleSizeChange(_val: number) {

}
function handleCurrentChange(_val: number) {

}
</script>

<template>
  <div class="common-page-list">
    <SearchForm
      :form-options="formOptions"
    />

    <ProTable
      :table-col="tableCol"
      :table-data="tableData"
      :header-btns="tableHeaderBtns"
    />

    <div v-if="total > pageSize" class="common-table-page">
      <el-pagination
        :current-page="pageIndex"
        :page-sizes="pageSizes"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next"
        :total="total"
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>

    <!-- 子路由渲染区域 -->
    <router-view />
  </div>
</template>

<style scoped>

</style>
