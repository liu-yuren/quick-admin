<script setup lang="ts">
import { CloseBold } from '@element-plus/icons-vue'
import { onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useTabsViewStore } from '@/stores/modules/tabsView'

const route = useRoute()
const tabsViewStore = useTabsViewStore()

watch(route, (newVal) => {
  tabsViewStore.addTabsView(newVal)
}, { immediate: true })

onMounted(() => {
  // initTabsView()
})

function isActive(item: any) {
  return item.path === route.path
}
</script>

<template>
  <div class="tabs-view-container">
    <a
      v-for="item in tabsViewStore.tabsView"
      :key="item.path"
      :class="[isActive(item) && 'active']"
    >
      {{ item.title }}

      <el-icon class="close"><CloseBold /></el-icon>
    </a>
  </div>
</template>

<style lang="scss" scoped>
.tabs-view-container {
  height: 34px;
  width: 100%;
  // background: #fff;
  // border-bottom: 1px solid #d8dce5;

  a {
    display: inline-block;
    border: 1px solid #d8dce5;
    color: #495060;
    background: #fff;
    font-size: 12px;
    padding: 0 8px 0 12px;
    cursor: pointer;
    height: 26px;
    line-height: 26px;
    margin-left: 5px;

    &:first-of-type {
      margin-left: 15px;
    }

    &:last-of-type {
      margin-right: 15px;
    }

    &.active {
      background: #ffbf13;
      border-color: #ffbf13;
      color: #324157;

      &:hover,
      &:focus {
        color: #324157;
        background: #ffcc42;
      }
    }

    .close {
      width: 16px;
      height: 16px;
      // vertical-align: 2px;
      border-radius: 50%;
      text-align: center;
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      transform-origin: 100% 50%;
      &:before {
        transform: scale(0.6);
        display: inline-block;
        vertical-align: -2px;
      }
      &:hover {
        background-color: #ccc;
        color: #fff;
      }
    }
  }
}
</style>
