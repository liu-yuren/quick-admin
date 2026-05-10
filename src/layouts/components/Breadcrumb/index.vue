<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const breadcrumbList = computed(() => route.matched.filter(item => item.meta?.title))
</script>

<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item v-for="item in breadcrumbList" :key="item.path" :to="{ path: '/' }">
      {{ item.meta?.title }}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<style lang="scss" scoped>
.el-breadcrumb {
  line-height: 30px;
  background: #fff;
  border-left: 10px solid #f1f1f1;
  border-top: 10px solid #f1f1f1;
  padding: 0 0 0 20px;
  box-shadow:
    0 2px 4px rgba(0, 0, 0, 0.12),
    0 0 6px rgba(0, 0, 0, 0.04);

  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
