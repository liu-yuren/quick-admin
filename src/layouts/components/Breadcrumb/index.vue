<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
console.log(route, '===')

const breadcrumbList = computed(() => route.matched.filter(item => item.meta?.title))
</script>

<template>
  <el-breadcrumb separator="/" style="height: 30px;line-height: 30px;">
    <el-breadcrumb-item v-for="item in breadcrumbList" :key="item.path" :to="{ path: '/' }">
      {{ item.meta?.title }}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>
