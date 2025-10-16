<script setup lang="ts">
import type { FormOptions } from '../types'
import { useCssVar, useResizeObserver } from '@vueuse/core'
import { computed, onMounted, ref, useTemplateRef } from 'vue'
import SchemaForm from '../SchemaForm/index.vue'

const props = defineProps<{ formOptions: FormOptions }>()
const emit = defineEmits(['search', 'reset'])

const searchFormRef = useTemplateRef('searchFormRef')

// 控制表单的折叠状态
const isFormCollapsed = ref(true)

// 搜索表单的最大高度
const formMaxHeight = ref('auto')

// 根据组件大小获取组件高度
const componentHeight = computed(() => {
  const map: Record<string, string> = {
    large: useCssVar('--el-component-size-large', null).value ?? '',
    default: useCssVar('--el-component-size', null).value ?? '',
    small: useCssVar('--el-component-size-small', null).value ?? '',
  }
  return map[props.formOptions.size ?? 'default']
})

// 动态计算表单高度（折叠时为最大高度，展开时为组件高度）
const formHeight = computed(() => {
  return isFormCollapsed.value ? formMaxHeight.value : componentHeight.value
})

// 判断是否需要显示展开/收起的分隔线（当表单内容超过一行时显示）
const shouldShowDivider = computed(() => {
  const max = Number.parseFloat(formMaxHeight.value.replace('px', ''))
  const min = Number.parseFloat(componentHeight.value.replace('px', ''))
  return max > min
})

onMounted(() => {
  const formEl = searchFormRef.value?.formRef.$el
  const rowEl = formEl.children[0]

  // 监听表单行的尺寸变化，动态调整最大高度
  useResizeObserver(rowEl, (entries) => {
    const entry = entries[0]
    const { height } = entry.contentRect

    // 减去表单项的底部外边距（margin-bottom: 18px）
    formMaxHeight.value = `${height - 18}px`
  })
})

// 搜索
async function search() {
  try {
    await searchFormRef.value?.formRef.validate()
    emit('search')
  }
  catch (error) {
    console.error('表单验证失败:', error)
  }
}

// 重置
function reset() {
  searchFormRef.value?.formRef.resetFields()
  emit('reset')
}
</script>

<template>
  <div class="search-form-container">
    <div class="search-form-box">
      <SchemaForm
        ref="searchFormRef"
        :form-options="formOptions"
        :style="{
          height: formHeight,
          overflow: 'hidden',
          transition: 'height 0.3s',
          flex: 1,
        }"
      />

      <div class="search-form-btns">
        <el-button type="primary" @click="search">
          搜索
        </el-button>
        <el-button @click="reset">
          重置
        </el-button>
      </div>
    </div>

    <el-divider v-if="shouldShowDivider" content-position="right">
      <el-button
        type="primary"
        link
        @click="isFormCollapsed = !isFormCollapsed"
      >
        {{ isFormCollapsed ? '展开' : '收起' }}
      </el-button>
    </el-divider>
  </div>
</template>

<style scoped lang="scss">
.search-form-box {
  display: flex;
  gap: 20px;
}
.search-form-btns {
  flex-shrink: 0;
}
</style>
