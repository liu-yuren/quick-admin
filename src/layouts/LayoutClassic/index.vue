<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useAppStore } from '@/stores/modules/app'
import { useAuthStore } from '@/stores/modules/auth'
import Breadcrumb from '../components/Breadcrumb/index.vue'
import Header from '../components/Header/index.vue'
import Main from '../components/Main/index.vue'
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
      <Header />

      <TagsView />

      <Breadcrumb />

      <main class="layout-main">
        <div class="layout-main-scroll">
          <Main />
        </div>
      </main>
    </el-container>
  </el-container>
</template>

<style lang="scss" scoped>
.el-aside {
  border-right: 1px solid var(--el-menu-border-color);
  background-color: #545c64;
  transition: width 0.2s;

  .el-menu {
    border-right: none;
  }
}

.layout-main {
  flex: 1;
  overflow: hidden;
  margin: 10px 0 0 10px;
  background-color: #fff;
}

.layout-main-scroll {
  overflow: auto;
  height: 100%;
  // transform: translateZ(0);
}

// .common-page-list {
//   .search-form-container {
//     padding: 20px;
//     box-sizing: border-box;
//   }

//   .pro-table {
//     padding: 20px;
//     box-sizing: border-box;
//     border-top: 10px solid #f1f1f1;
//     box-sizing: border-box;
//   }

//   .common-table-page {
//     margin: 0 auto 20px;
//     // text-align: center;
//   }
// }
</style>
