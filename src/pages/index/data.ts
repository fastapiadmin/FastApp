/**
 * 首页数据配置
 */
import type { NavItem, VisitStatsVO } from './types';

/**
 * 轮播图列表
 */
export const SWIPER_LIST = [
  "/static/images/banner01.jpg",
  "/static/images/banner02.jpg"
];

/**
 * 快捷导航列表
 */
export const NAV_LIST: NavItem[] = [
  {
    icon: "/static/icons/user.png",
    title: "用户管理",
    url: "/pages/work/user/index",
    prem: "sys:user:query",
  },
  {
    icon: "/static/icons/role.png",
    title: "角色管理",
    url: "/pages/work/role/index",
    prem: "sys:role:query",
  },
  {
    icon: "/static/icons/notice.png",
    title: "通知公告",
    url: "/pages/work/notice/index",
    prem: "sys:notice:query",
  },
  {
    icon: "/static/icons/setting.png",
    title: "系统配置",
    url: "/pages/work/config/index",
    prem: "sys:config:query",
  },
];

/**
 * 默认访问统计数据
 */
export const DEFAULT_VISIT_STATS: VisitStatsVO = {
  todayUvCount: 1234,
  uvGrowthRate: 15.6,
  totalUvCount: 45678,
  todayPvCount: 5678,
  pvGrowthRate: 23.4,
  totalPvCount: 123456,
};

/**
 * 通知公告文本
 */
export const NOTICE_TEXT = "fastapp 是一个基于 Vue3 + UniApp 的前端模板项目，提供了一套完整的前端解决方案，包括登录、权限、字典、接口请求、状态管理、页面布局、组件封装等功能。";

/**
 * 默认日期范围（天数）
 */
export const DEFAULT_DAYS_RANGE = 7;

/**
 * 日期范围选项
 */
export const DAYS_RANGE_OPTIONS = [7, 15] as const;

/**
 * 图表配置选项
 */
export const CHART_OPTS = {
  padding: [20, 0, 20, 0],
  xAxis: {
    fontSize: 10,
    rotateLabel: true,
    rotateAngle: 30,
  },
  yAxis: {
    disabled: true,
  },
  extra: {
    area: {
      type: "curve",
      opacity: 0.2,
      addLine: true,
      width: 2,
      gradient: true,
      activeType: "hollow",
    },
  },
};

/**
 * 图表系列名称
 */
export const CHART_SERIES_NAMES = {
  UV: "访客数(UV)",
  PV: "浏览量(PV)",
} as const;

