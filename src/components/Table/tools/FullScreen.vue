<script setup lang="ts">
import { FullScreen } from '@element-plus/icons-vue'
import { useFullscreen } from '@vueuse/core'

const { toggle } = useFullscreen()
</script>

<template>
  <el-button :icon="FullScreen" circle @click="toggle" />
</template>
