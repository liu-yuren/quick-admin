<script lang="ts" setup>
import type { FormOptions } from '@/components/Form'
import type { TableColumnProps } from '@/components/Table/types'
import { onMounted, provide, reactive, ref } from 'vue'
import { SearchForm } from '@/components/Form'
import { BaseTable } from '@/components/Table'
import { proTableEmits } from './proTable'

const emit = defineEmits(proTableEmits)

console.log(emit, 'emit')

const tableCol: TableColumnProps[] = [
  { type: 'selection', width: 55 },
  { type: 'index', label: '序号', width: 55 },
  { label: '姓名', prop: 'a' },
  { label: '电话', prop: 'b' },
  { label: '年龄', prop: 'c' },
  { label: '地址', prop: 'd' },
  { label: '图片', prop: 'imgUrl', isImage: true },
  { label: '操作', prop: 'handle', fixed: 'right', width: 160 },
]

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
const formOptions = reactive<FormOptions>({
  showCollapse: true,
  defaultShowCount: 3,
  animationDuration: 300,
  formProps: { size: 'default', labelWidth: 'auto' } as any,
  formFields: [
    {
      component: 'el-input',
      componentProps: {
        placeholder: '请输入用户名',
      },
      formItemProps: {
        label: '用户名',
        prop: 'username',
        rules: [{ required: true }],
      },
      colProps: { span: 6 },
    },
    {
      component: 'el-input',
      componentProps: {
        placeholder: '请输入邮箱',
      },
      formItemProps: {
        label: '邮箱',
        prop: 'email',
      },
      colProps: { span: 6 },
    },
    {
      component: 'el-select',
      componentProps: {
        placeholder: '请选择状态',
        clearable: true,
      },
      formItemProps: {
        label: '状态',
        prop: 'status',
      },
      colProps: { span: 6 },
    },
    {
      component: 'el-input',
      componentProps: {
        placeholder: '请输入手机号',
      },
      formItemProps: {
        label: '手机号',
        prop: 'phone',
      },
      colProps: { span: 6 },
    },
    {
      component: 'el-date-picker',
      componentProps: {
        'type': 'daterange',
        'range-separator': '至',
        'start-placeholder': '开始日期',
        'end-placeholder': '结束日期',
        'format': 'YYYY-MM-DD',
        'value-format': 'YYYY-MM-DD',
      },
      formItemProps: {
        label: '创建时间',
        prop: 'createTime',
      },
      colProps: { span: 12 },
    },
  ],
})

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

provide(
  'proTableContextKey',
  reactive({
    // ...toRefs(props),
    emit,

    // resetFields,
    // clearValidate,
    // validateField,
    // getField,
    // addField,
    // removeField,
    // ...useFormLabelWidth(),
  }),
)
</script>

<template>
  <div class="pro-table-container" style="height: 100%;">
    <SearchForm :form-options="formOptions" />

    <BaseTable
      class="base-table"
      :table-col="tableCol"
      :table-props="{
        data: tableData,
      }"
    />

    <div class="common-table-page">
      <el-pagination
        :page-sizes="[10, 20, 50]"
        :background="true"
        layout="total,sizes,prev,pager,next"
        :total="400"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.pro-table-container {
  height: 100%;
  // display: flex;
  // flex-direction: column;

  // .base-table {
  //   flex: 1;
  // }

  .common-table-page {
    display: flex;
    justify-content: center;
    padding: 12px 0;
  }
}
</style>
