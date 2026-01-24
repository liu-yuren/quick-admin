<script setup lang="ts">
import type { ElForm } from 'element-plus'
import type { VNode } from 'vue'
import type {
  FormSchemaItems,
  FormSchemaProps,
  FormSchemaPropsEmits,
} from './types'
import { QuestionFilled } from '@element-plus/icons-vue'
import { useVModel } from '@vueuse/core'
import { useTemplateRef } from 'vue'

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

const emit = defineEmits<FormSchemaPropsEmits>()

const formSchemaRef = useTemplateRef<InstanceType<typeof ElForm> | null>('formSchemaRef')

const formDataModel = useVModel(props, 'modelValue', emit)

/**
 * 判断表单项是否可见
 * @param item 单个表单项配置
 * @returns 布尔值：是否可见
 */
function isColVisible(item: FormSchemaItems) {
  if (typeof item.show === 'undefined') {
    return true
  }
  if (typeof item.show === 'function') {
    // return item.show(model.value)
  }
  return item.show
}

interface SlotItem {
  slotName: string
  slotValue: string | VNode | ((slotScope: any) => string | VNode)
}

interface SlotsObj {
  [key: string]: SlotItem['slotValue']
}

/**
 * 解析表单组件的插槽配置（处理嵌套函数场景）
 * @param schemaItem 单个表单项配置
 * @returns 格式化后的插槽配置数组
 */
function resolveFormComponentSlots(item: FormSchemaItems): SlotItem[] {
  // 1. 先处理componentSlots本身是函数的情况，执行后获取插槽映射对象
  const slotsObj: SlotsObj = typeof item.componentSlots === 'function'
    ? item.componentSlots()
    : (item.componentSlots || {})

  // 2. 转换为数组格式，方便模板遍历
  return Object.entries(slotsObj).map(([slotName, slotValue]) => ({
    slotName,
    slotValue,
  }))
}

/**
 * 执行插槽内容（处理插槽内容为函数的场景）
 * @param slotContent 插槽内容（字符串/VNode/函数）
 * @param slotScope 插槽作用域参数
 * @returns 最终渲染的插槽内容
 */
function executeSlotValue(slotValue: SlotItem['slotValue'], slotScope: any) {
  if (typeof slotValue === 'function') {
    return slotValue(slotScope)
  }
  return slotValue
}

function submit() {

}
</script>

<template>
  <el-form
    ref="formSchemaRef"
    v-bind="$attrs"
    :model="formDataModel "
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
            <!-- 表单字段标签名 -->
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

            <slot :name="item.name" v-bind="item">
              <component
                :is="item.component"
                v-model="formDataModel [item.name]"
                :class="[item.componentClass || '']"
                v-bind="item.componentProps"
                v-on="item.componentEvents || {}"
              >
                <!-- 表单控件-插槽 -->
                <template
                  v-for="({ slotName, slotValue }) in resolveFormComponentSlots(item)"
                  :key="slotName"
                  #[slotName]="slotScope"
                >
                  <!-- 渲染字符串类型插槽 -->
                  <template v-if="typeof executeSlotValue(slotValue, slotScope) === 'string'">
                    {{ executeSlotValue(slotValue, slotScope) }}
                  </template>

                  <!-- 渲染VNode类型插槽 -->
                  <template v-else-if="executeSlotValue(slotValue, slotScope)">
                    <component :is="executeSlotValue(slotValue, slotScope)" />
                  </template>
                </template>
              </component>
            </slot>

            <!-- 表单控件下方提示 -->
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
