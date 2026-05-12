<script lang="ts" setup>
import type { TableHandleBtnClickParams } from '@/components/ProTable/types'
import { onMounted, ref } from 'vue'
import SearchForm from '@/components/Form/SearchForm/index.vue'
import ProTable from '@/components/ProTable/index.vue'
import { usePage } from '@/hooks/usePage'
import router from '@/router'
import { searchFormOpt, tableCol, tableHeaderBtns } from './index'

onMounted(() => {
  // for (let i = 0; i < 10; i++) {
  //   tableData.value.push({
  //     id: i + 1,
  //     a: i,
  //     b: ``,
  //     c: `a${i}`,
  //     d: `a${i}`,
  //     imgUrl: 'https://test-iov-fs.smartlink.com.cn/group1/M00/01/5D/rB0eGWfPmMSAFNsZAAHaXxip9iY877.jpg',
  //   })
  // }

  // tableData.value = tableData.value.map((item) => {
  //   const obj = { ...item }
  //   obj.actionBtns = [
  //     { key: 'edit', label: '编辑', permission: true },
  //     { key: 'status', label: '启用', permission: true },
  //     { key: 'status', label: '禁用', permission: true },
  //     { key: 'delete', label: '删除', isDropdown: true, permission: true },
  //     { key: 'permission1', label: '分配', isDropdown: true, permission: true },
  //     { key: 'permission2', label: '权限', isDropdown: true, permission: true },
  //   ]

  //   return obj
  // })
})

function handleSelectionChange(_val: any) {
  // 选中逻辑
  // console.log(val, 'val==')
}

function dragSort(_params: any) {
  // console.log(params, 'params')
}

const formData = ref({})

const {
  formRef,
  formOpt,
  page,
  tableList,
  tableListLoading,
  getTableList,
  handleCurrentChange,
  handleSizeChange,
  search,
  reset,
} = usePage({
  immediate: true,
  formOptions: searchFormOpt,
  transformSearchParams,
  listFn: params => getActivityListApi({ ...params }),
  formmatList,
  formData,
})

function transformSearchParams(data: any) {
  const { activityDate } = data
  const params = {
    ...data,
    pushStartTime: activityDate && activityDate.length > 0 ? activityDate[0] : '',
    pushEndTime: activityDate && activityDate.length > 0 ? activityDate[1] : '',
  }
  delete params.activityDate
  return params
}

function formmatList(data: any[]) {
  return data.map((item, index) => {
    const obj = { ...item }
    obj.serialNumber = (page.pageNum - 1) * page.pageSize + index + 1
    return obj
  })
}

function tableHandleClick({ scope, key }: TableHandleBtnClickParams) {
  switch (key) {
    case 'add':
      router.push({ name: 'UserManageAdd' })
      break
    default:
      break
  }
}
</script>

<template>
  <div v-if="['/system-setting/base-setting/user-manage'].includes($route.path)" class="common-page-list">
    <SearchForm
      :form-options="formOpt"
      @search="search"
      @reset="reset"
    />

    <ProTable
      :table-col="tableCol"
      :table-data="tableList"
      :header-btns="tableHeaderBtns"
      @table-handle-click="tableHandleClick"
      @selection-change="handleSelectionChange"
      @drag-sort="dragSort"
    />

    <div v-if="page.total > page.pageSize" class="common-table-page">
      <el-pagination
        :current-page="page.pageNum"
        :page-sizes="[10, 20, 50]"
        :page-size="page.pageSize"
        layout="total, sizes, prev, pager, next"
        :total="page.total"
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>

  <!-- 子路由渲染区域 -->
  <router-view />
</template>

<style scoped>

</style>
