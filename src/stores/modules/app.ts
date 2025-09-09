import { reactive } from 'vue'
import { updateElementPlusTheme } from '@/utils/theme'

export interface AppState {
  layout: 'side' | 'top'
  size: 'default' | 'small' | 'large'
  isCollapse: boolean
  themeColor: any
}

export enum ElementPlusModifyEnum {
  info = 'info',
  primary = 'primary',
  success = 'success',
  warning = 'warning',
  danger = 'danger',
}

export function useAppStore() {
  const state = reactive<AppState>({
    // 布局模式
    layout: 'side',
    // 组件尺寸
    size: 'default',
    // 折叠菜单
    isCollapse: false,
    // 主题颜色
    themeColor: {
      info: '#909399',
      primary: '#FFBF13',
      success: '#67C23A',
      warning: '#E6A23C',
      danger: '#F56C6C',

      // info: '#909399',
      // primary: '#409EFF',
      // success: '#67C23A',
      // warning: '#E6A23C',
      // danger: '#F56C6C',
    },
  })

  function setAppState(partial: Partial<AppState>) {
    Object.assign(state, partial)
  }

  /**
   * 设置主题颜色
   * @param type 类型
   * @param color 颜色
   */
  function setThemeColor(type: any, color: string) {
  // 修改 store 中主题颜色的值
    state.themeColor[type] = color

    // 更新 Element Plus 主题
    updateElementPlusTheme(type, color)
  }

  return {
    ...state,
    setAppState,
    setThemeColor,
  }
}
