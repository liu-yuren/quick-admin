<script setup lang="ts">
import { Refresh } from '@element-plus/icons-vue'

function refreshTable() {
  location.reload()
}
</script>

<template>
  <el-tooltip
    class="box-item"
    effect="dark"
    content="刷新"
    placement="top"
  >
    <el-button :icon="Refresh" circle @click="refreshTable" />
  </el-tooltip>
</template>
