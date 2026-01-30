<script setup lang="ts">
import { ref } from 'vue'
import SchemaForm from '@/components/SchemaForm/index.vue'

const formData = ref({
  nums: 1,
})

const schema = ref([
  {
    component: 'el-input',
    name: 'name',
    label: '名称',
    span: 24,
  },
  {
    component: 'el-select',
    componentProps: {
      options: [
        { label: '区域1', value: 'zone1' },
        { label: '区域2', value: 'zone2' },
      ],
    },
    name: 'zone',
    label: '活动区域',
    span: 24,
  },
  {
    component: 'el-date-picker',
    componentProps: {
      type: 'datetimerange',
      rangeSeparator: '至',
      startPlaceholder: '开始时间',
      endPlaceholder: '结束时间',
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
      defaultTime: [
        new Date(2000, 1, 1, 0, 0, 0),
        new Date(2000, 2, 1, 23, 59, 59),
      ],
    },
    name: 'time',
    label: '活动时间',
    span: 24,
  },
  {
    component: 'el-switch',
    name: 'status',
    label: '活动状态',
    span: 24,
  },
  {
    component: 'el-checkbox-group',
    componentProps: {
      options: [
        { label: '区域1', value: 'zone1' },
        { label: '区域2', value: 'zone2' },
      ],
    },
    name: 'type',
    label: '活动类型',
    span: 24,
  },
  {
    component: 'el-radio-group',
    componentProps: {
      options: [
        { label: '区域1', value: 'zone1' },
        { label: '区域2', value: 'zone2' },
      ],
    },
    name: 'sources',
    label: '活动来源',
    span: 24,
  },
  {

    component: 'el-input-number',
    componentProps: {
      min: 1,
    },
    name: 'nums',
    label: '活动数量',
    span: 24,
  },
  {
    component: 'el-input',
    componentProps: {
      type: 'textarea',
      rows: 4,
    },
    name: 'desc',
    label: '活动描述',
    span: 24,
  },
])
</script>

<template>
  <div class="basic-form-container">
    <div style="font-size: 18px;font-weight: bold;">
      基本使用
    </div>

    formData: {{ formData }}

    <hr>

    <SchemaForm
      v-model="formData"
      label-width="auto"
      :schema="schema"
    />
  </div>
</template>

<style scoped>
.basic-form-container {
  height: 100%;
}
</style>
