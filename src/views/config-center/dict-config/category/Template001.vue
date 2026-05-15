<script setup lang="ts">
import type { Ref } from 'vue'
import { inject, ref, watch, watchEffect } from 'vue'
import { templateData } from './templateData'

const props = defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
  baseTags: {
    type: Array,
    default: () => [],
  },
  baseModules: {
    type: Array,
    default: () => [],
  },
})

const baseModuleList = ref<any>(templateData.modules)
const headImageUrl = ref<any>('')
const userName = ref<any>('')

const baseModulesCopy = ref<any[]>([])
const baseTagsCopy = ref<any[]>([])

// 记录当前悬浮的条目信息
const hoverItem = ref<{ moduleKey: string, index: number } | null>(null)

function getValue(item: any) {
  if (!item.items || !item.items.length)
    return false
  // 判断有没有值
  if (item.items.every(e => e.fields.every(f => !f.fieldValue))) {
    return false
  }
  return true
}

// 上移条目
function moveUp(moduleKey: string, index: number) {
  const module = baseModuleList.value.find((m: any) => m.moduleKey === moduleKey)
  if (!module || index === 0)
    return
  // 交换位置
  [module.items[index], module.items[index - 1]] = [module.items[index - 1], module.items[index]]
}

// 下移条目
function moveDown(moduleKey: string, index: number) {
  const module = baseModuleList.value.find((m: any) => m.moduleKey === moduleKey)
  if (!module || index >= module.items.length - 1)
    return
  // 交换位置
  [module.items[index], module.items[index + 1]] = [module.items[index + 1], module.items[index]]
}

// 删除条目
function deleteItem(moduleKey: string, index: number) {
  const module = baseModuleList.value.find((m: any) => m.moduleKey === moduleKey)
  if (!module || module.items.length <= 1)
    return
  module.items.splice(index, 1)
}

const imageUrlInit = 'resume/HeadshotUpload.png'
const imageUrl = ref(
  new URL(``, import.meta.url).href,
)
console.log(imageUrl.value, 'imageUrl')

// 获取文件输入框的引用
const fileInput = ref<HTMLInputElement | null>(null)

// 触发隐藏的文件输入框
function triggerFileInput() {
  if (fileInput.value) {
    fileInput.value.click()
  }
}
// 上传图片后端
function handleFileChange(event: any) {

}

const paperRef = ref<HTMLElement | null>(null)

const finalPaperRef = inject<Ref<HTMLElement | null>>('paperRef', ref(null))

watchEffect(() => {
  finalPaperRef.value = paperRef.value
})

watch(() => baseModuleList?.value, (newVal) => {
  if (!newVal || newVal.length === 0)
    return
  const baseTagObj = baseModuleList.value.find(e => e.moduleKey === 'BASIC')
  baseModulesCopy.value = baseModuleList.value.filter(e => e.moduleKey !== 'BASIC' && e.hidden === 0).sort((a, b) => a.sortOrder - b.sortOrder)
  baseTagsCopy.value = baseTagObj.items[0].fields.filter(e => e.hidden === 0).sort((a, b) => a.sortOrder - b.sortOrder)
}, {
  deep: true,
  immediate: true,
})

function addItems(item: any) {
  const newItem = {
    fields: item.items[0]?.fields.map((field: any) => ({ ...field, fieldValue: '' })) || [],
  }
  item.items.push(newItem)
}
</script>

<template>
  <div ref="paperRef" class="resume-container-inner">
    <div class="personal-info-header">
      <div class="info-left">
        <el-input
          v-model="userName" placeholder="姓名" :custom-style="{
            fontSize: '20px',
            fontWeight: 'bold',
            initWidth: '40px',
          }" :disabled="disabled"
        />

        <!-- 基础标签 -->
        <template v-for="e in baseTagsCopy" :key="e.fieldKey">
          <div class="person-info-item">
            <img v-if="!disabled" class="person-info-drag-handle" src="" alt="拖拽手柄">
            <div class="person-info-content">
              <el-input
                v-model="e.fieldValue" :placeholder="e.fieldLabel" :type="e.fieldType"
                :options="e.fieldOptions || []" :disabled="disabled"
              />
            </div>
          </div>
        </template>
      </div>

      <!-- 图片展示，点击后触发上传文件 -->
      <div v-if="!disabled" class="avatar-upload">
        <img
          v-if="headImageUrl"
          :src="headImageUrl"
          alt="简历头像"
          style="
            width: 68px;
            height: 95px;
            margin-right: 10px;
            cursor: pointer;
            object-fit: cover;
          " @click="triggerFileInput"
        >
        <img
          v-else
          :src="imageUrl"
          alt="简历头像"
          style="
            width: 68px;
            height: 95px;
            margin-right: 10px;
            cursor: pointer;
            object-fit: cover;
          " @click="triggerFileInput"
        >
        <input
          ref="fileInput" type="file" style="display: none" accept=".jpg, .jpeg, .png" :disabled="disabled"
          @change="handleFileChange"
        >
      </div>
    </div>

    <!-- 基础模块 -->
    <div
      v-for="item in baseModulesCopy" :key="item.moduleKey" class="module-info-item"
      :data-type="item.dataType" :data-key="item.moduleKey"
      :style="{ width: item.width || '100%' }"
    >
      <div v-if="!disabled || (disabled && getValue(item))" class="w-full">
        <div class="section-block">
          <img v-if="!disabled" class="module-info-drag-handle" src="">
          <div class="heading">
            <h2>{{ item.moduleName }}</h2>
          </div>
          <div v-if="!disabled" class="common-btn">
            <img src="" height="24px" width="24px" @click="addItems(item)">
          </div>
        </div>

        <!-- 经历条目 -->
        <div
          v-for="(element, elementIndex) in item.items"
          :key="elementIndex"
          class="liuyuren"
          @mouseenter="!disabled && (hoverItem = { moduleKey: item.moduleKey, index: elementIndex })"
          @mouseleave="hoverItem = null"
        >
          <div style="display: flex;align-items: center;">
            <template v-for="(e, eIndex) in element.fields" :key="e.fieldKey">
              <div
                v-if="
                  (element.fields.length === 5 && +eIndex < 4 && !e.fieldKey.includes('DESCRIPTION'))
                    || (element.fields.length === 4 && +eIndex < 3 && !e.fieldKey.includes('DESCRIPTION'))"
              >
                <div>
                  <div class="exp-header">
                    <div class="flex items-center">
                      <el-input
                        v-model="e.fieldValue" style="width: 100%;" :type="e.fieldType"
                        :placeholder="e.fieldLabel" :disabled="disabled"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </div>

          <template v-for="(e, eIndex) in element.fields" :key="eIndex">
            <div
              v-if="
                (element.fields.length === 5 && +eIndex >= 4 && (e.fieldKey.includes('DESCRIPTION') || e.fieldKey.includes('ACHIEVEMENT')))
                  || (element.fields.length === 4 && +eIndex >= 3 && (e.fieldKey.includes('DESCRIPTION') || e.fieldKey.includes('ACHIEVEMENT')))
                  || (element.fields.length === 1 && (e.fieldKey.includes('DESCRIPTION') || e.fieldKey.includes('ACHIEVEMENT') || e.fieldKey.includes('CONTENT')))
              "
            >
              <div>
                <div class="exp-header">
                  <div class="flex items-center">
                    <el-input
                      v-model="e.fieldValue" style="width: 100%;" :type="e.fieldType"
                      :placeholder="e.fieldLabel" :disabled="disabled"
                    />
                  </div>
                </div>
              </div>
            </div>
          </template>

          <!-- 操作按钮：上移/下移/删除 -->
          <div
            v-if="!disabled && hoverItem?.moduleKey === item.moduleKey && hoverItem.index === elementIndex"
            class="item-actions"
            @mouseenter="!disabled && (hoverItem = { moduleKey: item.moduleKey, index: elementIndex })"
            @mouseleave="hoverItem = null"
          >
            <el-button
              size="small"
              link
              :disabled="elementIndex === 0"
              @click.stop="moveUp(item.moduleKey, elementIndex)"
            >
              上移
            </el-button>
            <el-button
              size="small"
              link
              :disabled="elementIndex === item.items.length - 1"
              @click.stop="moveDown(item.moduleKey, elementIndex)"
            >
              下移
            </el-button>
            <el-button
              size="small"
              link
              :disabled="item.items.length <= 1"
              style="color: #f56c6c;"
              @click.stop="deleteItem(item.moduleKey, elementIndex)"
            >
              删除
            </el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.resume-container-inner {
  width: 656px;
  min-height: calc(100vh - 116px);
  border: 1px dashed #999999;
  box-sizing: border-box;
  font-size: var(--resume-font-size);
  padding: var(--resume-page-spacing);

  :deep(.el-textarea .el-textarea__inner) {
    width: 100% !important;
  }

  .personal-info-header {
    display: flex;
    justify-content: space-between;
    margin-top: 15px;

    .avatar-upload img {
      width: 70px;
      height: 90px;
      object-fit: cover;
      cursor: pointer;
    }
  }

  .person-info-container {
    display: grid;
    grid-template-columns: repeat(4, auto);
    row-gap: 2px;
    margin-top: 10px;
    column-gap: 16px;
  }

  .person-info-item {
    display: flex;
    align-items: center;
    background: #fff;
    position: relative;
    border-radius: 4px;
  }

  .person-info-drag-handle {
    cursor: move;
    // user-select none;
    height: 16px;
    width: 16px;
    position: absolute;
    left: -16px;
  }

  /* 默认隐藏拖动图标 */
  .person-info-item .person-info-drag-handle {
    opacity: 0;
    transition: opacity 0.2s ease;
    cursor: grab;
  }

  /* 当鼠标悬浮在条目上时，显示图标 */
  .person-info-item:hover .person-info-drag-handle {
    opacity: 1;
  }

  /* 正在拖拽时保持显示 (可选) */
  .person-info-dragging .person-info-drag-handle {
    opacity: 1;
  }

  .person-info-content {
    flex: 1;
    color: #666;
    font-size: 13px;
  }

  /* 拖拽时的样式 (对应图中的虚线占位) */
  .person-info-ghost {
    opacity: 0.5;
    background: rgba(217, 217, 217, 0.1) !important;
    border-radius: 4px;
    border: 2px dashed rgba(0, 110, 255, 0.2) !important;
  }

  .person-info-dragging {
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }

  .vertical-divider {
    padding: 0 4px;
  }

  .column-layout {
    flex: 1;
    display: flex;
    gap: 24px;
    min-height: 60px;
    border-radius: 4px;
    padding: 0 !important;
  }

  /* 拖拽占位反馈 */
  .module-info-ghost {
    opacity: 0.5;
    background: rgba(217, 217, 217, 0.1) !important;
    border-radius: 4px;
    border: 2px dashed rgba(0, 110, 255, 0.2) !important;
  }

  .section-ghost {
    min-width: 48%;
    flex: 1;
    opacity: 0.5;
    background: rgba(217, 217, 217, 0.1) !important;
    border-radius: 4px;
    border: 2px dashed rgba(0, 110, 255, 0.2) !important;
  }

  .module-info-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  .module-info-item {
    display: flex;
    align-items: flex-start;
    background-color: #fff;
    width: 100%;
    transition: width 0.2s ease-in-out;
    display: inline-block;
    vertical-align: top;

    .section-block {
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: relative;
      margin-top: var(--resume-module-spacing);
      margin-bottom: 8px;
    }

    .heading {
      flex: 1;
      height: 30px;
      border-left: 5px solid var(--resume-base-color);
      padding: 0 8px;
      display: flex;
      align-items: center;
      background-color: var(--resume-base-color-alpha-1);

      h2 {
        padding: 0;
        font-size: 14px;
        font-weight: bold;
        color: var(--resume-base-color);
      }
    }

    .common-btn {
      width: 24px;
      height: 24px;
      background: #ffffff;
      box-shadow:
        0px 2px 6px 0px rgba(47, 53, 66, 0.12),
        0px 4px 16px 0px rgba(47, 53, 66, 0.06),
        0px 6px 28px 0px rgba(47, 53, 66, 0.04);
      border-radius: 8px;
      cursor: pointer;
      margin-left: 5px;
    }

    .experience-item {
      margin-bottom: 4px;
      display: flex;

      &:last-child {
        margin-bottom: 0;
      }

      & > div {
        flex: 1;
      }
    }

    .exp-header {
      font-weight: bold;
      margin-bottom: 5px;
    }
  }

  .module-info-drag-handle {
    cursor: move;
    user-select: none;
    position: absolute;
    left: -16px;
  }

  .module-info-dragging {
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }

  /* 默认隐藏拖动图标 */
  .module-info-item .module-info-drag-handle {
    opacity: 0;
    transition: opacity 0.2s ease;
    cursor: grab;
  }

  /* 当鼠标悬浮在条目上时，显示图标 */
  .module-info-item:hover .module-info-drag-handle {
    opacity: 1;
  }

  /* 正在拖拽时保持显示 (可选) */
  .module-info-dragging .module-info-drag-handle {
    opacity: 1;
  }

  // 条目样式
  .liuyuren {
    position: relative;
    border-radius: 4px;
    transition: border-color 0.2s;
    margin-bottom: 12px;

    &:hover {
      border-color: #e6e6e6;
    }
  }

  // 操作按钮容器
  .item-actions {
    position: absolute;
    z-index: 9999;
    right: 0;
    bottom: -26px;
    display: flex;
    gap: 8px;
    padding: 4px 8px;
    background: #f8f8f8;
    border-radius: 4px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

    // 按钮样式
    :deep(.el-button) {
      padding: 2px 8px;
      font-size: 12px;
    }

    :deep(.el-button.is-disabled) {
      color: #ccc !important;
      cursor: not-allowed;
    }
  }
}
</style>
