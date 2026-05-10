<script setup lang="ts">
import ToolBarleft from '../ToolBar/ToolBarLeft/index.vue'
import ToolBarRight from '../ToolBar/ToolBarRight/index.vue'
</script>

<template>
  <div class="table-tool-bar">
    <ToolBarleft />
    <ToolBarRight />
  </div>
</template>

<style scoped>
.table-tool-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
</style>
