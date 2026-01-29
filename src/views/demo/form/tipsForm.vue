<script setup lang="ts">
import { ref } from 'vue'
import SchemaForm from '@/components/SchemaForm/index.vue'

const formData = ref({})

const schema = ref([
  {
    component: 'el-input',
    name: 'vin',
    label: '水电费元',
    span: 24,
    tips: 'vin逗号分隔',
    tooltip: '水电费元',
  },
  {
    component: 'el-input',
    name: 'vin1',
    label: '干活元',
    span: 24,
    tips: 'vin逗号分隔',
    tooltip: '干活元',
  },
])
</script>

<template>
  <div class="basic-form-container">
    <div style="font-size: 18px;font-weight: bold;">
      提示使用
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
