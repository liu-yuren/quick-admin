<script lang="ts" setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/modules/auth'
import Breadcrumb from './components/Breadcrumb/index.vue'
import SubMenu from './components/Menu/SubMenu.vue'
import NavTop from './components/NavBarTop/index.vue'
import TagsView from './components/TagsView/index.vue'

const authStore = useAuthStore()

const item = {
  date: '2016-05-02',
  name: 'Tom',
  address: 'No. 189, Grove St, Los Angeles',
}
const tableData = ref(Array.from({ length: 20 }).fill(item))
</script>

<template>
  <el-watermark id="watermark" :font="{ color: 'rgba(0, 0, 0, .15)' }" content="v-liuyuren">
    <el-container>
      <el-aside width="200px">
        <el-scrollbar>
          <el-menu :default-openeds="['1', '3']">
            <SubMenu :menu-list="authStore.authMenuList" />
          </el-menu>
        </el-scrollbar>
      </el-aside>

      <el-container direction="vertical">
        <el-header style="height: auto;">
          <div class="nav-top">
            <NavTop />
          </div>
        </el-header>

        <div class="tabs-box">
          <TagsView />
        </div>
        <div class="breadcrumb-box">
          <Breadcrumb />
        </div>

        <el-main>
          <el-scrollbar>
            <el-table :data="tableData">
              <el-table-column prop="date" label="Date" width="140" />
              <el-table-column prop="name" label="Name" width="120" />
              <el-table-column prop="address" label="Address" />
            </el-table>
          </el-scrollbar>
        </el-main>
      </el-container>
    </el-container>
  </el-watermark>
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
  padding-left: 20px;
  box-sizing: border-box;
}
.breadcrumb-box {
  height: 30px;
  line-height: 30px;
  background-color: #fff;
  display: flex;
  align-items: center;
  padding-left: 20px;
}
.el-aside {
  border-right: 1px solid var(--el-menu-border-color);
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
