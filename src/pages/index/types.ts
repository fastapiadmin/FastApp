/**
 * 首页类型定义
 */

/**
 * 访问统计数据
 */
export interface VisitStatsVO {
  todayUvCount: number;
  uvGrowthRate: number;
  totalUvCount: number;
  todayPvCount: number;
  pvGrowthRate: number;
  totalPvCount: number;
}

/**
 * 导航项
 */
export interface NavItem {
  icon: string;
  title: string;
  url: string;
  prem: string;
}

/**
 * 图表数据
 */
export interface ChartData {
  categories: string[];
  series: Array<{
    name: string;
    data: number[];
  }>;
}

