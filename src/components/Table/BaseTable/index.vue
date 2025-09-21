<script setup lang="tsx">
import type { TableColumnProps, TableColumnShow } from '../types'
import { DCaret } from '@element-plus/icons-vue'
import Sortable from 'sortablejs'
import { computed, inject, onMounted, ref, useTemplateRef } from 'vue'
import ActionColumn from '../components/ActionColumn/index.vue'
import ToolBarleft from '../components/ToolBar/ToolBarLeft/index.vue'
import ToolBarRight from '../components/ToolBar/ToolBarRight/index.vue'
import { useTableHeight } from '../hooks/useTableHeight'
import { columnTypes, proTableContextKey } from './constant'

const proTalbeContext = inject(proTableContextKey, undefined)

const tableRef = useTemplateRef('tableRef')
const { tableMaxHeight } = useTableHeight(tableRef)

const tableCol = ref<TableColumnProps[]>([])

// 可见表格列（过滤显示状态）
const visibleColumns = computed(() => {
  return tableCol.value.filter(item => item.show)
})

onMounted(() => {
  tableCol.value = proTalbeContext?.tableCol?.map(item => ({
    ...item,
    show: shouldColumnShow(item.show),
  })) || []

  dragSort()
})

// 格式化，空字符串则返回'-'
function formatEmptyValue(val: any) {
  if (typeof val === 'string' && !val.trim()) {
    return '-'
  }
  return val
}

/**
 * 表格列---是否显示
 * @param show 列显示配置，可以是布尔值、函数或未定义
 * @returns 如果列应该显示则返回true，否则返回false
 */
function shouldColumnShow(show: TableColumnShow | undefined) {
  // 如果未定义，则默认显示列
  if (typeof show === 'undefined') {
    return true
  }
  if (typeof show === 'function') {
    return show()
  }
  return Boolean(show)
}

// 表格拖拽排序
function dragSort() {
  const tbody = document.querySelector(`tbody`) as HTMLElement
  Sortable.create(tbody, {
    handle: '.drag-sort',
    animation: 300,
    onEnd(params) {
      const { newIndex, oldIndex } = params
      proTalbeContext?.emit('drag-sort', { newIndex, oldIndex })
    },
  })
}
</script>

<template>
  <div class="base-table-container">
    <div class="table-tool-bar">
      <ToolBarleft />
      <ToolBarRight v-model:table-col="tableCol" />
    </div>

    <el-table
      ref="tableRef"
      :max-height="tableMaxHeight"
      border
      stripe
      v-bind="proTalbeContext?.tableProps"
    >
      <template v-for="item in visibleColumns" :key="item.prop">
        <!-- selection || radio || index || expand || sort -->
        <el-table-column
          v-if="item.type && columnTypes.includes(item.type)"
          :align="item.align ?? 'center'"
          :reserve-selection="item.type === 'selection'"
          v-bind="item"
        >
          <template #default="scope">
            <!-- expand -->
            <template v-if="item.type === 'expand'">
              <component :is="item.render" v-bind="scope" v-if="item.render" />
              <slot v-else :name="item.type" v-bind="scope" />
            </template>

            <!-- radio -->
            <el-radio v-if="item.type === 'radio'">
              <i />
            </el-radio>

            <!-- sort -->
            <el-tag v-if="item.type === 'sort'" class="drag-sort" style="cursor: move">
              <el-icon style="cursor: move">
                <DCaret />
              </el-icon>
            </el-tag>
          </template>
        </el-table-column>

        <!-- 普通数据列：非操作列且非特殊类型列 -->
        <el-table-column
          v-if="item.prop !== 'handle' && !(item.type && columnTypes.includes(item.type))"
          :align="item.align ?? 'center'"
          v-bind="item"
        >
          <template #default="scope">
            <!-- 自定义列：使用插槽渲染自定义内容 -->
            <template v-if="item.isCustom">
              <slot :name="item.prop" :scope="scope" />
            </template>

            <!-- 图片列：显示图片内容 -->
            <template v-else-if="item.isImage">
              <el-image
                :style="item.style ?? { width: '100px' }"
                :src="scope.row.imgUrl"
                preview-teleported
                :preview-src-list="[scope.row.imgUrl]"
                fit="cover"
              />
            </template>

            <!-- 默认列：显示普通文本数据 -->
            <template v-else>
              <span class="over-hidden">{{ formatEmptyValue(scope.row[item.prop || '']) }}</span>
              <span v-if="item.unit">{{ item.unit }}</span>
            </template>
          </template>
        </el-table-column>

        <!-- 操作列 -->
        <ActionColumn v-if="item.prop === 'handle'" v-bind="item" />
      </template>
    </el-table>
  </div>
</template>

<style lang="scss" scoped>
.base-table-container {
  padding-top: 20px;

  .table-tool-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }
}
</style>
