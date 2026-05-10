<script setup lang="ts">
import CollapseIcon from './CollapseIcon.vue'
import NavBar from './NavBar.vue'
</script>

<template>
  <header height="70px" class="header-container">
    <CollapseIcon style="padding-right: 15px;" />
    <NavBar />
  </header>
</template>

<style lang="scss" scoped>
.header-container {
  height: 70px;
  display: flex;
  align-items: center;
  padding: 0 15px;
  border-bottom: 1px solid #d8dce5;
  box-sizing: border-box;
  background-color: #fff;
}
</style>
