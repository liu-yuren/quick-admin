<script setup lang="ts">
import type { Component } from 'vue'
import { computed } from 'vue'
import { useAppStore } from '@/stores/modules/app'
import LayoutClassic from './LayoutClassic/index.vue'

const LayoutComponentsMap: Record<string, Component> = {
  classic: LayoutClassic,
}

const appStore = useAppStore()

const font = computed(() => ({ color: appStore.isDark ? 'rgba(255, 255, 255, .15)' : 'rgba(0, 0, 0, .15)' }))
const isWatermark = computed(() => appStore.isWatermark)
const layout = computed(() => appStore.layout)
</script>

<template>
  <el-watermark id="watermark" :font="font" :content="isWatermark && 'liuyuren'">
    <component :is="LayoutComponentsMap[layout]" />
  </el-watermark>
</template>
