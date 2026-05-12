import type { Ref } from 'vue'
import { getCurrentInstance, onMounted, reactive, ref } from 'vue'
import { cleanEmptyParams } from '@/utils'

/**
 * 分页参数类型
 */
export interface PageParams {
  pageNum: number
  pageSize: number
  total: number
}

/**
 * usePage 配置项类型
 */
export interface UsePageOptions<T = any> {
  formOptions: Record<string, any>
  listFn?: (params: Record<string, any>) => Promise<{
    resultCode: number
    data: {
      records: T[]
      total: number
    }
  }>
  formmatList?: (data: T[]) => T[]
  exportFn?: (params: Record<string, any>) => Promise<any>
  transformSearchParams?: (formData: Record<string, any>) => Record<string, any>
  formData: Ref<Record<string, any>>
  immediate?: boolean
}

/**
 * 列表页通用业务 Hooks
 */
export function usePage<T = any>(options: UsePageOptions<T>) {
  const {
    formOptions,
    listFn,
    formmatList,
    exportFn,
    transformSearchParams,
    formData,
    immediate = true,
  } = options

  // 表单实例引用
  const formRef = ref<HTMLElement | null>(null)
  // 导出按钮加载状态
  const exportBtnLoading = ref<boolean>(false)
  // 最终查询参数
  const searchParams = ref<Record<string, any>>({})
  // 表格列表数据
  const tableList = ref<T[]>([])
  // 表格加载状态
  const tableListLoading = ref<boolean>(false)
  // 表单配置
  const formOpt = ref<Record<string, any>>({ ...formOptions })

  // 分页配置
  const page = reactive<PageParams>({
    pageNum: 1,
    pageSize: 10,
    total: 0,
  })

  // 挂载后请求列表
  onMounted(() => {
    if (immediate) {
      getTableList()
    }
  })

  /**
   * 获取最终查询参数
   */
  function getFinalSearchParams(): Record<string, any> {
    return transformSearchParams ? transformSearchParams(formData.value) : formData.value
  }

  /**
   * 设置查询参数
   */
  function setSearchParams(params: Record<string, any>): void {
    searchParams.value = params
  }

  /**
   * 查询列表
   */
  function search(): void {
    searchParams.value = getFinalSearchParams()
    page.pageNum = 1
    getTableList()
  }

  /**
   * 重置表单
   */
  function reset(): void {
    page.pageNum = 1
    // formRef.value.resetFields()
    searchParams.value = getFinalSearchParams()
    getTableList()
  }

  /**
   * 获取表格数据
   */
  async function getTableList(): Promise<void> {
    if (typeof listFn !== 'function')
      return

    tableListLoading.value = true
    const params = cleanEmptyParams({ ...page, ...searchParams.value })
    delete params.total

    try {
      const res = await listFn(params)
      if (res?.resultCode === 200) {
        const data = res?.data?.records ?? []
        tableList.value = formmatList ? formmatList(data) : data
        setTotal(res?.data?.total ?? 0)
      }
    }
    catch (error) {
      console.error('获取列表失败：', error)
    }
    finally {
      tableListLoading.value = false
    }
  }

  /**
   * 导出列表
   */
  async function exportList(): Promise<void> {
    if (typeof exportFn !== 'function')
      return

    exportBtnLoading.value = true
    try {
      await exportFn(cleanEmptyParams({ ...searchParams.value }))
      console.log('导出成功')
    }
    catch (error) {
      console.error('导出失败：', error)
    }
    finally {
      exportBtnLoading.value = false
    }
  }

  /**
   * 切换页码
   */
  function handleCurrentChange(pageNum: number): void {
    page.pageNum = pageNum
    getTableList()
  }

  /**
   * 切换每页条数
   */
  function handleSizeChange(pageSize: number): void {
    page.pageNum = 1
    page.pageSize = pageSize
    getTableList()
  }

  /**
   * 设置总数
   */
  function setTotal(total: number): void {
    page.total = total ?? 0
  }

  // ==================== 返回 ====================
  return {
    formRef,
    page,
    searchParams,
    tableList,
    tableListLoading,
    formOpt,
    exportBtnLoading,
    setSearchParams,
    handleCurrentChange,
    handleSizeChange,
    setTotal,
    getTableList,
    search,
    reset,
    exportList,
    cleanEmptyParams,
  }
}
