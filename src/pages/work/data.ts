/**
 * 工作台页面数据
 */
import type { QuickAction, Activity, StatItem } from './types';

/**
 * 统计数据基础配置（不包含动态颜色）
 */
export const STATS_CONFIG: Omit<StatItem, 'color'>[] = [
  {
    number: '1,234',
    label: '用户总数',
    icon: 'user',
    path: '/pages/user/index'
  },
  {
    number: '856',
    label: '今日活跃',
    icon: 'app',
    path: '/pages/user/active'
  },
  {
    number: '42',
    label: '待处理',
    icon: 'chart',
    path: '/pages/order/pending'
  },
  {
    number: '8',
    label: '系统消息',
    icon: 'warning',
    path: '/pages/message/index'
  }
];

/**
 * 快捷操作列表
 */
export const QUICK_ACTIONS: QuickAction[] = [
  { name: '用户管理', icon: 'user', path: '/pages/user/index' },
  { name: '角色管理', icon: 'usergroup', path: '/pages/role/index' },
  { name: '部门管理', icon: 'fork', path: '/pages/dept/index' },
  { name: '系统设置', icon: 'setting', path: '/pages/settings/index' }
];

/**
 * 最近动态列表
 */
export const RECENT_ACTIVITIES: Activity[] = [
  { title: '新用户注册', label: '李四', value: '刚刚' },
  { title: '订单完成', label: '宫保鸡丁', value: '3分钟前' },
  { title: '系统更新', label: '版本v2.1.1', value: '8分钟前' },
  { title: '用户反馈', label: '界面优化建议', value: '12分钟前' }
];

