<script setup lang="ts">
import { useAppStore } from '@/stores/modules/app'

const appStore = useAppStore()
</script>

<template>
  <el-icon class="collapse-icon" @click="appStore.setAppSoreState('isCollapse', !appStore.isCollapse)">
    <component :is="appStore.isCollapse ? 'expand' : 'fold'" />
  </el-icon>
</template>

<style scoped>
.collapse-icon {
  font-size: 20px;
  cursor: pointer;
}
</style>
