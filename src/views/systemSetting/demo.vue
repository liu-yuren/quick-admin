<script setup lang="ts">
// import type { FormSchemaItems } from '@/components/common/FormSchema/types'
import { Plus, Search } from '@element-plus/icons-vue'
import { ElIcon } from 'element-plus'
import { h, ref } from 'vue'
// import FormSchema from '@/components/common/FormSchema/index.vue'

const formData = ref({})

const schema = ref([
  {
    component: 'el-input',
    componentEvents: {
      input: (val) => {
        console.log(val, 'input')
      },
      change: (val) => {
        console.log(val, 'change')
      },
      focus() {
        console.log('focus')
      },
    },
    componentSlots: () => ({
      prefix: 'prefix1',
      suffix: h(ElIcon, { class: 'el-icon' }, { default: () => h(Search) }),
    }),
    name: 'username',
    label: '姓名',
    span: 24,
    tips: 'vin逗号分隔',
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
  <div class="demo" style="height: 100%;">
    {{ formData }}
    <hr>
    <!-- <FormSchema
      v-model="formData"
      :schema="schema"
      label-width="auto"
    >
      <template #username>
        <el-input />
      </template>
    </FormSchema> -->
  </div>
</template>
