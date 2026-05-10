<script setup lang="ts">
import { ref } from 'vue'
import SearchForm from '@/components/SearchForm/index.vue'

const schema = ref([
  {
    component: 'el-input',
    componentProps: {
      placeholder: '请输入用户名',
    },
    name: 'Input',
    label: 'Input',
    span: 8,
  },
  {
    component: 'el-input',
    componentProps: {
      placeholder: '请输入用户名',
    },
    name: 'Input',
    label: 'Input',
    span: 8,
  },
  {
    component: 'el-input',
    componentProps: {
      placeholder: '请输入用户名',
    },
    name: 'Input',
    label: 'Input',
    span: 8,
  },
  // {
  //   component: 'el-input',
  //   componentProps: {
  //     placeholder: '请输入用户名',
  //   },
  //   name: 'Input',
  //   label: 'Input',
  //   span: 6,
  // },
  // {
  //   component: 'el-input',
  //   componentProps: {
  //     placeholder: '请输入用户名',
  //   },
  //   name: 'Input',
  //   label: 'Input',
  //   span: 6,
  // },
])

const collapsed = ref(false)
</script>

<template>
  <div>
    <SearchForm
      :collapsed="collapsed"
      :schema="schema"
    />
  </div>
</template>
