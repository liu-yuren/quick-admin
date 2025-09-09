<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useAppStore } from '@/stores/modules/app'
import { useAuthStore } from '@/stores/modules/auth'
import Breadcrumb from './components/Breadcrumb/index.vue'
import SubMenu from './components/Menu/SubMenu.vue'
import NavTop from './components/NavBarTop/index.vue'
import TagsView from './components/TagsView/index.vue'

const route = useRoute()
const appStore = useAppStore()
const authStore = useAuthStore()

const activeMenu = computed(() => route.name)
</script>

<template>
  <el-container>
    <el-aside width="200px">
      <el-scrollbar>
        <el-menu
          :router="false"
          :default-active="activeMenu"
          :collapse="appStore.isCollapse"
          :unique-opened="false"
          :collapse-transition="false"

          background-color="#304156"
          text-color="#bfcbd9"
          active-text-color="#409EFF"
        >
          <SubMenu :menu-list="authStore.sideBarMenu" />
        </el-menu>
      </el-scrollbar>
    </el-aside>

    <el-watermark id="watermark" :font="{ color: 'rgba(0, 0, 0, .15)' }" content="v-liuyuren">
      <el-container direction="vertical">
        <el-header style="height: auto;">
          <div class="nav-top">
            <NavTop />
          </div>
        </el-header>

        <div class="tabs-box">
          <TagsView />
        </div>
        <Breadcrumb />
        <el-main>
          <div style="padding: 10px 20px;">
            <router-view />
          </div>
        </el-main>
      </el-container>
    </el-watermark>
  </el-container>
</template>

<style scoped>
.nav-top {
  height: 56px;
  display: flex;
  align-items: center;
  width: 100%;
  background-color: #fff;
}
.tabs-box {
  height: 34px;
  width: 100%;
  background: #fff;
  border-top: 1px solid #d8dce5;
  border-bottom: 1px solid #d8dce5;
  padding-left: 10px;
  box-sizing: border-box;
}
.breadcrumb-box {
  /* height: 30px;
  line-height: 30px;
  background-color: #fff;
  display: flex;
  align-items: center;
  padding-left: 10px; */
}
.el-aside {
  border-right: 1px solid var(--el-menu-border-color);
  background-color: #304156;

  .el-menu {
    border: none;
  }
}
.el-main {
  background-color: #f2f3f5;
  padding: 10px 12px;
}
/* .layout-container-demo .el-header {
  position: relative;
  background-color: var(--el-color-primary-light-7);
  color: var(--el-text-color-primary);
}
.layout-container-demo .el-aside {
  color: var(--el-text-color-primary);
  background: var(--el-color-primary-light-8);
}
.layout-container-demo .el-menu {
  border-right: none;
}
.layout-container-demo .el-main {
  padding: 0;
}
.layout-container-demo .toolbar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  right: 20px;
} */
</style>
