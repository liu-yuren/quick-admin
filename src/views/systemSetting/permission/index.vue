<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getMenuListApi } from '@/api/menu'

interface Tree {
  id: number
  label: string
  children?: Tree[]
}

const defaultProps = {
  children: 'children',
  label: 'name',
}

const treeList = ref<Tree[]>([])

onMounted(() => {
  getListFn()
})

async function getListFn() {
  const res = await getMenuListApi()
  if (res.code === 200) {
    treeList.value = res.data
  }
}
</script>

<template>
  <div>
    <el-tree
      :data="treeList"
      node-key="id"
      :props="defaultProps"
      default-expand-all
      :expand-on-click-node="false"
    >
      <template #default="{ node, data }">
        <div class="custom-tree-node">
          <span>{{ node.label }}</span>
          <div class="custom-tree-node-actions">
            <el-button type="primary" link @click="append(data)">
              新增
            </el-button>
            <el-button type="primary" link @click="append(data)">
              编辑
            </el-button>
            <el-button type="primary" link @click="append(data)">
              删除
            </el-button>
          </div>
        </div>
      </template>
    </el-tree>
  </div>
</template>

<style lang="scss" scoped>
.custom-tree-node {
  display: flex;
  align-items: center;

  .custom-tree-node-actions {
    margin-left: 20px;
  }
}
</style>
