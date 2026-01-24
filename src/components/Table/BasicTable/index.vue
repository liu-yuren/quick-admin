<script setup lang="tsx">
import type { BasicTable } from '../types'
import { DCaret } from '@element-plus/icons-vue'
import Sortable from 'sortablejs'
import { computed, onMounted, toRefs, useTemplateRef } from 'vue'
import ActionColumn from '../components/ActionColumn/index.vue'
import { columnHandleTypes, columnTypes } from '../constant'
import { formatEmptyValue, shouldColumnShow } from '../utils'

const props = defineProps<BasicTable>()
const emit = defineEmits(['dragSort'])

const { tableCol, tableData, tableProps } = toRefs(props)

const tableRef = useTemplateRef('tableRef')

/**
 * 可见的表格列（过滤掉隐藏的列）
 * @returns {Array} 过滤后的列配置
 */
const visibleColumns = computed(() => {
  if (tableCol.value?.length) {
    return tableCol.value
      .map(item => ({
        ...item,
        type: item.type ?? 'default',
        align: item.align ?? 'center',
        show: shouldColumnShow(item.show),
      }))
      .filter(item => item.show)
  }
  return []
})

onMounted(() => {
  // 初始化拖拽排序
  dragSort()
})

// 表格行的拖拽排序
function dragSort() {
  const tbody = document.querySelector(`tbody`) as HTMLElement
  Sortable.create(tbody, {
    handle: '.drag-sort',
    animation: 300,
    onEnd(params) {
      const { newIndex, oldIndex } = params
      emit('dragSort', { newIndex, oldIndex })
    },
  })
}

defineExpose({
  tableRef,
})
</script>

<template>
  <!-- :max-height="tableMaxHeight" -->
  <el-table
    ref="tableRef"
    border
    stripe
    :data="tableData"
    v-bind="tableProps"
  >
    <template v-for="item in visibleColumns" :key="item.prop">
      <el-table-column
        v-if="columnTypes.includes(item.type)"
        :reserve-selection="item.type === 'selection'"
        v-bind="item"
      >
        <!-- 自定义表头 -->
        <template #header>
          <slot :name="`${item.prop}_header`" :scope="item" />
        </template>

        <template #default="scope">
          <!-- 默认列：显示普通文本 -->
          <template v-if="item.type === 'default'">
            <div>
              <span>{{ formatEmptyValue(scope.row[item.prop || '']) }}</span>
              <span v-if="item.unit">{{ item.unit }}</span>
            </div>
          </template>

          <!-- 可展开列 -->
          <template v-if="item.type === 'expand'">
            <component :is="item.render" v-if="item.render" :scope="scope" />
            <slot v-else :name="item.type" :scope="scope" />
          </template>

          <!-- 拖拽排序列 -->
          <template v-if="item.type === 'sort'">
            <el-tag class="drag-sort" style="cursor: move">
              <el-icon style="cursor: move">
                <DCaret />
              </el-icon>
            </el-tag>
          </template>

          <!-- 图片列 -->
          <template v-if="item.type === 'image'">
            <el-image
              :src="scope.row[item.prop]"
              preview-teleported
              :preview-src-list="[scope.row[item.prop]]"
              fit="cover"
              :style="item.imageStyles"
            />
          </template>

          <!-- 自定义列 -->
          <template v-if="item.type === 'custom'">
            <slot :name="item.prop" :scope="scope" />
          </template>
        </template>
      </el-table-column>

      <!-- 操作列 -->
      <ActionColumn v-if="columnHandleTypes.includes(item.type)" v-bind="item" />
    </template>

    
  </el-table>
</template>
