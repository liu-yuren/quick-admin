<script setup lang="ts">
import { Plus, Search } from '@element-plus/icons-vue'
import { ElIcon } from 'element-plus'
import { h, ref } from 'vue'
import SchemaForm from '@/components/SchemaForm/index.vue'

const formData = ref({})

const schema = ref([
  {
    component: 'el-input',
    componentSlots: () => ({
      prefix: 'prefix1',
      suffix: h(ElIcon, { class: 'el-icon' }, { default: () => h(Search) }),
    }),
    name: 'name',
    label: '活动名称',
    span: 24,
  },
  {
    component: 'el-input',
    componentSlots: () => ({
      prefix: () => h('span', { class: 'text-red-600' }, 'prefix2'),
      suffix: () => h('i', { class: 'el-icon' }, h(Plus)),
    }),
    name: 'vin',
    label: h('span', { class: 'text-red-600' }, '水电费元'),
    span: 24,
    tips: 'vin逗号分隔',
    tooltip: '注意点',
  },
  {
    component: 'el-input',
    componentSlots: () => ({
      prepend: () => h('span', { class: 'text-red-600' }, 'prepend'),
      append: () => h('i', { class: 'el-icon' }, h(Plus)),
    }),
    name: 'vin1',
    label: () => h('span', { class: 'text-red-600' }, '干活元'),
    span: 24,
    tips: 'vin逗号分隔',
    tooltip: '注意点',
  },
])
</script>

<template>
  <div class="basic-form-container">
    <div style="font-size: 18px;font-weight: bold;">
      插槽使用
    </div>

    formData: {{ formData }}

    <hr>

    <SchemaForm
      v-model="formData"
      label-width="120px"
      :schema="schema"
    />
  </div>
</template>

<style scoped>
.basic-form-container {
  height: 100%;
}
</style>
