<template>
  <view class="app-container">
    <wd-card custom-style="margin-top: 20rpx" class="theme-card">
      <view class="company-section flex-center flex-column">
        <view class="about-meta text-center">
          <text class="app-title theme-text-primary">{{ webTitle }}-{{ version }}</text>
          <text class="section-subtitle theme-text-secondary">{{ webDescription }}</text>
        </view>
      </view>
    </wd-card>

    <!-- 项目列表 -->
    <wd-card title="技术栈" custom-style="margin-top: 20rpx" class="theme-card">
      <wd-cell-group border>
        <wd-cell title="后台" icon="desktop">
          <view slot="label" class="project-desc theme-text-secondary">基于 FastAPI + Uvicorn + SQLAlchemy 构建的RBAC管理系统
          </view>
        </wd-cell>

        <wd-cell title="web前端" icon="mobile">
          <view slot="label" class="project-desc theme-text-secondary">基于 Vue3 + Vite6 + TypeScript + Element-Plus +
            Pinia 构建的中后台管理模板</view>
        </wd-cell>

        <wd-cell title="移动端" icon="server" label="">
          <view slot="label" class="project-desc theme-text-secondary">基于 uni-app + Vite6 + Vue 3 + TypeScript + Wot
            Design Uni + Pinia
            构建的移动端应用模板</view>
        </wd-cell>
      </wd-cell-group>
    </wd-card>


    <!-- 底部版权信息 -->
    <view class="about-footer text-center">
      <text class="copyright theme-text-secondary">{{ copyright }}</text>
      <text class="copyright copyright-sub theme-text-secondary">{{ keepRecord }}</text>
    </view>
  </view>
</template>

<script lang="ts" setup>

// 系统配置数据
const webTitle = ref("FastApiAdmin");
const webDescription = ref("完全开源的权限管理系统");
const version = ref("V2.0.0");
const keepRecord = ref("陕ICP备2025069493号-1");
const copyright = ref("Copyright © 2025-2026 service.fastapiadmin.com 版权所有");

onMounted(() => {
  // #ifdef MP-WEIXIN
  version.value = uni.getSystemInfoSync().appVersion;
  // #endif
});
</script>

<route lang="json">{
  "name": "about",
  "style": {}
}</route>

<style lang="scss" scoped>
.about-logo {
  margin-bottom: 20rpx;
}

.about-meta {
  .app-title {
    display: block;
    margin-bottom: 8rpx;
    font-size: 36rpx;
    font-weight: 700;
  }

  .app-version {
    font-size: 28rpx;
  }
}

.company-section {
  padding: 24rpx;
}

.section-title {
  margin-bottom: 12rpx;
  font-size: 32rpx;
  font-weight: 600;
}

.section-subtitle {
  display: block;
  padding-left: 32rpx;
  font-size: 28rpx;
  line-height: 1.5;
}

.project-desc {
  margin-top: 8rpx;
  font-size: 26rpx;
  line-height: 1.4;
}

.about-footer {
  padding: 40rpx 20rpx;
}

.copyright {
  display: block;
  font-size: 24rpx;
  line-height: 1.5;
}

.copyright-sub {
  margin-top: 8rpx;
}
</style>
