<script setup lang="ts">
import type {
  FormComponentSlotContent,
  FormSchemaEmits,
  FormSchemaItems,
  FormSchemaProps,
  SlotsObj,
} from './types'
import { QuestionFilled } from '@element-plus/icons-vue'
import { useVModel } from '@vueuse/core'

defineOptions({
  name: 'FormSchema',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<FormSchemaProps>(), {
  // cols: 1,
  gutter: 16,
  // size: 'default',
  // disabled: false,

  // editable: true,
  // emptyText: '-',
  // ignoreBtnLabel: true,
  // scrollToError: true,
  // autoCollapseInValidate: true,
  // submitBtnText: '确定',
  // cancelBtnText: '取消',
})

const emit = defineEmits<FormSchemaEmits>()

const formData = useVModel(props, 'modelValue', emit)

/**
 * 表单项是否可见
 * @param item 单个表单项配置
 */
function isColVisible(item: FormSchemaItems) {
  if (typeof item.show === 'undefined') {
    return true
  }
  if (typeof item.show === 'function') {
    return item.show(formData.value)
  }
  return item.show
}

/**
 * 解析表单组件的插槽配置
 * 处理 componentSlots 为函数/对象的场景，转换插槽数组
 * @param item 单个表单项配置
 */
function resolveSlots(item: FormSchemaItems) {
  // 处理插槽配置
  const slotsObj: SlotsObj = typeof item.componentSlots === 'function'
    ? item.componentSlots()
    : (item.componentSlots || {})

  // 插槽配置数组
  return Object.entries(slotsObj).map(([slotName, slotValue]) => ({
    slotName,
    slotValue,
  }))
}

/**
 * 渲染插槽内容
 * @param slotContent 插槽内容
 * @param slotScope 插槽作用域参数
 */
function renderSlotContent(slotContent: FormComponentSlotContent, slotScope: any) {
  return typeof slotContent === 'function' ? slotContent(slotScope) : slotContent
}

function submit() {

}
</script>

<template>
  <el-form
    v-bind="$attrs"
    :model="formData "
    @submit.prevent="submit"
  >
    <el-row :gutter="gutter">
      <template v-for="item in schema" :key="item.name">
        <el-col
          v-if="isColVisible(item)"
          :span="item.span"
          v-bind="wrapperCol"
        >
          <el-form-item
            :prop="item.name"
            :label-width="item.labelWidth"
            :label-position="item.labelPosition"
            :rules="item.rules"
            :class="[item.customClass || '']"
          >
            <!-- 表单项标签插槽 -->
            <template v-if="item.label" #label>
              <slot :name="`${item.name}_label`">
                <span style="display: inline-flex;align-items: center;">
                  <span v-if="typeof item.label === 'string'">
                    {{ item.label }}
                  </span>

                  <component
                    :is="typeof item.label === 'function' ? item.label() : item.label"
                    v-else
                  />

                  <!-- 标签旁的tooltip提示 -->
                  <el-tooltip
                    v-if="item.tooltip"
                    v-bind="item.tooltipProps"
                    :content="item.tooltip"
                  >
                    <el-icon class="ml-1">
                      <QuestionFilled />
                    </el-icon>
                  </el-tooltip>
                </span>
              </slot>
            </template>

            <!-- 表单项组件插槽（默认插槽） -->
            <slot :name="item.name" v-bind="item">
              <component
                :is="item.component"
                v-model="formData[item.name]"
                :class="[item.componentClass || '']"
                v-bind="item.componentProps"
                v-on="item.componentEvents || {}"
              >
                <!-- 渲染组件插槽 -->
                <template
                  v-for="({ slotName, slotValue }) in resolveSlots(item)"
                  :key="slotName"
                  #[slotName]="slotScope"
                >
                  <template v-if="typeof renderSlotContent(slotValue, slotScope) === 'string'">
                    {{ renderSlotContent(slotValue, slotScope) }}
                  </template>

                  <template v-else>
                    <component :is="renderSlotContent(slotValue, slotScope)" />
                  </template>
                </template>
              </component>
            </slot>

            <!-- 表单项下方提示文本 -->
            <div
              v-if="item.tips"
              class="form-item__tip"
              :class="[item.tipsClass || '']"
            >
              {{ item.tips }}
            </div>
          </el-form-item>
        </el-col>
      </template>
    </el-row>

    <slot name="btnArea" />
  </el-form>
</template>

<style scoped>
.form-item__tip {
  line-height: 1.2;
  color: var(--el-text-color-placeholder);
  word-break: break-word;
}
</style>
