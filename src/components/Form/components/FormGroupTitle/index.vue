<script setup lang="ts">
defineProps({
  item: {
    type: Object,
    default: () => ({}),
  },
})
</script>

<template>
  <p class="group-title">
    {{ item.title }}
    <el-tooltip
      v-if="item.tips"
      class="item"
      effect="dark"
      :placement="item.placement || 'top'"
    >
      <template #content>
        <div v-html="item.tips" />
      </template>
      <i class="el-icon-question" />
    </el-tooltip>
  </p>

  <el-divider content-position="left">
    {{ item.title }}
  </el-divider>
</template>

<style scoped>
.group-title,
.el-divider__text {
  font-size: 18px;
  padding-bottom: 14px;
  font-weight: 700;
  border-bottom: 1px solid #ccc;
}
</style>
