<script setup lang="ts">
import { FullScreen } from '@element-plus/icons-vue'
import { useFullscreen } from '@vueuse/core'

const { toggle, isFullscreen } = useFullscreen()
</script>

<template>
  <el-tooltip
    class="box-item"
    effect="dark"
    :content="!isFullscreen ? '全屏' : '退出全屏'"
    placement="top"
  >
    <el-button :icon="FullScreen" circle @click="toggle" />
  </el-tooltip>
</template>
