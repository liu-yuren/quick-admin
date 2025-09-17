<template>
  <el-button
    link
    type="primary"
    size="small"
    @click="handleBtnClick({
      scope,
      label: btn.label,
      key: btn.key,
    })"
  >
    {{ btn.label }}
  </el-button>
</template>
