<template>
  <view v-if="isThemeReady" :key="renderKey" class="app-container">
    <!-- 用户信息卡片 -->
    <view class="user-profile theme-card">
      <view class="blur-bg"></view>
      <view class="user-info">
        <view class="avatar-container" @click="navigateToProfile">
          <image class="avatar" :src="isLogin ? userInfo!.avatar : defaultAvatar" mode="aspectFill" />
        </view>
        <view class="user-details">
          <block v-if="isLogin">
            <view class="nickname theme-text-primary">{{ userInfo?.name || "匿名用户" }}</view>
            <view class="user-id theme-text-secondary">ID: {{ userInfo?.username || "0000000" }}</view>
          </block>
          <block v-else>
            <view class="login-prompt text-white">立即登录获取更多功能</view>
            <wd-button custom-class="btn-login" size="small" type="primary"
              @click="navigateToLoginPage">登录/注册</wd-button>
          </block>
        </view>
        <view class="actions">
          <view 
            class="action-btn action-btn-settings" 
            @click="handleSettingsClick"
            @tap="handleSettingsClick"
          >
            <text class="debug-text">⚙️</text>
            <wd-icon name="setting1" size="22" color="#a0a0a0" />
          </view>
          <view 
            v-if="isLogin" 
            class="action-btn action-btn-messages" 
            @click="handleMessagesClick"
            @tap="handleMessagesClick"
          >
            <wd-badge v-if="true" modelValue="99+">
              <wd-icon name="notification" size="22" color="#a0a0a0" />
            </wd-badge>
          </view>
        </view>
      </view>
    </view>

    <!-- 数据统计 -->
    <view class="stats-card theme-card">
      <view class="stats-item" @click="navigateToSection('wallet')">
        <view class="mb-sm text-lg font-bold theme-text-primary">0.00</view>
        <view class="text-sm theme-text-secondary">我的余额</view>
      </view>
      <view class="stats-divider"></view>
      <view class="stats-item" @click="navigateToSection('favorites')">
        <view class="mb-sm text-lg font-bold theme-text-primary">0</view>
        <view class="text-sm theme-text-secondary">我的收藏</view>
      </view>
      <view class="stats-divider"></view>
      <view class="stats-item" @click="navigateToSection('history')">
        <view class="mb-sm text-lg font-bold theme-text-primary">0</view>
        <view class="text-sm theme-text-secondary">浏览历史</view>
      </view>
    </view>

    <!-- 常用工具 -->
    <view class="card-container">
      <view class="card-header">
        <view class="flex-start">
          <wd-icon name="tools" size="18" :color="themeVars.colorTheme" />
          <text class="theme-text-secondary ml-12rpx text-28rpx font-600">常用工具</text>
        </view>
      </view>
      <view class="flex flex-wrap p-20rpx pt-20rpx pb-10rpx">
        <view class="tool-item" @click="navigateToProfile">
          <view class="tool-icon">
            <wd-icon name="user" size="24" :color="currentThemeColor.primary" />
          </view>
          <view class="theme-text-secondary text-24rpx">个人资料</view>
        </view>
        <view class="tool-item" @click="navigateToFAQ">
          <view class="tool-icon">
            <wd-icon name="help-circle" size="24" :color="currentThemeColor.primary" />
          </view>
          <view class="theme-text-secondary text-24rpx">常见问题</view>
        </view>
        <view class="tool-item" @click="handleQuestionFeedback">
          <view class="tool-icon">
            <wd-icon name="check-circle" size="24" :color="currentThemeColor.primary" />
          </view>
          <view class="theme-text-secondary text-24rpx">问题反馈</view>
        </view>
        <view class="tool-item" @click="navigateToAbout">
          <view class="tool-icon">
            <wd-icon name="info-circle" size="24" :color="currentThemeColor.primary" />
          </view>
          <view class="theme-text-secondary text-24rpx">关于我们</view>
        </view>
      </view>
    </view>

    <!-- 推荐服务 -->
    <view class="card-container">
      <view class="card-header">
        <view class="flex-start">
          <wd-icon name="star" size="18" :color="currentThemeColor.primary" />
          <text class="theme-text-secondary ml-12rpx text-28rpx font-600">推荐服务</text>
        </view>
      </view>
      <view>
        <view class="service-item" @click="navigateToSection('services', 'vip')">
          <view class="flex-start">
            <view class="service-icon">
              <wd-icon name="dong" size="22" :color="currentThemeColor.primary" />
            </view>
            <view>
              <view class="theme-text-secondary text-28rpx font-500">会员中心</view>
              <view class="mt-8rpx text-24rpx text-gray-500">解锁更多特权</view>
            </view>
          </view>
          <wd-icon name="arrow-right" size="14" />
        </view>
        <view class="service-item" @click="navigateToSection('services', 'coupon')">
          <view class="flex-start">
            <view class="service-icon">
              <wd-icon name="discount" size="22" :color="currentThemeColor.primary" />
            </view>
            <view>
              <view class="theme-text-secondary text-28rpx font-500 text-28rpx font-500">优惠券</view>
              <view class="mt-8rpx text-24rpx text-gray-500">查看我的优惠券</view>
            </view>
          </view>
          <wd-icon name="arrow-right" size="14" />
        </view>
        <view class="service-item service-item-last" @click="navigateToSection('services', 'invite')">
          <view class="flex-start">
            <view class="service-icon">
              <wd-icon name="share" size="22" :color="currentThemeColor.primary" />
            </view>
            <view>
              <view class="theme-text-secondary text-28rpx font-500 text-28rpx font-500">邀请有礼</view>
              <view class="mt-8rpx text-24rpx text-gray-500">邀请好友得奖励</view>
            </view>
          </view>
          <wd-icon name="arrow-right" size="14" />
        </view>
      </view>
    </view>

    <!-- 退出登录按钮 -->
    <view v-if="isLogin" class="p-30rpx">
      <wd-button custom-class="logout-button" plain @click="handleLogout">退出登录</wd-button>
    </view>
    <wd-toast />
  </view>
</template>

<script lang="ts" setup>
import { useToast } from "wot-design-uni";
import { useRouter } from "uni-mini-router";
import { useUserStore } from "@/store";
import { useThemeStore } from "@/store/modules/theme.store";
import { computed, ref, onMounted, onUnmounted, watch } from "vue";

const toast = useToast();
const userStore = useUserStore();
const themeStore = useThemeStore();

// 强制重新渲染的key
const renderKey = ref(0);

// 主题是否已准备好
const isThemeReady = ref(true); // 立即设置为 true，因为 themeVars computed 已经有默认值保护

// 默认主题变量对象
const defaultThemeVars = {
  darkColor3: '#a0a0a0',
  darkColor: '#ffffff',
  darkColor2: '#e0e0e0',
  colorTheme: '#4D7FFF',
  colorBg: '#f8f8f8',
  colorTitle: '#1d2129',
  colorContent: '#4e5969',
  colorSecondary: '#86909c',
  colorBorder: '#e5e6eb',
  colorBorderLight: '#f2f3f5',
  cardBg: '#ffffff',
  cardTitleColor: '#1d2129',
  cardContentColor: '#4e5969',
  cardContentBorderColor: '#e5e6eb',
};

// 主题变量，确保始终有默认值
const themeVars = computed(() => {
  try {
    const vars = themeStore?.themeVars;
    // 如果 themeVars 不存在，返回默认值对象
    if (!vars) {
      return defaultThemeVars;
    }
    // 确保所有必需的属性都有值
    return {
      ...defaultThemeVars,
      ...vars,
      darkColor3: vars.darkColor3 || defaultThemeVars.darkColor3,
      colorTheme: vars.colorTheme || defaultThemeVars.colorTheme,
    };
  } catch (error) {
    // 静默失败，使用默认值
    return defaultThemeVars;
  }
});

// 图标颜色，确保始终有值
const iconColor = computed(() => {
  return themeVars.value?.darkColor3 || '#a0a0a0';
});

// 修复: 直接返回主题色对象，确保可以访问primary属性
const currentThemeColor = computed(() => {
  try {
    const color = themeStore?.currentThemeColor;
    return color || { primary: '#4D7FFF', name: '默认蓝', value: 'blue' };
  } catch (error) {
    // 静默失败，使用默认值
    return { primary: '#4D7FFF', name: '默认蓝', value: 'blue' };
  }
});

// 确保 themeStore 已初始化
onMounted(() => {
  try {
    // 强制初始化主题
    if (!themeStore.themeVars) {
      themeStore.initTheme();
    } else if (!themeStore.themeVars.darkColor3) {
      themeStore.initTheme();
    }
  } catch (error) {
    // 即使初始化失败，themeVars computed 也会返回默认值
  }
});

const userInfo = computed(() => userStore.userInfo);
const isLogin = computed(() => !!userInfo.value);
const defaultAvatar = "/static/images/default-avatar.png";
const isLoading = ref(false);

const router = useRouter();

// 监听主题色变化 - 使用下划线前缀标记未使用的参数
const handleThemeColorChange = (_color: string) => {
  renderKey.value++;
};

onMounted(() => {
  uni.$on('global-theme-color-change', handleThemeColorChange);
});

onUnmounted(() => {
  uni.$off('global-theme-color-change', handleThemeColorChange);
});

// 登录
const navigateToLoginPage = () => {
  const pages = getCurrentPages();
  const currentPage = pages[pages.length - 1];
  const currentPagePath = `/${currentPage.route}`;

  router.push({ path: "/pages/login/index", query: { redirect: currentPagePath } });
};

// 退出登录
const handleLogout = () => {
  uni.showModal({
    title: "提示",
    content: "确认退出登录吗？",
    success: function (res) {
      if (res.confirm) {
        userStore.logout();
        toast.show("已退出登录");
      }
    },
  });
};

// 个人信息
const navigateToProfile = () => {
  if (!isLogin.value) {
    navigateToLoginPage();
    return;
  }
  router.push({ path: "/pages/mine/profile/index" });
};

// 常见问题
const navigateToFAQ = () => {
  router.push({ path: "/pages/mine/faq/index" });
};

// 关于我们
const navigateToAbout = () => {
  router.push({ path: "/pages/mine/about/index" });
};

// 设置按钮点击处理
const handleSettingsClick = (e?: any) => {
  if (e) {
    e.stopPropagation();
    e.preventDefault();
  }
  navigateToSettings();
};

// 设置
const navigateToSettings = () => {
  // 使用 router.push，与其他页面保持一致
  router.push({ path: "/pages/mine/settings/index" });
};

// 消息按钮点击处理
const handleMessagesClick = (e?: any) => {
  if (e) {
    e.stopPropagation();
    e.preventDefault();
  }
  navigateToSection('messages');
};

// 问题反馈
const handleQuestionFeedback = () => {
  router.push({ path: "/pages/mine/feedback/index" });
};

// 导航到各个板块
const navigateToSection = (section: string, subSection?: string, e?: any) => {
  if (e) {
    e.stopPropagation();
    e.preventDefault();
  }
  // 这里可以根据需要实现具体的导航逻辑
  uni.showToast({
    title: "功能开发中",
    icon: "none",
  });
};

onShow(() => {
  // 确保 tabbar 状态正确
  const pages = getCurrentPages();
  if (pages.length > 0) {
    const currentPage = pages[pages.length - 1];
    if (currentPage.route === "pages/mine/index") {
      // 通过事件通知 tabbar 布局更新状态
      uni.$emit("updateTabbar", "mine");
    }
  }

  // 每次显示页面时都检查并刷新用户信息
  loadUserInfo();
});

// 加载用户信息
const loadUserInfo = async () => {
  if (isLogin.value) {
    isLoading.value = true;
    try {
      await userStore.getInfo();
    } catch (error) {
      console.error("获取用户信息失败", error);
    } finally {
      isLoading.value = false;
    }
  }
};

// 监听用户信息变化，确保数据及时更新
watch(
  () => userInfo.value,
  () => { },
  {
    deep: true,
    immediate: true,
  }
);
</script>

<route lang="json">{
  "name": "mine",
  "style": {
    "navigationStyle": "custom"
  },
  "layout": "tabbar"
}</route>

<style lang="scss" scoped>
// 用户信息卡片
.user-profile {
  position: relative;
  padding: 30rpx;
  margin: 12rpx;
  overflow: hidden;
  border-radius: 16rpx;
  box-shadow: var(--shadow-medium);

  .blur-bg {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    z-index: 0;
    height: 240rpx;
    background: linear-gradient(135deg, var(--wot-color-theme, #165dff) 0%, #667eea 100%);
  }

  .user-info {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;

    .avatar-container {
      position: relative;

      .avatar {
        width: 120rpx;
        height: 120rpx;
        border: 4rpx solid rgba(255, 255, 255, 0.8);
        border-radius: 50%;
        box-shadow: 0 6rpx 16rpx rgba(0, 0, 0, 0.1);
      }
    }

    .user-details {
      flex: 1;
      margin-left: 24rpx;

      .nickname {
        margin-bottom: 8rpx;
        font-size: 34rpx;
        font-weight: bold;
      }

      .user-id {
        font-size: 24rpx;
      }

      .login-prompt {
        margin-bottom: 16rpx;
        font-size: 28rpx;
      }
    }

    .actions {
      display: flex;
      position: relative;
      z-index: 100;
      flex-shrink: 0;

      .action-btn {
        position: relative;
        display: flex !important;
        align-items: center;
        justify-content: center;
        width: 70rpx;
        height: 70rpx;
        min-width: 70rpx;
        min-height: 70rpx;
        margin-left: 16rpx;
        background-color: rgba(255, 255, 255, 0.9) !important;
        border-radius: 50%;
        box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.05);
        cursor: pointer;
        z-index: 101;
        pointer-events: auto;
        
        .debug-text {
          position: absolute;
          font-size: 20rpx;
          z-index: 103;
        }
        
        // 确保图标可见
        :deep(.wd-icon) {
          display: block !important;
          visibility: visible !important;
          opacity: 1 !important;
          color: #a0a0a0 !important;
          position: relative;
          z-index: 102;
        }
        
        &:active {
          opacity: 0.7;
          transform: scale(0.95);
        }
        
        // 设置按钮特殊样式
        &.action-btn-settings {
          z-index: 102;
          border: 2rpx solid rgba(160, 160, 160, 0.3);
        }
      }
    }
  }
}

// 卡片容器
.card-container {
  margin: 24rpx 12rpx;
  overflow: hidden;
  background-color: var(--card-bg-color, #ffffff);
  border-radius: 16rpx;
  box-shadow: var(--shadow-medium);
}

// 卡片头部
.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20rpx 24rpx;
  border-bottom: 1rpx solid var(--border-color, #e5e7eb);
}

// 工具项
.tool-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 25%;
  margin-bottom: 30rpx;
}

// 工具图标
.tool-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 90rpx;
  height: 90rpx;
  margin-bottom: 12rpx;
  background-color: var(--bg-color-2, #f3f4f6);
  border-radius: 18rpx;
  transition: transform 0.15s ease;

  &:active {
    transform: scale(0.95);
  }
}

// 数据统计卡片
.stats-card {
  display: flex;
  align-items: center;
  padding: 30rpx;
  margin: 24rpx 12rpx;
  background-color: var(--card-bg-color, #ffffff);
  border-radius: 16rpx;
  box-shadow: var(--shadow-medium);
}

.stats-item {
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
}

.stats-divider {
  width: 1px;
  margin: 0 20rpx;
  background-color: var(--border-color, #e5e7eb);
}

// 服务项
.service-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24rpx;
  border-bottom: 1rpx solid var(--border-color, #e5e7eb);
  transition: background-color 0.15s ease;

  &:active {
    background-color: var(--bg-color-2, #f3f4f6);
  }

  &.service-item-last {
    border-bottom: none;
  }
}

// 服务图标
.service-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80rpx;
  height: 80rpx;
  margin-right: 20rpx;
  background-color: var(--bg-color-2, #f3f4f6);
  border-radius: 16rpx;
}

// 登录按钮样式
:deep(.btn-login) {
  font-size: 24rpx !important;
  border-radius: 20rpx !important;
}

// 退出登录按钮样式
:deep(.logout-button) {
  width: 100% !important;
  height: 80rpx !important;
  font-size: 32rpx !important;
  font-weight: bold !important;
  border-radius: 40rpx !important;
}

// 文字白色样式（用于在蓝色背景上显示白色文字）
.text-white {
  color: #ffffff !important;
}

// 暗色模式适配
:deep(.dark) {

  .tool-icon,
  .service-icon,
  .service-item:active {
    background-color: var(--bg-color-2, #374151);
  }

  .stats-divider,
  .card-header {
    border-color: var(--border-color, #374151);
  }
}
</style>