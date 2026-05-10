<script setup lang="ts">
import { Plus, Search } from '@element-plus/icons-vue'
import { ElIcon } from 'element-plus'
import { h, ref } from 'vue'
import SchemaFormTemplate from '@/components/SchemaForm/index.vue'

const schema = [
  {
    component: 'el-input',
    componentProps: {
      placeholder: '请输入用户名',
    },
    componentSlots: {
      prefix: 'prefix1',
      suffix: h(ElIcon, { class: 'el-icon' }, { default: () => h(Search) }),
      prepend: () => h('span', { class: 'text-red-600' }, 'prepend'),
      append: () => h('i', { class: 'el-icon' }, h(Plus)),
    },
    show: (model: any) => {
      return model.password
    },
    name: 'input',
    label: 'input',
    rules: [{ required: true, message: '请输入用户名' }],
    span: 12,
  },
  {
    component: 'el-input',
    componentProps: {
      type: 'password',
      placeholder: '请输入密码',
    },
    name: 'password',
    label: 'password',
    rules: [{ required: true, message: '请输入密码' }],
    span: 12,
  },
  {
    component: 'el-input',
    componentProps: {
      type: 'textarea',
      placeholder: '请输入备注',
    },
    name: 'textarea',
    label: 'textarea',
    rules: [{ required: true, message: '请输入备注' }],
    span: 24,
  },
  {
    component: 'el-select',
    componentProps: {
      placeholder: '请输入用户名',
      options: [
        {
          value: 'Option1',
          label: 'Option1',
        },
        {
          value: 'Option2',
          label: 'Option2',
        },
        {
          value: 'Option3',
          label: 'Option3',
        },
        {
          value: 'Option4',
          label: 'Option4',
        },
        {
          value: 'Option5',
          label: 'Option5',
        },
      ],
    },
    name: 'Select',
    label: 'Select',
    rules: [{ required: true, message: '请输入用户名' }],
    span: 12,
  },
  {
    component: 'el-switch',
    componentProps: {
      activeValue: 1,
      inactiveValue: 2,
    },
    name: 'Switch',
    label: 'Switch',
    rules: [{ required: true, message: '请输入用户名' }],
    span: 24,
  },
  {
    component: 'el-radio-group',
    componentProps: {
      placeholder: '请输入用户名',
      options: [
        {
          value: 'Option1',
          label: 'Option1',
        },
        {
          value: 'Option2',
          label: 'Option2',
        },
        {
          value: 'Option3',
          label: 'Option3',
        },
        {
          value: 'Option4',
          label: 'Option4',
        },
        {
          value: 'Option5',
          label: 'Option5',
        },
      ],
    },
    name: 'radio',
    label: 'radio',
    rules: [{ required: true, message: '请输入用户名' }],
    span: 24,
  },
  {
    component: 'el-cascader',
    componentProps: {
      placeholder: '请输入用户名',
      options: [
        {
          value: 'guide',
          label: 'Guide',
          children: [
            {
              value: 'disciplines',
              label: 'Disciplines',
              children: [
                {
                  value: 'consistency',
                  label: 'Consistency',
                },
              ],
            },
          ],
        },

      ],
      style: { width: '100%' },
    },
    name: 'cascader',
    label: 'Cascader',
    rules: [{ required: true, message: '请输入用户名' }],
    span: 24,
  },
  {
    component: 'el-checkbox-group',
    componentProps: {
      placeholder: '请输入用户名',
      options: [
        {
          value: 'Option1',
          label: 'Option1',
        },
        {
          value: 'Option2',
          label: 'Option2',
        },
        {
          value: 'Option3',
          label: 'Option3',
        },
        {
          value: 'Option4',
          label: 'Option4',
        },
        {
          value: 'Option5',
          label: 'Option5',
        },
      ],
    },
    name: 'el-checkbox',
    label: 'checkbox',
    rules: [{ required: true, message: '请输入用户名' }],
    span: 24,
  },
]

const formData = ref({})

function submit() {
  console.log('11')
}
</script>

<template>
  <div>
    <!-- SchemaForm - formApi：  -->
    <!-- <Form /> -->

    <!-- <hr> -->

    SchemaFormTemplate - formData：{{ formData }}
    <SchemaFormTemplate
      v-model="formData"
      label-width="auto"
      :schema="schema"
      @submit="submit"
    />
  </div>
</template>
