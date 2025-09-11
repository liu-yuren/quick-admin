<script setup lang="ts">
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

// function initTabsView() {
//   tabsViewStore.addTabsView()
// }
</script>

<template>
  <div class="tags-view-container">
    <el-button
      v-for="item in tabsViewStore.tabsView"
      :key="item.path"
      size="small"
      :color="item.path === route.path ? 'rgba(36, 80, 216, 1)' : ''"
    >
      {{ item.title }}
    </el-button>
  </div>
</template>
