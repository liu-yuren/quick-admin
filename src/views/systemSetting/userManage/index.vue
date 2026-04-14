<script lang="ts" setup>
import type { FormOptions } from '@/components/Form'
import type { HandleTableActionParams } from '@/components/Table/types'
import { onMounted, reactive, ref, toRefs } from 'vue'
import SearchForm from '@/components/Form/SearchForm/index.vue'
import ProTable from '@/components/ProTable/index.vue'
import router from '@/router'
import { searchFormSchema, tableCol, tableHeaderBtns } from './index'

const tableData = ref<any[]>([])

const formOptions = reactive<FormOptions>({
  model: {},
  gutter: 20,
  schema: searchFormSchema,
})

const pageSizes = [10, 20, 50]
const page = reactive({
  pageIndex: 1,
  pageSize: 10,
  total: 20,
})
const { pageIndex, pageSize, total } = toRefs(page)

onMounted(() => {
  for (let i = 0; i < 10; i++) {
    tableData.value.push({
      id: i + 1,
      a: i,
      b: ``,
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
      { key: 'delete', label: '删除', isDropdown: true, permission: true },
      { key: 'permission1', label: '分配', isDropdown: true, permission: true },
      { key: 'permission2', label: '权限', isDropdown: true, permission: true },
    ]

    return obj
  })
})

function handleTableAction(scope: HandleTableActionParams) {
  // console.log(scope, 'handleTableAction')

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

function handleSelectionChange(_val: any) {
  // 选中逻辑
  // console.log(val, 'val==')
}

function dragSort(_params: any) {
  // console.log(params, 'params')
}

function handleSizeChange(_val: number) {

}
function handleCurrentChange(_val: number) {

}
</script>

<template>
  <div class="common-page-list">
    <SearchForm
      :form-options="formOptions"
      @search="search"
      @reset="reset"
    />

    <ProTable
      :table-col="tableCol"
      :table-data="tableData"
      :header-btns="tableHeaderBtns"
      @table-action="handleTableAction"
      @selection-change="handleSelectionChange"
      @drag-sort="dragSort"
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
