<script setup lang="tsx">
import type { ProTableProps, TableColumnProps, TableColumnShow, TableHandleBtnList, TableHandleBtnParams } from '../../types'
import { Operation, Refresh, Tools } from '@element-plus/icons-vue'
import { useElementBounding, useResizeObserver } from '@vueuse/core'
import { computed, inject, onMounted, reactive, ref, useTemplateRef, watch } from 'vue'
import { columnHandleTypes, columnTypes } from '../../constant'
import CustomColSetting from '../../tools/CustomColSetting.vue'
import FullScreen from '../../tools/FullScreen.vue'

// const props = withDefaults(defineProps<ProTableProps>(), {
//   tableCol: () => ([]),
//   pagination: () => ({
//     currentPage: 1,
//     pageSize: 10,
//     pageSizes: [10, 20, 50],
//     total: 0,
//   }),
// })

// const emit = defineEmits(['tableHandleClick'])

const proTalbeContext = inject('proTableContextKey', undefined)
console.log(proTalbeContext, 'baseTable --- proTalbeContext')

const tableRef = useTemplateRef('tableRef')

// 表格自适应高度
const tableMaxHeight = ref('auto')
// 表格列
const tableColumns = ref<TableColumnProps[]>(proTalbeContext?.tableCol || [])

// 自定义设置表格列
const customTableCol = computed(() => tableColumns.value.filter(item => !columnTypes.includes(item.type ?? '')))
const checkedCustomCol = ref<Array<string>>(customTableCol.value.map(item => item.prop ?? ''))

// 表格头部-按钮
const tableHeaderBtnList = computed(() => {
  return proTalbeContext?.tableHeaderBtns.filter(item => item.permission)
})
/**
 * 过滤权限按钮
 * @param {TableHandleBtnList} btnList 按钮列表
 * @param {boolean} isMore 是否包含在更多按钮中
 * @returns {TableHandleBtnList}
 */
const filterPermissionBtns = computed(() => {
  return (btnList: TableHandleBtnList[] = [], isMore: boolean) => {
    return btnList?.filter(item => item.permission && Boolean(item.isMore) === isMore)
  }
})

// watch(() => props.tableCol, (val) => {
//   tableColumns.value = val
//     .map((item) => {
//       return {
//         ...item,
//         show: showTableColumn(item.show),
//       }
//     })
//     .filter(item => item.show)
// }, { immediate: true })

onMounted(() => {
  countTableHeight()
  window.onresize = countTableHeight

  // 开始监视表单元素
  useResizeObserver(document.querySelector('.search-form-container'), () => {
    countTableHeight()
  })
})

// 计算表格高度
function countTableHeight() {
  // 获取表格距离顶部的高度
  const { top } = useElementBounding(tableRef)

  // 延时获取，避免获取不到高度且防止页面抖动
  setTimeout(() => {
    // 表格高度 = 可视区域高度 - 表格距离顶部的高度 - 分页高度56px
    tableMaxHeight.value = `${window.innerHeight - top.value - 56}px`
  }, 100)
}

function filterText(val: any) {
  // 如果值为空，则返回'-'
  return ['', null, undefined].includes(val) ? '-' : val
}

function showTableColumn(show: TableColumnShow | undefined) {
  if (typeof show === 'undefined') {
    return true
  }
  if (typeof show === 'function') {
    return show()
  }
  return Boolean(show)
}

function tableHandleClick({ scope, label, key }: TableHandleBtnParams) {
  proTalbeContext?.emit('table-handle-click', { scope, key, label })
}

function handleCheckboxChange(checked: Array<string>) {
  tableColumns.value.forEach((item) => {
    if (customTableCol.value.some(v => v.label === item.label)) {
      item.show = checked.includes(item.prop ?? '')
    }
  })
}

function a() {
  location.reload()
}
</script>

<template>
  <div class="base-table-container">
    <div class="table-header-box">
      <div class="table-header-left">
        <template
          v-for="item in tableHeaderBtnList"
          :key="item.key"
        >
          <el-button
            v-if="item.permission"
            v-bind="item.btnProps"
            @click="tableHandleClick({
              scope: {},
              label: item.label,
              key: item.key,
            })"
          >
            {{ item.label }}
          </el-button>
        </template>
      </div>

      <div class="table-header-right">
        <el-button :icon="Refresh" circle @click="a" />
        <FullScreen />
        <el-popover placement="bottom-end" trigger="click">
          <template #reference>
            <el-button :icon="Operation" circle />
          </template>

          <el-checkbox-group v-model="checkedCustomCol" @change="handleCheckboxChange">
            <el-checkbox
              v-for="item in customTableCol"
              :key="item.prop"
              :label="item.prop"
              :disabled="columnHandleTypes.includes(item.prop ?? '')"
            >
              {{ item.label }}
            </el-checkbox>
          </el-checkbox-group>
        </el-popover>
        <el-button :icon="Tools" circle />
      </div>
    </div>

    <el-table
      ref="tableRef"
      :max-height="tableMaxHeight"
      border
      stripe
      v-bind="proTalbeContext?.tableProps"
    >
      <template v-for="item in tableColumns" :key="item.prop">
        <el-table-column
          v-if="showTableColumn(item.show) && item.prop !== 'handle'"
          align="center"
          v-bind="item"
        >
          <template #default="scope">
            <template
              v-if="
                item.type !== 'selection'
                  && item.type !== 'index'
                  && !item.isCustom
                  && !item.isImage
              "
            >
              <span class="over-hidden">{{ filterText(scope.row[item.prop || '']) }}</span>
              <span v-if="item.unit">{{ item.unit }}</span>
            </template>

            <template v-if="item.isCustom">
              <slot :name="item.prop" :scope="scope" />
            </template>

            <template v-if="item.isImage">
              <el-image
                style="width: 100px;"
                :src="scope.row.imgUrl"
                preview-teleported
                :preview-src-list="[scope.row.imgUrl]"
                fit="cover"
              />
            </template>
          </template>
        </el-table-column>

        <!-- 操作列 -->
        <el-table-column
          v-if="item.prop === 'handle'"
          v-bind="item"
        >
          <template #default="scope">
            <template
              v-for="btn in filterPermissionBtns(scope.row.actionBtns, false)"
              :key="btn.key"
            >
              <el-button
                link
                type="primary"
                size="small"
                @click="tableHandleClick({
                  scope,
                  label: btn.label,
                  key: btn.key,
                })"
              >
                {{ btn.label }}
              </el-button>
            </template>

            <el-dropdown style="padding: 6px 0 0 6px;cursor: pointer;">
              <el-icon color="#409eff">
                <More />
              </el-icon>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item
                    v-for="btn in filterPermissionBtns(scope.row.actionBtns, true)"
                    :key="btn.key"
                  >
                    <el-button
                      link
                      type="primary"
                      size="small"
                      @click="tableHandleClick({
                        scope,
                        label: btn.label,
                        key: btn.key,
                      })"
                    >
                      {{ btn.label }}
                    </el-button>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </template>
        </el-table-column>
      </template>
    </el-table>
  </div>
</template>

<style lang="scss" scoped>
.iframe-box {
  // position: absolute;
  // top: 0;
  // z-index: -1;
  width: 0;
  display: none;
  height: 100%;
}
.base-table-container {
  padding-top: 20px;

  .table-header-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }
}

// ::v-deep(.el-table .el-table__header th.el-table__cell) {
//   background: #f2f3f4;
//   color: #191919;
//   font-size: 14px;
//   border-radius: 4px;
// }

// .el-table__header th.el-table__cell {
//   background: #f2f3f4;
//   color: #191919;
//   font-size: 14px;
//   border-radius: 4px;
// }

/* .table-header-left {
  display: flex;
  align-items: center;
}

.table-header-right {
  display: flex;
  align-items: center;
} */
</style>
