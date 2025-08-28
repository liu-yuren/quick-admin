/**
 * 树形结构节点接口
 */
export interface TreeNode {
  id: number | string
  name: string
  permissionCode: string
  parentId: number | string | null
  children?: TreeNode[]
  [key: string]: any // 允许其他属性
}

/**
 * 将一级数组转换为树形结构
 * @param list 原始数组
 * @param options 配置选项
 * @returns 树形结构数组
 */
export function arrayToTree<T extends TreeNode>(
  list: T[],
  options: {
    idKey?: keyof T // ID字段名，默认为'id'
    parentIdKey?: keyof T // 父ID字段名，默认为'parentId'
    childrenKey?: string // 子节点字段名，默认为'children'
    rootValue?: any // 根节点的父ID值，默认为null
  } = {},
): T[] {
  const {
    idKey = 'id',
    parentIdKey = 'parentId',
    childrenKey = 'children',
    rootValue = null,
  } = options

  // 创建ID到节点的映射
  const nodeMap = new Map<any, T>()

  // 初始化所有节点，并创建映射
  list.forEach((item) => {
    nodeMap.set(item[idKey], { ...item, [childrenKey]: [] })
  })

  const result: T[] = []

  // 构建树形结构
  list.forEach((item) => {
    const node = nodeMap.get(item[idKey])!
    const parentId = item[parentIdKey]

    if (parentId === rootValue || parentId === undefined || parentId === null) {
      // 根节点
      result.push(node)
    }
    else {
      // 子节点
      const parent = nodeMap.get(parentId)
      if (parent) {
        parent[childrenKey] = parent[childrenKey] || []
        parent[childrenKey].push(node)
      }
      else {
        // 如果找不到父节点，当作根节点处理
        result.push(node)
      }
    }
  })

  // 清理空的children数组
  const cleanEmptyChildren = (nodes: T[]): T[] => {
    return nodes.map((node) => {
      const newNode = { ...node }
      if (newNode[childrenKey] && newNode[childrenKey].length === 0) {
        delete newNode[childrenKey]
      }
      else if (newNode[childrenKey]) {
        newNode[childrenKey] = cleanEmptyChildren(newNode[childrenKey])
      }
      return newNode
    })
  }

  return cleanEmptyChildren(result)
}

/**
 * 将树形结构转换回一级数组
 * @param tree 树形结构数组
 * @param options 配置选项
 * @returns 一级数组
 */
export function treeToArray<T extends TreeNode>(
  tree: T[],
  options: {
    childrenKey?: string // 子节点字段名，默认为'children'
  } = {},
): T[] {
  const { childrenKey = 'children' } = options
  const result: T[] = []

  const traverse = (nodes: T[]) => {
    nodes.forEach((node) => {
      const newNode = { ...node }
      delete newNode[childrenKey]
      result.push(newNode)

      if (node[childrenKey] && node[childrenKey].length > 0) {
        traverse(node[childrenKey])
      }
    })
  }

  traverse(tree)
  return result
}

/**
 * 查找树形结构中的节点
 * @param tree 树形结构数组
 * @param predicate 查找条件函数
 * @param options 配置选项
 * @returns 找到的节点或null
 */
export function findTreeNode<T extends TreeNode>(
  tree: T[],
  predicate: (node: T) => boolean,
  options: {
    childrenKey?: string
  } = {},
): T | null {
  const { childrenKey = 'children' } = options

  const traverse = (nodes: T[]): T | null => {
    for (const node of nodes) {
      if (predicate(node)) {
        return node
      }

      if (node[childrenKey] && node[childrenKey].length > 0) {
        const found = traverse(node[childrenKey])
        if (found)
          return found
      }
    }
    return null
  }

  return traverse(tree)
}

/**
 * 获取节点的所有父节点路径
 * @param tree 树形结构数组
 * @param targetId 目标节点ID
 * @param options 配置选项
 * @returns 父节点路径数组
 */
export function getNodePath<T extends TreeNode>(
  tree: T[],
  targetId: any,
  options: {
    idKey?: keyof T
    childrenKey?: string
  } = {},
): T[] {
  const { idKey = 'id', childrenKey = 'children' } = options

  const findPath = (nodes: T[], path: T[] = []): T[] | null => {
    for (const node of nodes) {
      const currentPath = [...path, node]

      if (node[idKey] === targetId) {
        return currentPath
      }

      if (node[childrenKey] && node[childrenKey].length > 0) {
        const found = findPath(node[childrenKey], currentPath)
        if (found)
          return found
      }
    }
    return null
  }

  return findPath(tree) || []
}
