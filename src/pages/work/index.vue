<template>
  <view class="app-container">
    <!-- 页面标题 -->
    <view class="page-header">
      <text class="page-title">工作台</text>
      <text class="page-subtitle">欢迎回来～</text>
    </view>

    <!-- 统计卡片 -->
    <wd-card class="stats-section">
      <view class="stats-grid">
        <view 
          v-for="(item, index) in statsData" 
          :key="index" 
          class="stats-card theme-card"
          @click="handleStatClick(item)"
        >
          <view class="stats-icon">
            <wd-icon :name="item.icon" size="24" :color="item.color" />
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
        <wd-grid-item 
          v-for="(action, index) in quickActions" 
          :key="index" 
          :icon="action.icon" 
          :text="action.name"
          :icon-color="primaryColor"
          icon-size="20" 
          custom-class="custom-item" 
          @click="handleActionClick(action)"
        />
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
import { computed } from 'vue'
import { useThemeStore } from "@/store/modules/theme.store";
import { useNavigationBar } from "@/composables/useNavigationBar";
import type { StatItem, QuickAction, Activity } from './types';
import { STATS_CONFIG, QUICK_ACTIONS, RECENT_ACTIVITIES } from './data';

const themeStore = useThemeStore();
const { initNavigationBar } = useNavigationBar();

// 初始化导航栏样式
initNavigationBar();

// ===== 计算属性 =====
// 主题色
const primaryColor = computed(() => themeStore.currentThemeColor.primary);

// 统计数据 - 使用主题色适配
const statsData = computed<StatItem[]>(() => {
  const color = primaryColor.value;
  return STATS_CONFIG.map(item => ({
    ...item,
    color
  }));
});

// ===== 数据定义 =====
// 快捷操作
const quickActions = QUICK_ACTIONS;

// 最近动态
const recentActivities = RECENT_ACTIVITIES;

// ===== 事件处理 =====
const handleStatClick = (item: StatItem) => {
  uni.showToast({
    title: `点击了 ${item.label}`,
    icon: 'none'
  });
};

const handleActionClick = (action: QuickAction) => {
  uni.showToast({
    title: `跳转到 ${action.name}`,
    icon: 'none'
  });
};
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
  padding: 40rpx 20rpx;
  margin-bottom: 30rpx;
  text-align: center;
  border-radius: 16rpx;
  // 使用与"我的"页面相同的渐变背景
  background: linear-gradient(135deg, var(--wot-color-theme, #165dff) 0%, #667eea 100%);

  .page-title {
    display: block;
    margin-bottom: 10rpx;
    font-size: 36rpx;
    font-weight: bold;
    color: var(--text-color-inverse);
  }

  .page-subtitle {
    font-size: 26rpx;
    color: var(--text-color-inverse);
    opacity: 0.8;
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

</style>