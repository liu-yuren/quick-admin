<script setup lang="tsx">
import type { HandleTableActionParams, TableColumnProps, TableColumnShow, TableHandleBtnList } from '../../types'
import { computed, inject, onMounted, ref, useTemplateRef } from 'vue'
import { proTableContextKey } from '../../constant'
import { useTableHeight } from '../../hooks/useTableHeight'
import { CustomColSetting, FullScreen, Refresh } from '../../tools'

const tableRef = useTemplateRef('tableRef')

const proTalbeContext = inject(proTableContextKey, undefined)
const { tableMaxHeight } = useTableHeight(tableRef)

const tableCol = ref<TableColumnProps[]>([])

// 可见表格列（过滤显示状态）
const visibleColumns = computed(() => {
  return tableCol.value.filter(item => item.show)
})

// 表格头部按钮（已过滤权限）
const headerBtns = computed(() => {
  return proTalbeContext?.tableHeaderBtns?.filter(item => item.permission) ?? []
})

/**
 * 表格操作列---过滤权限按钮
 * @param {TableHandleBtnList} btnList 按钮列表
 * @param {boolean} isMore 是否包含在更多按钮中
 * @returns {TableHandleBtnList}
 */
const filterPermissionBtns = computed(() => {
  return (btnList: TableHandleBtnList[] = [], isMore: boolean) => {
    return btnList?.filter(item => item.permission && Boolean(item.isMore) === isMore)
  }
})

onMounted(() => {
  // 初始化表格列
  tableCol.value = proTalbeContext?.tableCol?.map(item => ({
    ...item,
    show: shouldColumnShow(item.show),
  })) || []
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
  // 如果未定义显示配置，默认显示列
  if (typeof show === 'undefined') {
    return true
  }
  if (typeof show === 'function') {
    return show()
  }
  return Boolean(show)
}

/**
 * 表格操作列---按钮点击事件
 * @param {HandleTableActionParams} params 按钮点击参数
 */
function handleTableAction(params: HandleTableActionParams) {
  proTalbeContext?.emit('handle-table-action', params)
}
</script>

<template>
  <div class="base-table-container">
    <div class="table-header-box">
      <div class="table-header-left">
        <template
          v-for="item in headerBtns"
          :key="item.key"
        >
          <el-button
            v-if="item.permission"
            v-bind="item.btnProps"
            @click="handleTableAction({
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
        <Refresh />
        <FullScreen />
        <CustomColSetting v-model:table-col="tableCol" />
      </div>
    </div>

    <el-table
      ref="tableRef"
      :max-height="tableMaxHeight"
      border
      stripe
      v-bind="proTalbeContext?.tableProps"
    >
      <template v-for="item in visibleColumns" :key="item.prop">
        <el-table-column
          v-if="item.prop !== 'handle'"
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
              <span class="over-hidden">{{ formatEmptyValue(scope.row[item.prop || '']) }}</span>
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
                @click="handleTableAction({
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
                      @click="handleTableAction({
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
