<template>
  <view :key="renderKey" class="app-container dark:text-[var(--wot-dark-color)]">
    <!-- 页面标题 -->
    <view class="page-header">
      <text class="page-title">主题设置</text>
      <text class="page-subtitle">个性化您的应用外观</text>
    </view>

    <!-- 暗黑模式设置 -->
    <wd-card title="外观模式">
      <wd-cell title="暗黑模式" :value="isDarkMode ? '已开启' : '已关闭'">
        <wd-switch v-model="isDarkMode" custom-class="theme-switch" @change="handleToggleDarkMode" />
      </wd-cell>
    </wd-card>

    <!-- 主题色设置 -->
    <wd-card title="预设主题色">
      <!-- 预设颜色选择 -->
      <view class="color-section">
        <view :key="renderKey" class="color-grid">
          <view v-for="(color, index) in themeOptions" 
            :key="`${index}-${renderKey}`" 
            class="color-item" 
            :class="{ active: isActiveColor(color) }" 
            @click="selectColor(color)">
            <view class="color-preview" :style="{ backgroundColor: color.primary }">
              <wd-icon v-if="isActiveColor(color)" name="check" size="20" color="#fff" />
            </view>
            <text class="color-name">{{ color.name }}</text>
          </view>
        </view>
      </view>
    </wd-card>

    <!-- 操作按钮 -->
    <view class="action-section">
      <wd-button block @click="resetTheme">
        重置为默认主题
      </wd-button>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { computed, watch,ref } from "vue";
import { useThemeStore } from "@/store/modules/theme.store";

const themeStore = useThemeStore();
const isDarkMode = computed({
  get: () => themeStore.isDark,
  set: (value) => {
    themeStore.toggleTheme(value ? 'dark' : 'light');
  }
});
const themeOptions = themeStore.themeColorOptions;

// 强制重新渲染的key
const renderKey = ref(0);

// 检查颜色是否为当前选中颜色
const isActiveColor = (color: typeof themeOptions[0]): boolean => {
  const currentColor = themeStore.currentThemeColor.primary.toLowerCase();
  const compareColor = color.primary.toLowerCase();
  return currentColor === compareColor;
};

// 切换暗黑模式
const handleToggleDarkMode = (value: boolean) => {
  // toggleTheme已经在computed的setter中调用了
  uni.showToast({
    title: value ? "暗黑模式" : "浅色模式",
    icon: "success",
    duration: 1000,
  });
};

// 选择主题色
const selectColor = (color: typeof themeOptions[0]) => {
  themeStore.setCurrentThemeColor(color);
  
  // 强制重新渲染所有组件
  renderKey.value++;
  
  uni.showToast({ title: "主题色已更新", icon: "success", duration: 1000 });
};

// 重置主题
const resetTheme = () => {
  uni.showModal({
    title: "确认重置",
    content: "确定要重置为默认主题吗？",
    success: (res) => {
      if (res.confirm) {
        themeStore.setCurrentThemeColor(themeOptions[0]);
        uni.showToast({ title: "主题已重置", icon: "success", duration: 1000 });
      }
    },
  });
};

// 监听主题变化，强制更新页面
watch(() => themeStore.isDark, () => {
  // 主题变化时强制重新渲染
  renderKey.value++;
});

// 监听主题色变化
watch(() => themeStore.currentThemeColor, () => {
  // 强制重新渲染以更新选中状态
  renderKey.value++;
}, { deep: true });

// 监听主题色变量变化
watch(() => themeStore.themeVars.colorTheme, () => {
  // 强制重新渲染以更新图标颜色
  renderKey.value++;
  
  // 通知其他页面主题色已变化
  uni.$emit('global-theme-color-change', themeStore.themeVars.colorTheme);
});
</script>

<route lang="json">{
  "name": "theme",
  "style": {
    "navigationBarTitleText": "主题设置"
  }
}</route>

<style lang="scss" scoped>
// 基础布局
.page-header {
  padding: 40rpx 20rpx;
  margin-bottom: 30rpx;
  text-align: center;
  background: linear-gradient(135deg, var(--wot-color-theme, #4D7FFF) 0%, #667eea 100%);
  border-radius: 16rpx;

  .page-title {
    display: block;
    margin-bottom: 10rpx;
    font-size: 36rpx;
    font-weight: bold;
    color: #fff;
  }

  .page-subtitle {
    font-size: 26rpx;
    color: rgba(255, 255, 255, 0.8);
  }
}

.setting-section {
  margin-bottom: 30rpx;
}

.section-header {
  display: flex;
  align-items: center;
  padding: 30rpx 30rpx 20rpx;
  border-bottom: 1rpx solid var(--wot-color-border, #f0f0f0);

  .setting-title {
    font-size: 32rpx;
  }
}

.color-section {
  .color-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 24rpx;
    justify-content: space-between;
  }
}

.color-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: calc(33.33% - 16rpx);
  cursor: pointer;

  .color-preview {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 70rpx;
    height: 70rpx;
    margin-bottom: 12rpx;
    border-radius: 16rpx;
  }

  .color-name {
    font-size: 22rpx;
  }
}

.action-section {
  padding: 0 30rpx 30rpx;
}
</style>
