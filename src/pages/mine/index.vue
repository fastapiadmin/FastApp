<!-- layout: tabbar -->
<script lang="ts" setup>
import { onShow } from '@dcloudio/uni-app'
import { computed, ref, watch } from 'vue'
import { useToast } from 'wot-design-uni'
import { useUserStore } from '@/store/userStore'

definePage({
  name: 'mine',
  layout: 'tabbar',
  style: {
    navigationBarTitleText: '我的',
  },
})

// 页面配置
// 移除了 definePage 调用，使用默认配置

const toast = useToast()
const userStore = useUserStore()

// 强制重新渲染的key
const renderKey = ref(0)

// 主题是否已准备好
const isThemeReady = ref(true) // 立即设置为 true，因为 themeVars computed 已经有默认值保护

const userInfo = computed(() => userStore.userInfo)
const isLogin = computed(() => !!userInfo.value)
const defaultAvatar = '/static/images/default-avatar.png'
const isLoading = ref(false)

// 登录
function navigateToLoginPage() {
  const pages = getCurrentPages()
  const currentPage = pages[pages.length - 1]
  const currentPagePath = `/${currentPage.route}`

  uni.navigateTo({
    url: `/pages/login/index?redirect=${encodeURIComponent(currentPagePath)}`,
  })
}

// 退出登录
function handleLogout() {
  uni.showModal({
    title: '提示',
    content: '确认退出登录吗？',
    success(res) {
      if (res.confirm) {
        userStore.logout()
        toast.show('已退出登录')
      }
    },
  })
}

// 个人信息
function navigateToProfile() {
  if (!isLogin.value) {
    navigateToLoginPage()
    return
  }
  uni.navigateTo({
    url: '/pages/mine/profile/index',
  })
}

// 常见问题
function navigateToFAQ() {
  uni.navigateTo({
    url: '/pages/mine/faq/index',
  })
}

// 关于我们
function navigateToAbout() {
  uni.navigateTo({
    url: '/pages/mine/about/index',
  })
}

// 设置按钮点击处理
function handleSettingsClick(e?: any) {
  if (e) {
    e.stopPropagation()
    e.preventDefault()
  }
  navigateToSettings()
}

// 设置
function navigateToSettings() {
  uni.navigateTo({
    url: '/pages/mine/settings/index',
  })
}

// 消息按钮点击处理
function handleMessagesClick(e?: any) {
  if (e) {
    e.stopPropagation()
    e.preventDefault()
  }
  navigateToSection('messages')
}

// 问题反馈
function handleQuestionFeedback() {
  uni.navigateTo({
    url: '/pages/mine/feedback/index',
  })
}

// 导航到各个板块
function navigateToSection(section: string, subSection?: string, e?: any) {
  if (e) {
    e.stopPropagation()
    e.preventDefault()
  }
  // 这里可以根据需要实现具体的导航逻辑
  uni.showToast({
    title: '功能开发中',
    icon: 'none',
  })
}

onShow(() => {
  // 确保 tabbar 状态正确
  const pages = getCurrentPages()
  if (pages.length > 0) {
    const currentPage = pages[pages.length - 1]
    if (currentPage.route === 'pages/mine/index') {
      // 通过事件通知 tabbar 布局更新状态
      uni.$emit('updateTabbar', 'mine')
    }
  }

  // 每次显示页面时都检查并刷新用户信息
  loadUserInfo()
})

// 加载用户信息
async function loadUserInfo() {
  if (isLogin.value) {
    isLoading.value = true
    try {
      await userStore.getInfo()
    }
    catch (error) {
      console.error('获取用户信息失败', error)
    }
    finally {
      isLoading.value = false
    }
  }
}

// 监听用户信息变化，确保数据及时更新
watch(
  () => userInfo.value,
  () => {},
  {
    deep: true,
    immediate: true,
  },
)
</script>

<template>
  <view v-if="isThemeReady" :key="renderKey" class="app-container">
    <!-- 用户信息卡片 -->
    <view class="user-profile theme-card">
      <view class="blur-bg" />
      <view class="user-info">
        <view class="avatar-container" @click="navigateToProfile">
          <image
            class="avatar"
            :src="isLogin ? userInfo!.avatar : defaultAvatar"
            mode="aspectFill"
          />
        </view>
        <view class="user-details">
          <block v-if="isLogin">
            <view class="nickname theme-text-primary">
              {{
                userInfo?.name || "匿名用户"
              }}
            </view>
            <view class="user-id theme-text-secondary">
              ID: {{ userInfo?.username || "0000000" }}
            </view>
          </block>
          <block v-else>
            <view class="login-prompt text-white">
              立即登录获取更多功能
            </view>
            <wd-button
              custom-class="btn-login"
              size="small"
              type="primary"
              @click="navigateToLoginPage"
            >
              登录/注册
            </wd-button>
          </block>
        </view>
        <view class="actions">
          <view
            class="action-btn action-btn-settings"
            @click="handleSettingsClick"
            @tap="handleSettingsClick"
          >
            <text class="debug-text">
              ⚙️
            </text>
            <wd-icon name="setting1" size="22" color="#a0a0a0" />
          </view>
          <view
            v-if="isLogin"
            class="action-btn action-btn-messages"
            @click="handleMessagesClick"
            @tap="handleMessagesClick"
          >
            <wd-badge v-if="true" model-value="99+">
              <wd-icon name="notification" size="22" color="#a0a0a0" />
            </wd-badge>
          </view>
        </view>
      </view>
    </view>

    <!-- 数据统计 -->
    <view class="stats-card theme-card">
      <view class="stats-item" @click="navigateToSection('wallet')">
        <view class="theme-text-primary mb-sm text-lg font-bold">
          0.00
        </view>
        <view class="theme-text-secondary text-sm">
          我的余额
        </view>
      </view>
      <view class="stats-divider" />
      <view class="stats-item" @click="navigateToSection('favorites')">
        <view class="theme-text-primary mb-sm text-lg font-bold">
          0
        </view>
        <view class="theme-text-secondary text-sm">
          我的收藏
        </view>
      </view>
      <view class="stats-divider" />
      <view class="stats-item" @click="navigateToSection('history')">
        <view class="theme-text-primary mb-sm text-lg font-bold">
          0
        </view>
        <view class="theme-text-secondary text-sm">
          浏览历史
        </view>
      </view>
    </view>

    <!-- 常用工具 -->
    <view class="card-container theme-card">
      <view class="card-header">
        <view class="flex-start">
          <wd-icon name="tools" size="18" />
          <text class="theme-text-secondary ml-12rpx text-28rpx font-600">
            常用工具
          </text>
        </view>
      </view>
      <view class="flex flex-wrap p-20rpx pb-10rpx pt-20rpx">
        <view class="tool-item" @click="navigateToProfile">
          <view class="tool-icon">
            <wd-icon name="user" size="24" />
          </view>
          <view class="theme-text-secondary text-24rpx">
            个人资料
          </view>
        </view>
        <view class="tool-item" @click="navigateToFAQ">
          <view class="tool-icon">
            <wd-icon
              name="help-circle"
              size="24"
            />
          </view>
          <view class="theme-text-secondary text-24rpx">
            常见问题
          </view>
        </view>
        <view class="tool-item" @click="handleQuestionFeedback">
          <view class="tool-icon">
            <wd-icon
              name="check-circle"
              size="24"
            />
          </view>
          <view class="theme-text-secondary text-24rpx">
            问题反馈
          </view>
        </view>
        <view class="tool-item" @click="navigateToAbout">
          <view class="tool-icon">
            <wd-icon
              name="info-circle"
              size="24"
            />
          </view>
          <view class="theme-text-secondary text-24rpx">
            关于我们
          </view>
        </view>
      </view>
    </view>

    <!-- 推荐服务 -->
    <view class="card-container theme-card">
      <view class="card-header">
        <view class="flex-start">
          <wd-icon name="star" size="18" />
          <text class="theme-text-secondary ml-12rpx text-28rpx font-600">
            推荐服务
          </text>
        </view>
      </view>
      <view>
        <view
          class="service-item"
          @click="navigateToSection('services', 'vip')"
        >
          <view class="flex-start">
            <view class="service-icon">
              <wd-icon
                name="dong"
                size="22"
              />
            </view>
            <view>
              <view class="theme-text-secondary text-28rpx font-500">
                会员中心
              </view>
              <view class="mt-8rpx text-24rpx text-gray-500">
                解锁更多特权
              </view>
            </view>
          </view>
          <wd-icon name="arrow-right" size="14" />
        </view>
      </view>
    </view>

    <!-- 退出登录按钮 -->
    <view v-if="isLogin" class="p-30rpx">
      <wd-button size="large" block @click="handleLogout">
        退出登录
      </wd-button>
    </view>
    <wd-toast />
  </view>
</template>

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
    background: linear-gradient(
      135deg,
      var(--wot-color-theme, #165dff) 0%,
      #667eea 100%
    );
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
      position: relative;
      z-index: 100;
      display: flex;
      flex-shrink: 0;

      .action-btn {
        position: relative;
        z-index: 101;
        display: flex !important;
        align-items: center;
        justify-content: center;
        width: 70rpx;
        min-width: 70rpx;
        height: 70rpx;
        min-height: 70rpx;
        margin-left: 16rpx;
        pointer-events: auto;
        cursor: pointer;
        background-color: rgba(255, 255, 255, 0.9) !important;
        border-radius: 50%;
        box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.05);

        .debug-text {
          position: absolute;
          z-index: 103;
          font-size: 20rpx;
        }

        // 确保图标可见
        :deep(.wd-icon) {
          position: relative;
          z-index: 102;
          display: block !important;
          visibility: visible !important;
          opacity: 1 !important;
        }

        &:active {
          opacity: 0.7;
          transform: scale(0.95);
        }

        // 设置按钮特殊样式
        &.action-btn-settings {
          z-index: 102;
        }
      }
    }
  }
}

// 卡片容器
.card-container {
  align-items: center;
  padding: 12rpx;
  border-radius: 16rpx;
  margin: 24rpx 12rpx;
  background-color: var(--card-bg-color);
  box-shadow: var(--shadow-medium);
}

// 卡片头部
.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12rpx 24rpx;
  border-bottom: 1rpx solid var(--border-color);
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
  background-color: var(--bg-color-2);
  border-radius: 18rpx;
}

// 数据统计卡片
.stats-card {
  display: flex;
  align-items: center;
  padding: 30rpx;
  margin: 24rpx 12rpx;
  background-color: var(--card-bg-color);
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
  background-color: var(--border-color);
}

// 服务项
.service-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24rpx;
  border-bottom: 1rpx solid var(--border-color);
  transition: background-color 0.15s ease;

  &:active {
    background-color: var(--bg-color-2);
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
  background-color: var(--bg-color-2);
  border-radius: 16rpx;
}

// 登录按钮样式
:deep(.btn-login) {
  font-size: 24rpx !important;
  border-radius: 20rpx !important;
}

// 暗色模式适配
:deep(.dark) {
  .tool-icon,
  .service-icon,
  .service-item:active {
    background-color: var(--bg-color-2);
  }

  .stats-divider,
  .card-header {
    border-color: var(--border-color);
  }
}
</style>
