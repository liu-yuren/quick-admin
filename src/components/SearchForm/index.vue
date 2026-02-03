<script setup lang="ts">
import { ArrowDown, RefreshRight, Search } from '@element-plus/icons-vue'
import { computed, ref } from 'vue'
import Form from '../SchemaForm/index.vue'

const props = defineProps({
  collapsed: {
    type: Boolean,
    default: false,
  },
  // 默认展示的行数https://www.naiveui.com/zh-CN/os-theme/components/grid#offset.vue
  collapsedRows: {
    type: Number,
    default: 4,
  },
  isCollapsed: {
    type: Boolean,
    default: true,
  },
  schema: {
    type: Array,
    default: () => ([]),
  },
})

/**
 * 情况一：
 * collapsedRows：默认展示的行数
 */

const formData = ref({})

// 初始化折叠查询条件的断点，从第几个查询条件开始（默认是从第3个，因为默认配置的span值是6）
const initConditionFoldLen = 3

// 展示右侧按钮组（折叠||收起按钮）
const showFoldBtn = computed(() => {
  return props.schema.length > initConditionFoldLen
})

// 右侧按钮组动态计算的span值
const rSpanCount = computed(() => {
  let totalSpan = 0
  if (initConditionFoldLen > 0) {
    if (!props.collapsed) {
      totalSpan = props.schema.reduce((prev: number, next: any) => {
        return prev + next.span
      }, 0)
    }
    else {
      const sliceCondList = props.schema.slice(0, initConditionFoldLen)
      totalSpan = sliceCondList.reduce((prev: number, next: any) => {
        return prev + next.span
      }, 0)
    }
  }
  else {
    totalSpan = props.schema.reduce((prev: number, next: any) => {
      return prev + next.span
    }, 0)
  }
  return 24 - (totalSpan % 24)
})

function search() {}

function reset() {}

function toggleChange() {
}
</script>

<template>
  <div>
    rSpanCount：{{ rSpanCount }} - showFoldBtn：{{ showFoldBtn }}
    <Form v-model="formData" :schema="schema">
      <template #custom-col>
        <el-col :span="rSpanCount" class="el-col-wrapper">
          <el-form-item class="btn-group-item flex-end">
            <el-button type="primary" @click="search">
              查询
            </el-button>

            <el-button plain @click="reset">
              重置
            </el-button>

            <el-button
              v-show="showFoldBtn"
              type="primary"
              link
              @click="toggleChange"
            >
              {{ collapsed ? "展开" : "收起" }}

              <el-icon v-if="collapsed">
                <ArrowDown />
              </el-icon>

              <el-icon v-else>
                <ArrowUp />
              </el-icon>
            </el-button>
          </el-form-item>
        </el-col>
      </template>
    </Form>
  </div>
</template>

<style lang="scss" scoped>
 .el-col-wrapper {
  display: flex;

  .btn-group-item {
    flex: 1;
    display: flex;

    :deep(.el-form-item__content) {
      flex: 1;
      display: flex;
      align-items: center;
    }

    &.flex-end {
      :deep(.el-form-item__content) {
        justify-content: flex-end;
      }
    }
  }
}
</style>
