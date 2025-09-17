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
      <el-header height="70px" class="header-box">
        <CollapseIcon style="padding-right: 15px;" />
        <NavBar />
      </el-header>

      <TagsView class="tags-view-box" />
      <Breadcrumb class="breadcrumb-box" />

      <el-main>
        <div class="main-container">
          <!-- <el-scrollbar> -->
          <router-view />
          <!-- </el-scrollbar> -->
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<style lang="scss" scoped>
.header-box {
  display: flex;
  align-items: center;
  padding: 0 15px;
  border-bottom: 1px solid #d8dce5;
  box-sizing: border-box;
  background-color: #fff;
}

.tags-view-box {
  width: 100%;
  border-bottom: 1px solid #d8dce5;
  padding-top: 2px;
  padding-left: 15px;
  box-sizing: border-box;
  background-color: #fff;
}

.breadcrumb-box {
  padding: 8px 0 8px 20px;
  border-left: 10px solid #f1f1f1;
  border-top: 6px solid #f1f1f1;
  box-shadow:
    0 2px 4px rgba(0, 0, 0, 0.12),
    0 0 6px rgba(0, 0, 0, 0.04);
  position: relative;
  background-color: #fff;
}

.el-aside {
  border-right: 1px solid var(--el-menu-border-color);
  background-color: #545c64;
  transition: width 0.2s;

  .el-menu {
    border-right: none;
  }
}

.el-main {
  padding: 0;
  margin: 6px 0 0 10px;
  background-color: #fff;
  position: relative;

  .main-container {
    padding: 8px 10px 0 10px;
    // padding: 30px 40px;
    padding: 30px 40px;
    height: 100%;
    box-sizing: border-box;
    overflow: hidden;
  }
}
</style>
