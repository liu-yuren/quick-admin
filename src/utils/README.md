# 树形结构转换工具

这个工具提供了将一级数组转换为树形结构的通用方法，以及相关的树形结构操作功能。

## 主要功能

### 1. arrayToTree - 数组转树形结构

将包含父子关系的一级数组转换为树形结构。

```typescript
import { arrayToTree } from '@/utils/tree'

const data = [
  { id: 1, name: '系统设置', permissionCode: 'system-setting', parentId: null },
  { id: 2, name: '基本设置', permissionCode: 'base-setting', parentId: 1 },
  { id: 3, name: '用户管理', permissionCode: 'user-manage', parentId: 2 },
]

const treeData = arrayToTree(data)
```

**配置选项：**

- `idKey`: ID字段名，默认为 'id'
- `parentIdKey`: 父ID字段名，默认为 'parentId'
- `childrenKey`: 子节点字段名，默认为 'children'
- `rootValue`: 根节点的父ID值，默认为 null

### 2. treeToArray - 树形结构转数组

将树形结构转换回一级数组。

```typescript
import { treeToArray } from '@/utils/tree'

const arrayData = treeToArray(treeData)
```

### 3. findTreeNode - 查找节点

在树形结构中查找特定节点。

```typescript
import { findTreeNode } from '@/utils/tree'

const node = findTreeNode(treeData, node => node.permissionCode === 'user-manage')
```

### 4. getNodePath - 获取节点路径

获取从根节点到目标节点的完整路径。

```typescript
import { getNodePath } from '@/utils/tree'

const path = getNodePath(treeData, 3) // 获取ID为3的节点路径
```

## 数据结构要求

节点对象需要包含以下字段：

- `id`: 唯一标识符
- `name`: 节点名称
- `permissionCode`: 权限代码
- `parentId`: 父节点ID（根节点为null）

## 使用示例

```typescript
import { arrayToTree, TreeNode } from '@/utils/tree'

// 定义数据
const menuData: TreeNode[] = [
  { id: 1, name: '系统设置', permissionCode: 'system-setting', parentId: null },
  { id: 2, name: '基本设置', permissionCode: 'base-setting', parentId: 1 },
  { id: 3, name: '用户管理', permissionCode: 'user-manage', parentId: 2 },
]

// 转换为树形结构
const treeData = arrayToTree(menuData)

// 结果：
// [
//   {
//     id: 1,
//     name: '系统设置',
//     permissionCode: 'system-setting',
//     parentId: null,
//     children: [
//       {
//         id: 2,
//         name: '基本设置',
//         permissionCode: 'base-setting',
//         parentId: 1,
//         children: [
//           {
//             id: 3,
//             name: '用户管理',
//             permissionCode: 'user-manage',
//             parentId: 2
//           }
//         ]
//       }
//     ]
//   }
// ]
```
