<script setup lang="ts">
import type { UploadFile } from 'element-plus'
import type { FormOptions, FormSchema } from '../types'
import { computed, reactive, toRefs, useTemplateRef } from 'vue'
import { componentMap, defaultComponentProps } from '../constant'

const props = defineProps<{ formOptions: FormOptions }>()
const emit = defineEmits(['submit'])

const {
  model,
  schema,
  gutter,
  wrapperCol = { xs: 24 },
  ...args
} = toRefs(props.formOptions)

const formRef = useTemplateRef('formRef')

// 图片上传组件 - 图片预览
const img = reactive({
  showPreview: false,
  srcList: [] as Array<string>,
})

// 将 args 中的值解包，以便在模板中使用
const formProps = computed(() => {
  return Object.fromEntries(
    Object.entries(args).map(([key, value]) => [key, value.value]),
  )
})

// 表单项是否可见
function isColVisible(item: FormSchema) {
  if (typeof item.show === 'undefined') {
    return true
  }
  if (typeof item.show === 'function') {
    return item.show(model.value)
  }
  return item.show
}

// 动态解析组件
function resolveComponent(item: FormSchema) {
  const component = typeof item.component === 'string'
    ? componentMap[item.component]
    : item.component

  if (!component) {
    // 组件未注册
    console.warn(`Component ${component} is not registered`)
  }

  return component
}

// 合并组件的默认属性和自定义属性
function mergeComponentProps(item: FormSchema) {
  // 如果组件是字符串类型（预设组件）
  if (typeof item.component === 'string') {
    // 获取默认属性
    const defaultProps = defaultComponentProps.get(item.component) ?? {}
    const props = {
      ...defaultProps,
    }

    // 特殊处理图片上传组件
    // if (item.component === 'ImgUpload') {
    //   return {
    //     ...props,
    //     onPreview: (uploadFile: UploadFile) => {
    //       img.srcList = [uploadFile.url!]
    //       img.showPreview = true
    //     },
    //     ...item.componentProps,
    //   }
    // }

    // 其他组件直接合并默认属性和自定义属性
    return { ...props, ...item.componentProps }
  }

  // 如果是自定义组件（非字符串类型），返回空对象或自定义属性
  return item.componentProps ?? {}
}

// 提交
async function submit() {
  await formRef.value.validate()
  emit('submit')
}

defineExpose({
  formRef,
})
</script>

<template>
  <el-form
    ref="formRef"
    :model="model"
    v-bind="formProps"
    @submit.prevent="submit"
  >
    <el-row :gutter="gutter">
      <template v-for="item in schema" :key="item.name">
        <el-col
          v-if="isColVisible(item)"
          :span="item.span"
          v-bind="wrapperCol"
        >
          <el-form-item
            :required="item.required"
            :prop="item.name"
            :label="item.label"
            :label-width="item.labelWidth"
            :rules="item.rules"
          >
            <template #label>
              <slot :name="`${item.name}_label`" />
            </template>

            <slot :name="item.name" :props="item">
              <component
                :is="resolveComponent(item)"
                v-bind="mergeComponentProps(item)"
                v-model="model[item.name]"
              >
                <template
                  v-for="(slotConfig, slotName) in item.componentSlots || {}"
                  :key="slotName"
                  #[slotName]="slotScope"
                >
                  <template v-if="typeof slotConfig === 'string'">
                    {{ slotConfig }}
                  </template>

                  <template v-else-if="slotConfig">
                    <component :is="slotConfig(slotScope)" />
                  </template>
                </template>
              </component>
            </slot>
          </el-form-item>
        </el-col>
      </template>
    </el-row>

    <slot name="btnArea" />

    <el-image-viewer
      v-if="img.showPreview"
      show-progress
      :url-list="img.srcList"
      @close="img.showPreview = false"
    />
  </el-form>
</template>
