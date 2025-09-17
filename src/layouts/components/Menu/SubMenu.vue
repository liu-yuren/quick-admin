<script setup lang="ts">
import { useRouter } from 'vue-router'

defineProps<{ menuList: any }>()

const router = useRouter()
async function handleClickMenu(subItem: any) {
  if (subItem.meta.isLink)
    return window.open(subItem.meta.isLink, '_blank')

  // 安全检查：确保 subItem.name 存在且不为空
  if (!subItem.name) {
    console.warn('Route name is missing for menu item:', subItem)
    return
  }

  // 使用 async/await 来处理路由跳转
  try {
    await router.push({ name: subItem.name })
  }
  catch (error) {
    console.warn('Failed to navigate to route:', subItem.name, error)
  }
}

function isVisibleMenu(item: any) {
  return !item?.meta?.hidden
}

function getVisibleChildren(item: any): any[] {
  return Array.isArray(item?.children)
    ? item.children.filter((child: any) => !child?.meta?.hidden)
    : []
}

function hasVisibleChildren(item: any) {
  return getVisibleChildren(item).length > 0
}
</script>

<template>
  <template v-for="subItem in menuList" :key="subItem.name">
    <template v-if="isVisibleMenu(subItem)">
      <el-sub-menu v-if="hasVisibleChildren(subItem)" :index="subItem.name">
        <template #title>
          <el-icon v-if="subItem.meta.icon">
            <component :is="subItem.meta.icon" />
          </el-icon>
          <span class="sle">{{ subItem.meta.title }}</span>
        </template>
        <SubMenu :menu-list="getVisibleChildren(subItem)" />
      </el-sub-menu>

      <el-menu-item v-else :index="subItem.name" @click="handleClickMenu(subItem)">
        <el-icon v-if="subItem.meta.icon">
          <component :is="subItem.meta.icon" />
        </el-icon>
        <template #title>
          <span class="sle">{{ subItem.meta.title }}</span>
        </template>
      </el-menu-item>
    </template>
  </template>
</template>
