# Grid 栅格组件

基于 CSS Grid 的响应式栅格系统，参考 Naive UI 设计，支持断点配置和折叠功能。

## 功能特性

- ✅ 响应式布局，支持多种断点
- ✅ 灵活的列数配置（数字或响应式字符串）
- ✅ 支持折叠功能
- ✅ 支持水平和垂直间距设置
- ✅ 支持栅格偏移
- ✅ 支持后缀元素
- ✅ 平滑的动画过渡
- ✅ 支持项目级响应式配置

## 基本用法

```vue
<template>
  <Grid :cols="24" :x-gap="16" :y-gap="8">
    <GridItem :span="6">
      内容1
    </GridItem>
    <GridItem :span="12">
      内容2
    </GridItem>
    <GridItem :span="6">
      内容3
    </GridItem>
  </Grid>
</template>
```

## 响应式布局

### 容器级响应式

```vue
<template>
  <Grid cols="0 s:1 m:2 l:3 xl:4" :x-gap="16" :y-gap="8">
    <GridItem :span="1">
      内容1
    </GridItem>
    <GridItem :span="1">
      内容2
    </GridItem>
    <GridItem :span="1">
      内容3
    </GridItem>
    <GridItem :span="1">
      内容4
    </GridItem>
  </Grid>
</template>
```

### 项目级响应式

```vue
<template>
  <Grid :cols="24" :x-gap="16" item-responsive>
    <GridItem span="24 s:12 m:8 l:6">
      响应式项目1
    </GridItem>
    <GridItem span="24 s:12 m:8 l:6">
      响应式项目2
    </GridItem>
    <GridItem span="24 s:12 m:8 l:6">
      响应式项目3
    </GridItem>
    <GridItem span="24 s:12 m:8 l:6">
      响应式项目4
    </GridItem>
  </Grid>
</template>
```

## 折叠功能

```vue
<script setup>
import { ref } from 'vue'

const collapsed = ref(false)
</script>

<template>
  <Grid
    :cols="24"
    :x-gap="16"
    :y-gap="8"
    :collapsed="collapsed"
    :collapsed-rows="2"
  >
    <GridItem :span="6">
      字段1
    </GridItem>
    <GridItem :span="6">
      字段2
    </GridItem>
    <GridItem :span="6">
      字段3
    </GridItem>
    <GridItem :span="6">
      字段4
    </GridItem>
    <GridItem :span="6">
      字段5
    </GridItem>
    <GridItem :span="6">
      字段6
    </GridItem>
    <GridItem :span="6" suffix>
      操作
    </GridItem>
  </Grid>
</template>
```

## 栅格偏移

```vue
<template>
  <Grid :cols="24" :x-gap="16">
    <GridItem :span="6" :offset="6">
      偏移6列
    </GridItem>
    <GridItem :span="12">
      正常12列
    </GridItem>
  </Grid>
</template>
```

## API

### Grid Props

| 参数           | 说明                             | 类型                 | 默认值     |
| -------------- | -------------------------------- | -------------------- | ---------- |
| cols           | 栅格列数，支持数字或响应式字符串 | `number \| string`   | `24`       |
| xGap           | 水平间距                         | `number`             | `0`        |
| yGap           | 垂直间距                         | `number`             | `0`        |
| responsive     | 响应式模式                       | `'self' \| 'screen'` | `'screen'` |
| collapsed      | 是否折叠                         | `boolean`            | `false`    |
| collapsedRows  | 折叠时显示的行数                 | `number`             | `1`        |
| itemResponsive | 是否启用项目响应式               | `boolean`            | `false`    |

### GridItem Props

| 参数   | 说明                                       | 类型               | 默认值  |
| ------ | ------------------------------------------ | ------------------ | ------- |
| span   | 栅格占据的列数，支持数字或响应式字符串     | `number \| string` | `1`     |
| offset | 栅格左侧的间隔格数，支持数字或响应式字符串 | `number \| string` | `0`     |
| suffix | 是否为后缀元素                             | `boolean`          | `false` |

### 断点配置

| 断点 | 屏幕宽度 | 说明     |
| ---- | -------- | -------- |
| xs   | 0px+     | 超小屏幕 |
| s    | 640px+   | 小屏幕   |
| m    | 768px+   | 中等屏幕 |
| l    | 1024px+  | 大屏幕   |
| xl   | 1280px+  | 超大屏幕 |

### 响应式字符串语法

响应式字符串支持以下语法：

- `"24"` - 固定值
- `"0 s:1 m:2 l:3 xl:4"` - 根据断点设置不同值
- `"24 s:12 m:8 l:6"` - 从大屏幕开始设置

## 重构说明

相比原版本，新版本具有以下改进：

1. **参考 Naive UI 设计**：采用更现代的 API 设计，支持响应式字符串语法
2. **更灵活的间距控制**：分离水平和垂直间距设置
3. **项目级响应式**：支持单个项目的响应式配置
4. **更稳定的折叠逻辑**：使用更清晰的算法计算折叠索引
5. **优化的响应式处理**：改进断点检测逻辑，减少不必要的重新计算
6. **平滑动画效果**：添加淡入淡出和缩放动画，提升用户体验
7. **更好的性能**：使用 nextTick 确保 DOM 更新后再执行计算
8. **类型安全**：保持完整的 TypeScript 类型定义

## 设计理念

参考 Naive UI 的设计理念：

- 保持 API 的简洁性和一致性
- 提供平滑的动画效果
- 确保类型安全
- 优化性能和用户体验
- 支持现代化的响应式设计模式
