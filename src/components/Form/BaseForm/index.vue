<script setup lang="ts">
import type { FormOptions } from '../types'
import { computed, ref, useTemplateRef } from 'vue'
import FormGroupTitle from '@/components/Form/components/FormGroupTitle/index.vue'
import router from '@/router'
import { useAppStore } from '@/stores/modules/app'

const _props = withDefaults(defineProps<{
  formOptions: FormOptions
  collapsed?: boolean
}>(), {
  formOptions: () => ({}),
  collapsed: false,
})

const appStore = useAppStore()

const formRef = useTemplateRef('formRef')
const formRowRef = useTemplateRef('formRowRef')

const model = ref<Record<string, any>>({})

const size = computed(() => appStore.size)

defineExpose({
  formRef,
  formRowRef,
})
</script>

<template>
  <el-form
    v-bind="formOptions.formProps"
    ref="formRef"
    :model="model"
    :size="size"
  >
    <el-row ref="formRowRef" v-bind="formOptions.rowProps">
      <template
        v-for="(item, index) in formOptions.formFields"
        :key="index"
      >
        <el-col
          v-if="item.component === 'title'"
          v-bind="item.colProps"
        >
          <FormGroupTitle :item="item" />
        </el-col>

        <el-col
          v-else
          v-bind="item.colProps"
        >
          <el-form-item
            v-bind="{ ...item.formItemProps }"
          >
            <slot :name="`item_${item.formItemProps.prop}`" :props="item">
              <component
                :is="item.component"
                v-bind="item.componentProps"
                v-model="model[item.formItemProps.prop as string]"
              />
            </slot>
          </el-form-item>
        </el-col>
      </template>

      <slot />
    </el-row>

    <el-button @click="router.back()">
      返回
    </el-button>
  </el-form>
</template>

<style scoped>

</style>
