<script setup lang="ts">
import type { FormOptions } from '../../types'
import { ArrowDown, ArrowUp } from '@element-plus/icons-vue'
import { ref } from 'vue'
import GridItem from '@/components/Grid/GridItem.vue'
import BaseForm from '../../BaseForm/index.vue'

// 默认值
withDefaults(defineProps<{
  formOptions: FormOptions
  showCollapse?: boolean
}>(), {
  showCollapse: true,
  formOptions: () => ({}),

})

// 是否默认折叠搜索项
const collapsed = ref(false)

function search() {}

function reset() {}
</script>

<template>
  <div>
    <BaseForm :form-options="formOptions">
      <template #custom>
        <GridItem suffix>
          <div>
            <el-button type="primary" @click="search">
              搜索
            </el-button>
            <el-button @click="reset">
              重置
            </el-button>
            <el-button v-if="showCollapse" type="primary" link class="search-isOpen" @click="collapsed = !collapsed">
              {{ collapsed ? "展开" : "合并" }}
              <el-icon class="el-icon--right">
                <component :is="collapsed ? ArrowDown : ArrowUp" />
              </el-icon>
            </el-button>
          </div>
        </GridItem>
      </template>
    </BaseForm>
  </div>
</template>
