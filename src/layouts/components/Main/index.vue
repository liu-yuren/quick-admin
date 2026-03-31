<script setup lang="ts">

</script>

<template>
  <section class="main-container">
    <transition name="fade-transform" mode="out-in">
      <div v-if="true" style="width: 100%;">
        <router-view />
      </div>
    </transition>
  </section>
</template>

<style lang="scss" scoped>
.main-container {
  // padding: 30px 40px;
  // padding: 30px 40px;
  box-sizing: border-box;
  overflow: hidden;
  background: #fff;
}
</style>
