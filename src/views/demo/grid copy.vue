<script setup>
import { ArrowDown, ArrowUp } from '@element-plus/icons-vue'
import { ref } from 'vue'

const searchForm = ref({
  test1: '',
  test2: '',
  test3: '',
  test4: '',
})

const isCollapse = ref(false)

function toggleCollapse() {
  isCollapse.value = !isCollapse.value
}
</script>

<template>
  <div class="container">
    <el-form :model="searchForm">
      <div>
        <el-row
          :gutter="20"
        >
          <el-col
            v-for="one of 6"
            :key="one"
            :span="12"
          >
            <el-form-item class="w_25" :label="`表单项${one}`">
              <el-input v-model="searchForm.test1" />
            </el-form-item>
          </el-col>

          <!-- 操作按钮模块 -->
          <div class="table-search__btns">
            <el-button type="primary">
              查询
            </el-button>
            <el-button>
              重置
            </el-button>
            <el-button
              class="expand-btn"
              type="default"
              :icon="isCollapse ? ArrowUp : ArrowDown"
              @click="toggleCollapse"
            />
          </div>
        </el-row>
      </div>
    </el-form>
  </div>
</template>

<style scoped>
.container {
  padding: 20px;
  height: 100%;
  background-color: #fff;
  box-sizing: border-box;
  overflow: auto;
}

/**  操作按钮模块样式  **/
.table-search__btns {
  margin-left: auto;
  margin-bottom: 16px;
}

.table-search__btn--filter {
  font-size: 14px;
  color: #606266;
  cursor: pointer;
}

.expand-btn {
  padding: 8px;
}

/**  功能样式  **/
.ml-28 {
  margin-left: 28px;
}
</style>
