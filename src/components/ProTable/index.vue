<script setup lang="tsx">
import type {
  ProTableEmits,
  ProTableProps,
  TableColumnShow,
  TableHandleBtnClickParams,
  TableHandleBtnProps,
} from './types'
import { CaretBottom, DCaret } from '@element-plus/icons-vue'
import Sortable from 'sortablejs'
import { computed, onMounted, useTemplateRef } from 'vue'

const props = withDefaults(defineProps<ProTableProps>(), {
  maxTableHandleBtnCount: 4,
})
const emit = defineEmits<ProTableEmits>()

const columnTypes = [
  'selection',
  'radio',
  'index',
  'expand',
  'sort',
  'checked',
  'default',
  'image',
  'custom',
]

const tableRef = useTemplateRef('tableRef')

// 存储 popover 引用的 Map
const popoverRefs = new Map<number, any>()

// 格式化，空字符串则返回'-'
function formatEmptyValue(val: any) {
  return val ?? '-'
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

/**
 * 可见的表格列（过滤掉隐藏的列）
 * @returns {Array} 过滤后的列配置
 */
const visibleColumns = computed(() => {
  if (props.tableCol?.length) {
    return props.tableCol
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
    onEnd({ newIndex, oldIndex }) {
      const params = { newIndex, oldIndex }
      emit('dragSort', params)
    },
  })
}

/**
 * 表格操作列---过滤操作按钮
 * @param {TableToolBarBtns[]} btns 操作按钮集合
 * @returns {TableToolBarBtns[]} 过滤后的权限按钮集合
 */
function filterPermissionBtn(btnList: TableHandleBtnProps[] = []) {
  return btnList?.filter(item => item.permission)
}

/**
 * 表格操作按钮点击事件
 * @param {HandleTableActionParams} params 按钮点击参数
 */
function tableHandleClick({ scope, key, label }: TableHandleBtnClickParams) {
  // 关闭当前行的 popover（$index如果存在代表有 popover）
  if (scope.$index !== undefined) {
    const popover = popoverRefs.get(scope.$index)
    popover?.hide()
  }

  emit('tableHandleClick', { scope, key, label })
}
</script>

<template>
  <!-- :max-height="tableMaxHeight" -->
  <el-table
    ref="tableRef"
    class="pro-table"
    border
    stripe
    :data="tableData"
    :header-row-style="{
      'font-weight': '500',
      'color': '#676767',
    }"
    v-bind="$attrs"
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
      <el-table-column v-if="item.type === 'handle'" v-bind="item">
        <template #default="scope">
          <template v-for="(btn, btnIndex) of filterPermissionBtn(scope.row.tableHandleBtnList)">
            <el-button
              v-if="btnIndex < maxTableHandleBtnCount"
              :key="btn.key"
              link
              type="primary"
              size="small"
              v-bind="btn.btnProps"
              @click.stop="tableHandleClick({
                scope,
                label: btn.label,
                key: btn.key,
              })"
            >
              {{ btn.label }}
            </el-button>
          </template>

          <el-popover
            :ref="(el: any) => el && popoverRefs.set(scope.$index, el)"
            placement="bottom-end"
            trigger="click"
            :popper-style="{
              'width': '100px',
              'min-width': '100px',
            }"
          >
            <template v-for="(btn, btnIndex) of filterPermissionBtn(scope.row.tableHandleBtnList)">
              <p
                v-if="btnIndex >= maxTableHandleBtnCount"
                :key="btn.key"
              >
                <el-button
                  link
                  type="primary"
                  size="small"
                  v-bind="btn.btnProps"
                  @click.stop="tableHandleClick({
                    scope,
                    label: btn.label,
                    key: btn.key,
                  })"
                >
                  {{ btn.label }}
                </el-button>
              </p>
            </template>

            <template #reference>
              <el-icon
                color="#409eff"
                style="
                  vertical-align: middle;
                  display: inline;
                  margin: 0 0 0 8px;
                "
              >
                <CaretBottom />
              </el-icon>
            </template>
          </el-popover>
        </template>
      </el-table-column>
    </template>
  </el-table>
</template>
