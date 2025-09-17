<script lang="ts" setup>
import { ProTable } from '@/components/Table'

function handleTableClick(scope: any) {
  console.log('Table button clicked:', scope)
}
function search(params: any) {
  console.log('Search with params:', params)
}
function reset() {
  console.log('Form reset')
}
</script>

<template>
  <ProTable
    @search="search"
    @reset="reset"
    @handle-table-click="handleTableClick"
  />
</template>
