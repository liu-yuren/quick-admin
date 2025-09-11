<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useAppStore } from '@/stores/modules/app'
import { useAuthStore } from '@/stores/modules/auth'
import Breadcrumb from '../components/Breadcrumb/index.vue'
import CollapseIcon from '../components/Header/CollapseIcon.vue'
import NavBar from '../components/Header/NavBar.vue'
import SubMenu from '../components/Menu/SubMenu.vue'
import TagsView from '../components/TagsView/index.vue'

const route = useRoute()
const appStore = useAppStore()
const authStore = useAuthStore()

const activeMenu = computed(() => route.name)
</script>

<template>
  <el-container>
    <el-aside :width="appStore.isCollapse ? '64px' : '200px'">
      <el-scrollbar>
        <el-menu
          :router="false"
          :default-active="activeMenu"
          :collapse="appStore.isCollapse"
          :unique-opened="false"
          :collapse-transition="false"

          active-text-color="#ffd04b"
          background-color="#545c64"
          text-color="#fff"
        >
          <SubMenu :menu-list="authStore.sideBarMenu" />
        </el-menu>
      </el-scrollbar>
    </el-aside>

    <el-container direction="vertical">
      <el-header class="header-box">
        <CollapseIcon style="padding-right: 15px;" />
        <NavBar />
      </el-header>

      <TagsView class="tags-view-box" />
      <Breadcrumb class="breadcrumb-box" />

      <el-main>
        <el-scrollbar>
          <router-view />
        </el-scrollbar>
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped>
.header-box {
  display: flex;
  align-items: center;
  padding: 0 15px;
  border-bottom: 1px solid #d8dce5;
  box-sizing: border-box;
}

.tags-view-box {
  width: 100%;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #d8dce5;
  padding-left: 10px;
  box-sizing: border-box;
  padding: 4px 0;
}

.breadcrumb-box {
  padding: 8px 0;
  margin-left: 15px;
}

.el-aside {
  border-right: 1px solid var(--el-menu-border-color);
  background-color: #545c64;
}

.el-main {
  background-color: #f2f3f5;
  padding: 10px 12px;
}
</style>
