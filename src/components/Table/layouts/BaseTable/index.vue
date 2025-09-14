<script setup lang="tsx">
import type { ProTableProps, TableColumnProps, TableColumnShow, TableHandleBtnList, TableHandleBtnParams } from '../../types'
import { Operation, Refresh, Tools } from '@element-plus/icons-vue'
import { computed, onMounted, reactive, ref, useTemplateRef, watch } from 'vue'
import { columnHandleTypes, columnTypes } from '../../constant'
import CustomColSetting from '../../tools/CustomColSetting.vue'
import FullScreen from '../../tools/FullScreen.vue'

const props = withDefaults(defineProps<ProTableProps>(), {
  tableCol: () => ([]),
  pagination: () => ({
    currentPage: 1,
    pageSize: 10,
    pageSizes: [10, 20, 50],
    total: 0,
  }),
})

const emit = defineEmits(['tableHandleClick'])

const tableRef = useTemplateRef('tableRef')
const iframeRef = useTemplateRef('iframeRef')

// 表格自适应高度
const tableMaxHeight = ref('auto')
// 表格列
const tableColumns = ref<TableColumnProps[]>([])

// 自定义设置表格列
const customTableCol = computed(() => props.tableCol.filter(item => !columnTypes.includes(item.type ?? '')))
const checkedCustomCol = ref<Array<string>>(customTableCol.value.map(item => item.prop ?? ''))

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
watch(() => props.tableCol, (val) => {
  tableColumns.value = val
    .map((item) => {
      return {
        ...item,
        show: showTableColumn(item.show),
      }
    })
    .filter(item => item.show)
}, { immediate: true })

onMounted(() => {
  countTableHeight()
  console.log(iframeRef.value, 'iframeRef')
  // if (iframeRef.value) {
  //   console.log(iframeRef.value.contentWindow, 'iframeRef000')
  //   iframeRef.value.contentWindow.onresize = () => {
  //     console.log('000')
  //   }
  // }
  // window.addEventListener('click', (e) => {
  //   console.log('222', e.target.innerText)
  //   if (['展开', '收起'].includes(e.target.innerText)) {
  //     countTableHeight()
  //   }
  // })
  window.onresize = countTableHeight
})

function countTableHeight() {
  setTimeout(() => {
    const top = tableRef.value.$el.getBoundingClientRect().top
    console.log(top, 'top')

    tableMaxHeight.value = `${window.innerHeight - top - 72}px`
    console.log(tableMaxHeight.value, 'tableMaxHeight')
  }, 10)
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

function handleBtnClick({ scope, label, key }: TableHandleBtnParams) {
  emit('tableHandleClick', { scope, key, label })
}

function handleCheckboxChange(checked: Array<string>) {
  tableColumns.value.forEach((item) => {
    if (customTableCol.value.some(v => v.label === item.label)) {
      item.show = checked.includes(item.prop ?? '')
    }
  })
}
</script>

<template>
  <div class="base-table-container">
    <div class="table-header-box">
      <div class="table-header-left">
        <template v-for="item in filterPermissionBtns(tableHeaderBtns, false)" :key="item.key">
          <el-button
            v-if="item.permission"
            v-bind="item.btnProps"
            @click="handleBtnClick({
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
        <el-button :icon="Refresh" circle />
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
      v-bind="tableProps"
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
              v-for="btn in filterPermissionBtns(scope.row.btnList, false)"
              :key="btn.key"
            >
              <el-button
                link
                type="primary"
                size="small"
                @click="handleBtnClick({
                  scope,
                  label: btn.label,
                  key: btn.key,
                })"
              >
                {{ btn.label }}
              </el-button>
            </template>

            <el-dropdown style="padding: 5px 0 0 2px;cursor: pointer;">
              <el-icon color="#409eff">
                <More />
              </el-icon>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item
                    v-for="btn in filterPermissionBtns(scope.row.btnList, true)"
                    :key="btn.key"
                  >
                    <el-button
                      link
                      type="primary"
                      size="small"
                      @click="handleBtnClick({
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

/* .table-header-left {
  display: flex;
  align-items: center;
}

.table-header-right {
  display: flex;
  align-items: center;
} */
</style>
