<script setup lang="ts">
import { Close } from '@element-plus/icons-vue'
import { onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import router from '@/router'
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
    <div
      v-for="item in tabsViewStore.tabsView"
      :key="item.path"
      class="tabs-view-list"
      :class="[isActive(item) && 'active']"
      @click="router.push({ path: item.path })"
    >
      <div class="tabs-view-wrapper">
        <span>{{ item.title }}</span>

        <el-icon class="close" color="#18181bcc">
          <Close />
        </el-icon>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.tabs-view-container {
  display: flex;

  .tabs-view-list {
    position: relative;
    background-color: hsl(240 5% 96%);
    border-radius: calc(0.5rem - 2px);
    font-size: 14px;
    cursor: pointer;
    margin-bottom: 2px;
    display: flex;

    & + .tabs-view-list {
      margin-left: 4px;
    }

    .close {
      width: 12px;
      height: 12px;
      vertical-align: 2px;
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

  .active {
    background: #ffbf13;
    border-color: #ffbf13;
    color: #324157;
    border-radius: calc(0.5rem - 2px) calc(0.5rem - 2px) 0 0;
    margin-bottom: 0px;

    &:hover,
    &:focus {
      color: #324157;
      background: #ffcc42;
    }

    &::before {
      content: '';
      width: 10px;
      height: 10px;
      position: absolute;
      left: -10px;
      bottom: 0;
      background: radial-gradient(circle at 0 0, transparent 10px, #ffbf13 11px);
    }

    &::after {
      content: '';
      width: 10px;
      height: 10px;
      position: absolute;
      right: -10px;
      bottom: 0;
      background: radial-gradient(circle at 100% 0, transparent 10px, #ffbf13 11px);
    }
  }

  .tabs-view-wrapper {
    padding: 6px 10px;
    display: flex;
    align-items: center;
    gap: 6px;
  }
}
</style>
