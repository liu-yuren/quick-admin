<script setup>
import { ArrowDown, ArrowUp } from '@element-plus/icons-vue'
import { ref } from 'vue'

defineProps({
  gutter: {
    type: Number,
    default: 20,
  },
})

const searchForm = ref({
  test1: '',
  test2: '',
  test3: '',
  test4: '',
})

// 是否折叠
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
          :gutter="gutter"
        >
          <el-col
            v-for="one of 6"
            v-show="!isCollapse ? true : one < 3"
            :key="one"
            :span="8"
          >
            <el-form-item class="w_25" :label="`表单项${one}`">
              <el-input v-model="searchForm.test1" />
            </el-form-item>
          </el-col>

          <!-- 操作按钮模块 -->
          <div class="table-search__btns" :style="{ 'padding-right': `${gutter / 2}px` }">
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

.expand-btn {
  padding: 8px;
}
</style>
