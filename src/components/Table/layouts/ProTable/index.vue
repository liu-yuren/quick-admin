<script lang="ts" setup>
import { provide, reactive, toRefs } from 'vue'
import { SearchForm } from '@/components/Form'
import { BaseTable } from '@/components/Table'
import { proTableContextKey } from '../../constant'
import { proTableEmits, proTableProps } from './proTable'

const props = defineProps(proTableProps)
const emit = defineEmits(proTableEmits)

provide(
  proTableContextKey,
  reactive({
    ...toRefs(props),
    emit,
  }),
)
</script>

<template>
  <div class="pro-table-container" style="height: 100%;">
    <SearchForm :form-options="props.formOptions" />

    <BaseTable />

    <div class="common-table-page">
      <el-pagination
        :page-sizes="[10, 20, 50]"
        :background="true"
        layout="total,sizes,prev,pager,next"
        :total="400"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.common-table-page {
  display: flex;
  justify-content: center;
  padding: 12px 0;
}
</style>
