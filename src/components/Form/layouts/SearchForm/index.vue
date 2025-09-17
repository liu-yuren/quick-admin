<script setup lang="ts">
import type { FormOptions } from '../../types'
import { useCssVar, useResizeObserver } from '@vueuse/core'
import { computed, inject, onMounted, ref, useTemplateRef } from 'vue'
import { useAppStore } from '@/stores/modules/app'
import BaseForm from '../../BaseForm/index.vue'

withDefaults(defineProps<{ formOptions: FormOptions }>(), {
  formOptions: () => ({}),
})

const proTalbeContext = inject('proTableContextKey', undefined)
console.log(proTalbeContext, 'proTalbeContext')

// const emit = defineEmits(['search', 'reset'])

const appStore = useAppStore()

const searchFormRef = useTemplateRef('searchFormRef')

// 是否默认折叠搜索项
const collapsed = ref(true)
const maxHeight = ref('auto')

// 组件大小
const size = computed(() => appStore.size)

// 根据组件大小 获取组件高度
const componentHeight = computed(() => {
  const map: Record<string, string> = {
    large: useCssVar('--el-component-size-large', null).value ?? '',
    default: useCssVar('--el-component-size', null).value ?? '',
    small: useCssVar('--el-component-size-small', null).value ?? '',
  }
  return map[size.value]
})

const height = computed(() => {
  return collapsed.value ? maxHeight.value : componentHeight.value
})

onMounted(() => {
  // 表单项变化时重新计算高度
  useResizeObserver(searchFormRef.value?.formRowRef.$el, (entries) => {
    const entry = entries[0]
    const { height } = entry.contentRect
    // 减去form-item margin-bottom: 18px
    maxHeight.value = `${height - 18}px`
  })
})

async function search() {
  try {
    await searchFormRef.value?.formRef.validate()
    proTalbeContext?.emit('search')
  }
  catch (error) {
    console.error(error)
  }
}

function reset() {
  searchFormRef.value?.formRef.resetFields()
  proTalbeContext?.emit('reset')
}
</script>

<template>
  <div class="search-form-container">
    <div class="search-form-box">
      <BaseForm
        id="searchForm"
        ref="searchFormRef"
        :form-options="formOptions"
        :collapsed="collapsed"
        :style="{ height, overflow: 'hidden', transition: 'height 0.3s', flex: 1 }"
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

    <el-divider content-position="right">
      <el-button
        type="primary"
        link
        @click="collapsed = !collapsed"
      >
        {{ collapsed ? '展开' : '收起' }}
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
