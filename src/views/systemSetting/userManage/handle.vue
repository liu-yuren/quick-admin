<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { SchemaForm } from '@/components/Form'
import { formOptions } from './handle'

const router = useRouter()

function goBack() {
  router.back()
}
</script>

<template>
  <div class="user-handle-page">
    <!-- <SchemaForm :form-options="formOptions" /> -->

    操作页面
  </div>
</template>

<style scoped>
.user-handle-page {
  /* padding: 20px; */
}
</style>
