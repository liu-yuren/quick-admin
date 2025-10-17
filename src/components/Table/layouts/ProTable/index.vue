<script lang="ts" setup>
import type { ProTableEmits, ProTableProps } from '../../types'
import { provide, reactive, toRefs } from 'vue'
import { SearchForm } from '@/components/Form'
import { BasicTable } from '@/components/Table'
import { proTableContextKey } from '../../constant'

const props = withDefaults(defineProps<ProTableProps>(), {
  formOptions: () => ({}),
  tableProps: () => ({}),
})
const emit = defineEmits<ProTableEmits>()

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

    <BasicTable />

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
