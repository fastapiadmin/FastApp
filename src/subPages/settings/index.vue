<script lang="ts" setup>
import { onLoad, onShow } from '@dcloudio/uni-app'
import { computed, ref } from 'vue'
import { useUserStore } from '@/store/userStore'

definePage({
  name: 'settings',
  style: {
    navigationBarTitleText: '系统设置',
  },
})

const userStore = useUserStore()
const isLogin = computed(() => !!userStore.userInfo)
const { initNavigationBar, setNavigationBarStyle } = useNavigationBar()

// 初始化导航栏样式
initNavigationBar()

// 页面显示时重新设置导航栏样式
onShow(() => {
  setNavigationBarStyle()
})

// 个人资料
function navigateToProfile() {
  if (isLogin.value) {
    uni.navigateTo({
      url: '/pages/mine/profile/index',
    })
  }
}

// 账号和安全
function navigateToAccount() {
  if (isLogin.value) {
    uni.navigateTo({
      url: '/pages/mine/settings/account/index',
    })
  }
}

// 主题设置
function navigateToTheme() {
  uni.navigateTo({
    url: '/pages/mine/settings/theme/index',
  })
}

// 关于我们
function navigateToAbout() {
  uni.navigateTo({
    url: '/pages/mine/about/index',
  })
}

// 是否正在清理
const clearing = ref(false)
// 缓存大小
const cacheSize = ref<any>('计算中...')
// 获取缓存大小
async function getCacheSize() {
  try {
    // #ifdef MP-WEIXIN
    const res = await uni.getStorageInfo()
    cacheSize.value = formatSize(res.currentSize)
    // #endif
    // #ifdef H5
    cacheSize.value = formatSize(
      Object.keys(localStorage).reduce(
        (size, key) => size + localStorage[key].length,
        0,
      ),
    )
    // #endif
    if (!cacheSize.value) {
      cacheSize.value = '0B'
    }
  }
  catch (error) {
    console.error('获取缓存大小失败:', error)
    cacheSize.value = '获取失败'
  }
}

// 格式化存储大小
function formatSize(size: number) {
  if (size < 1024) {
    return `${size}B`
  }
  else if (size < 1024 * 1024) {
    return `${(size / 1024).toFixed(2)}KB`
  }
  else {
    return `${(size / 1024 / 1024).toFixed(2)}MB`
  }
}

// 处理清除缓存
async function handleClearCache() {
  if (cacheSize.value === '获取失败') {
    uni.showToast({
      title: '获取缓存信息失败，请稍后重试',
      icon: 'none',
      duration: 2000,
    })
    return
  }
  if (cacheSize.value === '0B') {
    uni.showToast({
      title: '暂无缓存需要清理',
      icon: 'none',
      duration: 2000,
    })
    return
  }
  if (clearing.value) {
    return
  }

  try {
    clearing.value = true
    // 模拟清理过程
    await new Promise(resolve => setTimeout(resolve, 1500))
    // 清除缓存
    await uni.clearStorage()
    // 更新缓存大小显示
    await getCacheSize()
    // 提示清理成功
    uni.showToast({
      title: '清理成功',
      icon: 'success',
    })
  }
  catch {
    uni.showToast({
      title: '清理失败',
      icon: 'error',
    })
  }
  finally {
    clearing.value = false
  }
}

// 退出登录
function handleLogout() {
  uni.showModal({
    title: '提示',
    content: '确定要退出登录吗？',
    success(res) {
      if (res.confirm) {
        userStore.logout()
        uni.showToast({
          title: '已退出登录',
          icon: 'success',
        })
      }
    },
  })
}

// 页面加载时初始化
onLoad(() => {
  getCacheSize()
})
</script>

<template>
  <view class="app-container">
    <wd-cell-group>
      <wd-cell
        v-if="isLogin"
        title="个人资料"
        icon="user"
        is-link
        @click="navigateToProfile"
      />
      <wd-cell
        v-if="isLogin"
        title="账号和安全"
        icon="secured"
        is-link
        @click="navigateToAccount"
      />
      <wd-cell
        title="主题设置"
        icon="setting1"
        is-link
        @click="navigateToTheme"
      />
      <wd-cell
        title="关于我们"
        icon="info-circle"
        is-link
        @click="navigateToAbout"
      />
      <wd-divider />
      <wd-cell
        title="清空缓存"
        icon="delete1"
        :value="cacheSize"
        clickable
        @click="handleClearCache"
      />
    </wd-cell-group>

    <view v-if="isLogin" class="logout-section">
      <wd-button class="logout-btn" @click="handleLogout">
        退出登录
      </wd-button>
    </view>

    <!-- 使用wot-design-uni的Loading组件 -->
    <wd-loading
      v-if="clearing"
      v-model="clearing"
      text="正在清理..."
      mask
      custom-class="loading-center"
    />
  </view>
</template>

<style lang="scss">
// H5 环境下导航栏样式 - 使用系统主题变量
// #ifdef H5
.uni-page-head {
  background-color: var(--card-bg-color) !important;
  border-bottom-color: var(--border-color) !important;
  transition:
    background-color 0.3s ease,
    border-color 0.3s ease;
}

.wot-theme-dark .uni-page-head {
  background-color: var(--bg-color) !important;
  border-bottom-color: var(--border-color) !important;
}

.uni-page-head__title {
  color: var(--text-color) !important;
  transition: color 0.3s ease;
}

.wot-theme-dark .uni-page-head__title {
  color: var(--text-color) !important;
}

.uni-page-head__btn {
  color: var(--text-color) !important;
  transition: color 0.3s ease;
}

.wot-theme-dark .uni-page-head__btn {
  color: var(--text-color) !important;
}

// #endif

.app-container {
  min-height: 100vh;
  background-color: var(--card-bg-color);
  transition: background-color 0.3s ease;
}

// 暗黑模式支持
.wot-theme-dark .app-container {
  background-color: var(--bg-color);
}

.logout-section {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 20rpx;
  margin-top: 40rpx;
}

.logout-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 90%;
  height: 90rpx;
  font-size: 32rpx;
  font-weight: 500;
  color: var(--text-color-inverse);
  background-color: var(--primary-color);
  border: none;
  border-radius: 45rpx;
  box-shadow: var(--shadow-medium);
  transition:
    opacity 0.2s,
    background-color 0.3s ease;

  &:active {
    opacity: 0.85;
  }
}

:deep(.loading-center) {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: var(--mask-color);
  border-radius: 12rpx;
}

:deep(.loading-center .wd-loading__spinner) {
  margin: 0 auto;
}

:deep(.loading-center .wd-loading__text) {
  margin-top: 20rpx;
  color: var(--text-color-inverse);
  text-align: center;
}
</style>
