<script setup lang="ts">
import type { FormOptions } from '../../types'
import BaseForm from '../../BaseForm/index.vue'

withDefaults(defineProps<{ formOptions: FormOptions }>(), {
  formOptions: () => ({}),
})
</script>

<template>
  <div>
    <BaseForm :form-options="formOptions" />
  </div>
</template>
