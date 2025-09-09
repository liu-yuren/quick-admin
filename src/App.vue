<script setup lang="ts">
import { onMounted } from 'vue'
import { useAppStore } from './stores/modules/app'

const appStore = useAppStore()

onMounted(() => {
  // 初始化主题色
  // Object.keys(appStore.themeColor).forEach((key) => {
  //   const enumKey = key as any // 类型断言将键转换为 ElementPlusModifyEnum 类型
  //   // if (appStore.themeColor[enumKey] !== appStore.themeColor[enumKey]) {
  //   appStore.setThemeColor(enumKey, appStore.themeColor[enumKey])
  //   // }
  // })
})
</script>

<template>
  <router-view />
</template>
