<script setup lang="ts">
import type { HandleTableActionParams, TableToolBarBtns } from '../../types'
import { inject } from 'vue'
import { proTableContextKey } from '../../BaseTable/constant'

const proTalbeContext = inject(proTableContextKey, undefined)

/**
 * 表格操作列---过滤按钮
 * @param {TableToolBarBtns[]} btns 操作按钮集合
 * @param {boolean} isDropdown 是否显示在下拉菜单中
 * @returns {TableToolBarBtns[]} 过滤后的按钮集合
 */
function filterActionBtns(btns: TableToolBarBtns[] = [], isDropdown: boolean): TableToolBarBtns[] {
  return btns?.filter(btn => btn.permission && Boolean(btn.isDropdown) === isDropdown)
}

/**
 * 检查是否有下拉菜单按钮
 * @param {TableToolBarBtns[]} btns 按钮列表
 * @returns {boolean} 是否存在下拉菜单按钮
 */
function isDropdownBtn(btns: TableToolBarBtns[] = []): boolean {
  return btns?.some(btn => btn.isDropdown)
}

/**
 * 表格操作列---按钮点击事件
 * @param {HandleTableActionParams} params 按钮点击参数
 */
function handleTableAction(params: HandleTableActionParams): void {
  proTalbeContext?.emit('handle-table-action', params)
}
</script>

<template>
  <el-table-column v-bind="$attrs">
    <template #default="scope">
      <template
        v-for="btn in filterActionBtns(scope.row.actionBtns, false)"
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

      <el-dropdown
        v-if="isDropdownBtn(scope.row.actionBtns)"
        style="padding: 6px 0 0 6px;cursor: pointer;"
      >
        <el-icon color="#409eff">
          <More />
        </el-icon>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item
              v-for="btn in filterActionBtns(scope.row.actionBtns, true)"
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
