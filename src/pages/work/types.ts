/**
 * 工作台页面类型定义
 */

/**
 * 统计数据项
 */
export interface StatItem {
  number: string;
  label: string;
  color: string;
  icon: string;
  path: string;
}

/**
 * 快捷操作项
 */
export interface QuickAction {
  name: string;
  icon: string;
  path: string;
}

/**
 * 活动项
 */
export interface Activity {
  title: string;
  label: string;
  value: string;
}

