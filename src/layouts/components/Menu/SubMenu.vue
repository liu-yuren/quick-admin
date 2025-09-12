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
    // 如果通过 name 跳转失败，尝试使用 path
    if (subItem.path) {
      try {
        await router.push(subItem.path)
      }
      catch (pathError) {
        console.error('Failed to navigate using path:', subItem.path, pathError)
      }
    }
  }
}
</script>

<template>
  <template v-for="subItem in menuList" :key="subItem.name">
    <el-sub-menu v-if="subItem.children?.length" :index="subItem.name">
      <template #title>
        <el-icon v-if="subItem.meta.icon">
          <component :is="subItem.meta.icon" />
        </el-icon>
        <span class="sle">{{ subItem.meta.title }}</span>
      </template>
      <SubMenu :menu-list="subItem.children" />
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
