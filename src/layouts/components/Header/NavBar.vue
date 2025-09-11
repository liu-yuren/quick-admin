<script setup lang="ts">
import { useAuthStore } from '@/stores/modules/auth'

const authStore = useAuthStore()
</script>

<template>
  <div class="navbar-menu">
    <el-scrollbar>
      <div class="navbar-menu-list">
        <a
          v-for="item in authStore.navBarMenu"
          :key="item.name"
          href="javascript:"
          :class="[authStore.currentNavBarPath === item.path && 'current']"
          @click="authStore.setMenuList(item.path)"
        >{{ item.meta?.title }}</a>
      </div>
    </el-scrollbar>
  </div>
</template>

<style lang="scss" scoped>
.navbar-menu {
  background: #fff;

  .navbar-menu-list {
    white-space: nowrap;
    // padding: 0 0 15px;
    a + a {
      margin-left: 2px;
    }

    a {
      display: inline-block;
      padding: 10px 20px;
      font-size: 14px;
      font-weight: bold;
      border-radius: 4px;
      vertical-align: middle;
      text-decoration: none;
      color: rgba(52, 46, 44, 1);
      &.current {
        background: rgba(36, 80, 216, 1);
        border-color: rgba(36, 80, 216, 1);
        color: #fff;
      }
      &:hover,
      &:focus {
        background: rgba(36, 80, 216, 1);
        color: #fff;
      }
    }
  }
}
</style>
