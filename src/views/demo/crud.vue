<script setup lang="ts">
import type { FormOptions } from '@/components/Form'
import { reactive } from 'vue'
import { SearchForm } from '@/components/Form'

const formOptions = reactive<FormOptions>({
  model: {},
  gutter: 20,
  size: 'default',
  labelWidth: 'auto',
  schema: [
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入用户名',
      },
      name: 'Input',
      label: 'Input',
      span: 12,
    },
    {
      component: 'Select',
      componentProps: {
        placeholder: '请输入Select',
        options: [
          {
            label: '选项1',
            value: '1',
          },
          {
            label: '选项2',
            value: '2',
          },
        ],
      },
      name: 'Select',
      label: 'Select',
      span: 12,
    },
  ],
})

function searchFn() {
  console.log('==')
}

function updateSchema() {
  formOptions.schema.push({
    component: 'Input',
    componentProps: {
      placeholder: '请输入用户名',
    },
    name: 'Input',
    label: 'Input',
    span: 12,
  })
}

function increSchema() {
  // 去掉最后一个元素
  formOptions.schema.pop()
}
</script>

<template>
  <div class="container">
    <SearchForm :form-options="formOptions" @search="searchFn" />

    <el-button @click="formOptions.size = 'small'">
      更新gutter
    </el-button>

    <el-button @click="updateSchema">
      更新 schema
    </el-button>

    <el-button @click="increSchema">
      删除 schema
    </el-button>
  </div>
</template>

<style scoped>
.container {
  padding: 20px;
  height: 100%;
  background-color: #fff;
  box-sizing: border-box;
}
</style>
