<script setup lang="ts">
import { useRouter } from 'vue-router'

defineProps<{ menuList: any }>()

const router = useRouter()
function handleClickMenu(subItem: any) {
  if (subItem.meta.isLink)
    return window.open(subItem.meta.isLink, '_blank')
  router.push(subItem.path)
}
</script>

<template>
  <template v-for="subItem in menuList" :key="subItem.path">
    <el-sub-menu v-if="subItem.children?.length" :index="subItem.path">
      <template #title>
        <el-icon v-if="subItem.meta.icon">
          <component :is="subItem.meta.icon" />
        </el-icon>
        <span class="sle">{{ subItem.meta.title }}</span>
      </template>
      <SubMenu :menu-list="subItem.children" />
    </el-sub-menu>
    <el-menu-item v-else :index="subItem.path" @click="handleClickMenu(subItem)">
      <el-icon v-if="subItem.meta.icon">
        <component :is="subItem.meta.icon" />
      </el-icon>
      <template #title>
        <span class="sle">{{ subItem.meta.title }}</span>
      </template>
    </el-menu-item>
  </template>
</template>
