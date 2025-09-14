<script setup lang="ts">
import { Operation } from '@element-plus/icons-vue'
import { computed, ref } from 'vue'
import { columnHandleTypes } from '../constant'

const props = defineProps<{ customTableCol: any[] }>()

const checkedCustomCol = ref<Array<string>>(props.customTableCol.map(item => item.prop))

// const checkedCustomCol = computed({
//   get() {
//     return props.customTableCol.map(item => item.prop)
//   },
//   set(val) {
//     console.log(val, '计算属性')

//     // customTableCol.value.forEach((item) => {
//     //   item.show = val.includes(item.prop ?? '')
//   },
// })

function handleCheckboxChange(checked: Array<string>) {
  console.log(checked, 'checked')
  
  // tableColList.value.forEach((item) => {
  //   if (customTableCol.value.some(v => item.label === v.label)) {
  //     item.show = checked.includes(item.prop ?? '')
  //   }
  // })
}
</script>

<template>
  <el-popover placement="bottom-end" trigger="click">
    <template #reference>
      <el-button :icon="Operation" circle />
    </template>
    <el-checkbox-group v-model="checkedCustomCol" @change="handleCheckboxChange">
      <el-checkbox
        v-for="item in customTableCol"
        :key="item.prop"
        :label="item.prop"
        :disabled="columnHandleTypes.includes(item.prop ?? '')"
      >
        {{ item.label }}
      </el-checkbox>
    </el-checkbox-group>
  </el-popover>
</template>
