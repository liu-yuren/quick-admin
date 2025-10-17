<script setup lang="tsx">
import type { FormOptions } from '@/components/Form'
import { Plus } from '@element-plus/icons-vue'
import { reactive } from 'vue'
import { SchemaForm, updateFormSchema } from '@/components/Form'

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
      dependencies: {
        required() {},
        label() {},
      },
      show: (model) => {
        return model.password
      },
      name: 'input',
      label: 'input',
      rules: [{ required: true, message: '请输入用户名' }],
      span: 12,
    },
    {
      component: 'Password',
      componentProps: {
        placeholder: '请输入密码',
      },
      name: 'password',
      label: 'password',
      rules: [{ required: true, message: '请输入密码' }],
      span: 12,
    },
    {
      component: 'Textarea',
      componentProps: {
        placeholder: '请输入备注',
      },
      name: 'textarea',
      label: 'textarea',
      rules: [{ required: true, message: '请输入备注' }],
      span: 24,
    },
    {
      component: 'Select',
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
      component: 'Switch',
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
      component: 'RadioGroup',
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
      component: 'Cascader',
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
                  {
                    value: 'feedback',
                    label: 'Feedback',
                  },
                  {
                    value: 'efficiency',
                    label: 'Efficiency',
                  },
                  {
                    value: 'controllability',
                    label: 'Controllability',
                  },
                ],
              },
              {
                value: 'navigation',
                label: 'Navigation',
                children: [
                  {
                    value: 'side nav',
                    label: 'Side Navigation',
                  },
                  {
                    value: 'top nav',
                    label: 'Top Navigation',
                  },
                ],
              },
            ],
          },
          {
            value: 'component',
            label: 'Component',
            children: [
              {
                value: 'basic',
                label: 'Basic',
                children: [
                  {
                    value: 'layout',
                    label: 'Layout',
                  },
                  {
                    value: 'color',
                    label: 'Color',
                  },
                  {
                    value: 'typography',
                    label: 'Typography',
                  },
                  {
                    value: 'icon',
                    label: 'Icon',
                  },
                  {
                    value: 'button',
                    label: 'Button',
                  },
                ],
              },
              {
                value: 'form',
                label: 'Form',
                children: [
                  {
                    value: 'radio',
                    label: 'Radio',
                  },
                  {
                    value: 'checkbox',
                    label: 'Checkbox',
                  },
                  {
                    value: 'input',
                    label: 'Input',
                  },
                  {
                    value: 'input-number',
                    label: 'InputNumber',
                  },
                  {
                    value: 'select',
                    label: 'Select',
                  },
                  {
                    value: 'cascader',
                    label: 'Cascader',
                  },
                  {
                    value: 'switch',
                    label: 'Switch',
                  },
                  {
                    value: 'slider',
                    label: 'Slider',
                  },
                  {
                    value: 'time-picker',
                    label: 'TimePicker',
                  },
                  {
                    value: 'date-picker',
                    label: 'DatePicker',
                  },
                  {
                    value: 'datetime-picker',
                    label: 'DateTimePicker',
                  },
                  {
                    value: 'upload',
                    label: 'Upload',
                  },
                  {
                    value: 'rate',
                    label: 'Rate',
                  },
                  {
                    value: 'form',
                    label: 'Form',
                  },
                ],
              },
              {
                value: 'data',
                label: 'Data',
                children: [
                  {
                    value: 'table',
                    label: 'Table',
                  },
                  {
                    value: 'tag',
                    label: 'Tag',
                  },
                  {
                    value: 'progress',
                    label: 'Progress',
                  },
                  {
                    value: 'tree',
                    label: 'Tree',
                  },
                  {
                    value: 'pagination',
                    label: 'Pagination',
                  },
                  {
                    value: 'badge',
                    label: 'Badge',
                  },
                ],
              },
              {
                value: 'notice',
                label: 'Notice',
                children: [
                  {
                    value: 'alert',
                    label: 'Alert',
                  },
                  {
                    value: 'loading',
                    label: 'Loading',
                  },
                  {
                    value: 'message',
                    label: 'Message',
                  },
                  {
                    value: 'message-box',
                    label: 'MessageBox',
                  },
                  {
                    value: 'notification',
                    label: 'Notification',
                  },
                ],
              },
              {
                value: 'navigation',
                label: 'Navigation',
                children: [
                  {
                    value: 'menu',
                    label: 'Menu',
                  },
                  {
                    value: 'tabs',
                    label: 'Tabs',
                  },
                  {
                    value: 'breadcrumb',
                    label: 'Breadcrumb',
                  },
                  {
                    value: 'dropdown',
                    label: 'Dropdown',
                  },
                  {
                    value: 'steps',
                    label: 'Steps',
                  },
                ],
              },
              {
                value: 'others',
                label: 'Others',
                children: [
                  {
                    value: 'dialog',
                    label: 'Dialog',
                  },
                  {
                    value: 'tooltip',
                    label: 'Tooltip',
                  },
                  {
                    value: 'popover',
                    label: 'Popover',
                  },
                  {
                    value: 'card',
                    label: 'Card',
                  },
                  {
                    value: 'carousel',
                    label: 'Carousel',
                  },
                  {
                    value: 'collapse',
                    label: 'Collapse',
                  },
                ],
              },
            ],
          },
          {
            value: 'resource',
            label: 'Resource',
            children: [
              {
                value: 'axure',
                label: 'Axure Components',
              },
              {
                value: 'sketch',
                label: 'Sketch Templates',
              },
              {
                value: 'docs',
                label: 'Design Documentation',
              },
            ],
          },
        ],
        style: { width: '100%' },
      },
      name: 'Cascader',
      label: 'Cascader',
      rules: [{ required: true, message: '请输入用户名' }],
      span: 24,
    },
    {
      component: 'CheckboxGroup',
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
      name: 'checkbox',
      label: 'checkbox',
      rules: [{ required: true, message: '请输入用户名' }],
      span: 24,
    },
    {
      component: 'ImgUpload',
      componentProps: {
      },
      componentSlots: {
        default: () => <el-icon><Plus /></el-icon>,
      },
      name: 'Upload',
      label: 'Upload',
      rules: [{ required: true, message: '请输入用户名' }],
      span: 24,
    },
    {
      component: 'DatePicker',
      label: '时间：',
      name: 'date',
      rules: [{
        required: true,
        validator: checkDate,
      }],
      componentProps: {
        type: 'daterange',
        placeholder: '日期',
        disabledDate,
      },
      span: 24,
    },
  ],
})

function disabledDate(time: Date) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const minDate = new Date(today)
  minDate.setDate(today.getDate() - 90)

  const isAfterToday = time >= today
  const isBeforeMinDate = time < minDate

  return isAfterToday || isBeforeMinDate
}

function checkDate(_rule: any, value: any, callback: any) {
  if ((value && value?.length === 0) || !value) {
    callback(new Error('请输入时间'))
  }

  else if (value && value.length === 2) {
    const [start, end] = value
    const diffDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24))

    if (diffDays > 14) {
      callback(new Error('时间范围不能超过14天'))
    }
    callback()
  }
  else {
    callback()
  }
}

function updateFormSchemaFn() {
  updateFormSchema(formOptions.schema, {
    textarea: {
      label: '123',
    },
  })
}
</script>

<template>
  <div class="container">
    model: {{ formOptions.model }}
    <el-button @click="formOptions.gutter++">
      更新gutter
    </el-button>

    <el-button @click="formOptions.size = 'small'">
      更新size
    </el-button>

    <el-button @click="updateFormSchemaFn">
      更新 FormSchema
    </el-button>

    <hr>

    <SchemaForm :form-options="formOptions">
      <template #Switch="{ props }">
        <el-switch v-model="formOptions.model[props.name]" v-bind="props.componentProps" />
      </template>

      <template #btnArea>
        <el-button type="primary">
          确定
        </el-button>
        <el-button type="default">
          取消
        </el-button>
      </template>
    </SchemaForm>
  </div>
</template>

<style scoped>
.container {
  padding: 20px;
  height: 100%;
  background-color: #fff;
  box-sizing: border-box;
  overflow: auto;
}
</style>
