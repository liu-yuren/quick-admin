<!-- SearchFormWrapper.vue -->
<script setup>
import { ArrowDown, ArrowUp } from '@element-plus/icons-vue'
import { onMounted, onUnmounted, ref, useSlots } from 'vue'

defineProps({
  gutter: {
    type: Number,
    default: 20,
  },
})

const emit = defineEmits(['search', 'reset'])
const isMore = ref(false)
const moreText = ref('更多筛选')

function toggleMore() {
  isMore.value = !isMore.value
  moreText.value = isMore.value ? '收起筛选' : '更多筛选'
}

const hasExtraSlot = useSlots().extra

function search() {
  emit('search')
}

function reset() {
  emit('reset')
}

function handleEvent(e) {
  if (e.keyCode === 13) {
    search()
    e.preventDefault()
  }
}

// 监听父级表单的keydown事件，当按下回车键时触发查询操作
onMounted(() => {
  const wrapper = document.querySelector('.search-form-wrapper')
  try {
    if (Array.from(wrapper.parentNode.classList).includes('el-form')) {
      wrapper.parentNode.addEventListener('keydown', handleEvent)
      onUnmounted(() => {
        wrapper.parentNode.removeEventListener('keydown', handleEvent)
      })
    }
  }
  catch (e) {
    console.error(e)
  }
})
</script>

<template>
  <div
    class="search-form-wrapper"
    :style="{ '--form-item-padding': `${gutter / 2}px`, 'margin': `0 -${gutter / 2}px -18px` }"
  >
    <slot />
    <template v-if="isMore">
      <slot name="extra" />
    </template>
    <div class="search-form-wrapper__op">
      <el-button type="success" @click="search">
        查询
      </el-button>
      <el-button @click="reset">
        重置
      </el-button>
      <el-link
        v-if="hasExtraSlot"
        class="ml10"
        type="primary"
        :underline="false"
        @click="toggleMore"
      >
        {{ moreText }}
        <el-icon style="margin-left: 5px">
          <ArrowUp v-if="isMore" /><ArrowDown v-else />
        </el-icon>
      </el-link>
    </div>
  </div>
</template>

<style lang="scss">
.search-form-wrapper {
  &__op {
    float: right;
    padding: 0 var(--form-item-padding);
  }
  .el-form-item {
    padding: 0 var(--form-item-padding);
    margin-right: 0; // 表单inline模式会有margin-rihgt影响，需要重置它
  }
}
</style>
