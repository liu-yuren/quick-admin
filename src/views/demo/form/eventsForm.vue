<script setup lang="ts">
import { Plus, Search } from '@element-plus/icons-vue'
import { ElIcon, ElMessage } from 'element-plus'
import { h, ref } from 'vue'
import SchemaForm from '@/components/SchemaForm/index.vue'

const formData = ref({})

const schema = ref([
  {
    component: 'el-input',
    componentEvents: {
      input: (val: string) => {
        ElMessage({
          type: 'success',
          message: `input 事件触发,值为：${val}`,
        })
      },
      change: (val: string) => {
        ElMessage({
          type: 'success',
          message: `change 事件触发,值为：${val}`,
        })
      },
      focus() {
        ElMessage({
          type: 'success',
          message: `focus 事件触发`,
        })
      },
    },
    name: 'name',
    label: '活动名称',
    span: 24,
  },

])
</script>

<template>
  <div class="basic-form-container">
    <div style="font-size: 18px;font-weight: bold;">
      事件使用
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
