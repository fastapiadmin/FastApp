<template>
  <view class="app-container">
    <!-- 页面标题 -->
    <view class="page-header">
      <text class="page-title theme-text-primary">工作台</text>
      <text class="page-subtitle theme-text-secondary">欢迎回来～</text>
    </view>

    <!-- 统计卡片 -->
    <wd-card class="stats-section">
      <view class="stats-grid">
        <view v-for="(item, index) in statsData" :key="index" class="stats-card theme-card"
          @click="handleStatClick(item)">
          <view class="stats-icon" :style="{ background: item.iconBgColor }">
            <wd-icon :name="item.icon" size="24" />
          </view>
          <view class="stats-content">
            <text class="stats-number theme-text-primary">{{ item.number }}</text>
            <text class="stats-label theme-text-secondary">{{ item.label }}</text>
          </view>
        </view>
      </view>
    </wd-card>

    <!-- 快捷操作 -->
    <wd-card title="快捷操作">
      <wd-grid :column="4" border>
        <wd-grid-item v-for="(action, index) in quickActions" :key="index" :icon="action.icon" :text="action.name"
          icon-size="20" custom-class="custom-item" @click="handleActionClick(action)">
        </wd-grid-item>
      </wd-grid>
    </wd-card>

    <!-- 最近动态 -->
    <wd-card title="最近动态">
      <wd-cell-group>
        <wd-cell v-for="(activity, index) in recentActivities" :key="index" :title="activity.title"
          :label="activity.label" :value="activity.value" custom-class="activity-cell">
        </wd-cell>
      </wd-cell-group>
    </wd-card>

  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 统计数据
const statsData = ref([
  {
    number: '1,234',
    label: '用户总数',
    color: '#165DFF',
    iconBgColor: '#e1efff',
    icon: 'user',
    path: '/pages/user/index'
  },
  {
    number: '856',
    label: '今日活跃',
    color: '#00B42A',
    iconBgColor: '#e1fcef',
    icon: 'app',
    path: '/pages/user/active'
  },
  {
    number: '42',
    label: '待处理',
    color: '#FF7D00',
    iconBgColor: '#fff0e1',
    icon: 'chart',
    path: '/pages/order/pending'
  },
  {
    number: '8',
    label: '系统消息',
    color: '#F53F3F',
    iconBgColor: '#ffe1e1',
    icon: 'warning',
    path: '/pages/message/index'
  }
])

// 快捷操作
const quickActions = ref([
  { name: '用户管理', icon: 'user', path: '/pages/user/index' },
  { name: '角色管理', icon: 'usergroup', path: '/pages/role/index' },
  { name: '部门管理', icon: 'fork', path: '/pages/dept/index' },
  { name: '系统设置', icon: 'setting', path: '/pages/settings/index' }
])

// 最近动态
const recentActivities = ref([
  { title: '新用户注册', label: '李四', value: '刚刚' },
  { title: '订单完成', label: '宫保鸡丁', value: '3分钟前' },
  { title: '系统更新', label: '版本v2.1.1', value: '8分钟前' },
  { title: '用户反馈', label: '界面优化建议', value: '12分钟前' }
])

// 处理方法
const handleStatClick = (item: any) => {
  uni.showToast({
    title: `点击了 ${item.label}`,
    icon: 'none'
  })
}

const handleActionClick = (action: any) => {
  uni.showToast({
    title: `跳转到 ${action.name}`,
    icon: 'none'
  })
}
</script>

<route lang="json">{
  "name": "work",
  "style": {
    "navigationStyle": "custom"
  },
  "layout": "tabbar",
  "meta": {
    "requireAuth": true
  }
}</route>

<style lang="scss" scoped>
.page-header {
  margin-bottom: 40rpx;
  text-align: center;

  .page-title {
    margin-bottom: 8rpx;
    font-size: 36rpx;
    font-weight: bold;
  }

  .page-subtitle {
    font-size: 28rpx;
  }
}

.stats-section {

  .stats-grid {
    padding: 12rpx;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12rpx;
  }

  .stats-card {
    display: flex;
    align-items: center;
    padding: 30rpx;
    border-radius: 16rpx;
    box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    background: var(--card-bg);
    border: 1rpx solid var(--border-color);

    &:active {
      transform: scale(0.95);
    }

    .stats-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 60rpx;
      height: 60rpx;
      margin-right: 20rpx;
      border-radius: 12rpx;
    }

    .stats-content {
      flex: 1;

      .stats-number {
        display: block;
        font-size: 32rpx;
        font-weight: bold;
        color: var(--text-color);
        margin-bottom: 4rpx;
      }

      .stats-label {
        font-size: 24rpx;
        color: var(--text-color-2);
      }
    }
  }
}

.quick-actions {
  margin-bottom: 40rpx;
}
</style>