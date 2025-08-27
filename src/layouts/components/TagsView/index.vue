<template>
  <div style="height: 34px;line-height: 28px;">
    <el-button
      v-for="item in 10"
      :key="item"
      size="small"
      color="rgba(36, 80, 216, 1)"
    >
      button
    </el-button>
  </div>
</template>
