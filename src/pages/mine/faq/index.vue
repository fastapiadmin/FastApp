<template>
  <view class="app-container">
    <scroll-view class=" content-scroll" scroll-y :scroll-top="scrollTop" @scroll="handleScroll">
    <view class="content-wrapper">
      <!-- 技术支持卡片 -->
      <view class="support-card theme-card">
        <view class="card-header flex items-center">
          <wd-icon name="service" size="48rpx" :color="themeVars.colorTheme" />
          <text class="card-title theme-text-primary ml-md">技术支持</text>
        </view>
        <view class="card-body">
          <text class="card-desc theme-text-secondary">专业的技术团队为您提供7×24小时服务支持</text>
          <view class="support-grid">
            <view class="support-item theme-card" @tap="handleContact('email')">
              <view class="support-icon flex-center">
                <wd-icon name="mail" size="40rpx" :color="themeVars.colorTheme" />
              </view>
              <view class="support-info">
                <text class="support-label theme-text-primary">邮箱支持</text>
                <text class="support-value theme-text-secondary" user-select>support@example.com</text>
              </view>
            </view>
            <view class="support-item theme-card" @tap="handleContact('phone')">
              <view class="support-icon flex-center">
                <wd-icon name="phone" size="40rpx" :color="themeVars.colorTheme" />
              </view>
              <view class="support-info">
                <text class="support-label theme-text-primary">客服热线</text>
                <text class="support-value theme-text-secondary">400-123-4567</text>
              </view>
            </view>
            <view class="support-item theme-card">
              <view class="support-icon flex-center">
                <wd-icon name="clock" size="40rpx" :color="themeVars.colorTheme" />
              </view>
              <view class="support-info">
                <text class="support-label theme-text-primary">服务时间</text>
                <text class="support-value theme-text-secondary">工作日 9:00-18:00</text>
              </view>
            </view>
          </view>
        </view>
      </view>

      <!-- FAQ内容区域 -->
      <view class="faq-section theme-card mt-md">
        <wd-collapse v-model="activeNames" accordion>
          <wd-collapse-item title="常见问题" name="faq">
            <view class="faq-list">
              <view v-for="(item, index) in faqList" :key="index" class="faq-item theme-card"
                :class="{ active: currentFaq === index }" @tap="toggleFaq(index)">
                <view class="faq-header flex justify-between items-center">
                  <view class="faq-question flex items-center">
                    <wd-icon name="question-filled" size="28rpx" :color="themeVars.colorTheme" />
                    <text class="question-text theme-text-primary ml-sm">{{ item.question }}</text>
                  </view>
                  <wd-icon name="arrow-down-bold" size="24rpx" :color="themeVars.darkColor3"
                    :custom-class="currentFaq === index ? 'rotate-180' : ''" />
                </view>
                <view v-if="currentFaq === index" class="faq-answer">
                  <text class="answer-text theme-text-secondary">{{ item.answer }}</text>
                </view>
              </view>
            </view>
          </wd-collapse-item>

          <wd-collapse-item title="系统功能" name="features">
            <view class="feature-list">
              <view v-for="(feature, index) in featureList" :key="index" class="feature-item theme-card">
                <view class="feature-icon flex-center">
                  <wd-icon :name="feature.icon" size="48rpx" :color="themeVars.colorTheme" />
                </view>
                <view class="feature-content">
                  <text class="feature-name theme-text-primary">{{ feature.name }}</text>
                  <text class="feature-desc theme-text-secondary">{{ feature.desc }}</text>
                </view>
              </view>
            </view>
          </wd-collapse-item>

          <wd-collapse-item title="使用指南" name="guide">
            <view class="guide-section">
              <view class="guide-header flex-center">
                <wd-icon name="light" size="44rpx" :color="themeVars.colorTheme" />
                <text class="guide-title theme-text-primary ml-md">快速开始</text>
              </view>
              <view class="guide-steps">
                <view v-for="(step, index) in guideSteps" :key="index" class="guide-step">
                  <view class="step-indicator">
                    <view class="step-number flex-center">{{ index + 1 }}</view>
                    <view v-if="index < guideSteps.length - 1" class="step-line"></view>
                  </view>
                  <view class="step-content">
                    <text class="step-title theme-text-primary">{{ step.title }}</text>
                    <text v-if="step.desc" class="step-desc theme-text-secondary">
                      {{ step.desc }}
                    </text>
                  </view>
                </view>
              </view>
              <view class="guide-footer theme-card flex items-center">
                <wd-icon name="tips" size="28rpx" :color="themeVars.darkColor3" />
                <text class="footer-text theme-text-secondary ml-sm">详细操作手册请查看帮助文档或联系客服获取</text>
              </view>
            </view>
          </wd-collapse-item>
        </wd-collapse>
      </view>
    </view>
    </scroll-view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useThemeStore } from "@/store/modules/theme.store";
import { useNavigationBar } from "@/composables/useNavigationBar";
import { FAQ_LIST, FEATURE_LIST, GUIDE_STEPS } from './data';

const { initNavigationBar } = useNavigationBar();

// 初始化导航栏样式
initNavigationBar();

const themeStore = useThemeStore();
const themeVars = themeStore.themeVars;

// 响应式数据
const activeNames = ref<string[]>(["faq"]);
const currentFaq = ref<number | null>(null);
const scrollTop = ref<number>(0);

// FAQ数据
const faqList = ref(FAQ_LIST);

// 系统功能数据
const featureList = ref(FEATURE_LIST);

// 使用指南数据
const guideSteps = ref(GUIDE_STEPS);

const handleScroll = (e: any) => {
  scrollTop.value = e.detail.scrollTop;
};

const toggleFaq = (index: number) => {
  currentFaq.value = currentFaq.value === index ? null : index; currentFaq.valueindexnull
};

const handleContact = (type: "email" | "phone") => {
  if (type === "email") {
    // #ifdef H5
    window.location.href = "mailto:support@example.com";
    // #endif
    // #ifndef H5
    uni.setClipboardData({
      data: "support@example.com",
      success: () => {
        uni.showToast({
          title: "邮箱已复制",
          icon: "success",
        });
      },
    });
    // #endif
  } else if (type === "phone") {
    // #ifdef H5
    window.location.href = "tel:400-123-4567";
    // #endif
    // #ifndef H5
    uni.makePhoneCall({
      phoneNumber: "400-123-4567",
    });
    // #endif
  }
};

// 生命周期
onMounted(() => {
  // 可以在这里添加页面埋点或初始化逻辑
});
</script>

<route lang="json">{
  "name": "faq",
  "style": {}
}</route>

<style lang="scss" scoped>
.content-scroll {
  flex: 1;
  height: 100%;
}

.content-wrapper {
  padding: var(--spacing-md);
}

// 技术支持卡片样式
.support-card {
  .card-header {
    padding: var(--spacing-xl) var(--spacing-xl) var(--spacing-lg);
    border-bottom: 1rpx solid var(--border-color);
  }

  .card-title {
    font-size: var(--font-lg);
    font-weight: 600;
  }

  .card-body {
    padding: var(--spacing-xl);

    .card-desc {
      display: block;
      margin-bottom: var(--spacing-xl);
      font-size: var(--font-md);
      line-height: 1.5;
      text-align: center;
    }

    .support-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: var(--spacing-lg);

      .support-item {
        display: flex;
        align-items: center;
        padding: var(--spacing-xl);
        border-radius: var(--radius-lg);
        transition: all 0.3s ease;
        cursor: pointer;

        &:active {
          opacity: 0.8;
          transform: scale(0.98);
        }

        .support-icon {
          flex-shrink: 0;
          width: 80rpx;
          height: 80rpx;
          margin-right: var(--spacing-lg);
          background-color: var(--bg-color-2);
          border-radius: var(--radius-lg);
        }

        .support-info {
          flex: 1;

          .support-label {
            display: block;
            margin-bottom: var(--spacing-xs);
            font-size: var(--font-md);
            font-weight: 600;
          }

          .support-value {
            display: block;
            font-size: var(--font-sm);
          }
        }
      }
    }
  }
}

// FAQ区域样式
.faq-section {
  :deep(.wd-collapse-item__title) {
    font-size: var(--font-lg);
    font-weight: 600;
    padding: var(--spacing-lg) var(--spacing-xl);
  }

  :deep(.wd-collapse-item__content) {
    padding: 0;
  }

  .faq-list {
    .faq-item {
      border-bottom: 1rpx solid var(--border-color);
      transition: all 0.3s ease;
      cursor: pointer;

      &:last-child {
        border-bottom: none;
      }

      &.active {
        background: rgba(var(--primary-color-rgb), 0.02);
      }

      .faq-header {
        padding: var(--spacing-xl);

        .faq-question {
          flex: 1;
          margin-right: var(--spacing-lg);

          .question-text {
            font-size: var(--font-md);
          }
        }

        .wd-icon {
          transition: transform 0.3s ease;

          &.rotate-180 {
            transform: rotate(180deg);
          }
        }
      }

      .faq-answer {
        padding: 0 var(--spacing-xl) var(--spacing-xl);
        border-top: 1rpx solid var(--border-color);

        .answer-text {
          display: block;
          padding: var(--spacing-lg) 0;
          font-size: var(--font-md);
          line-height: 1.6;
        }
      }
    }
  }

  .feature-list {
    .feature-item {
      display: flex;
      align-items: center;
      padding: var(--spacing-xl);
      border-bottom: 1rpx solid var(--border-color);

      &:last-child {
        border-bottom: none;
      }

      .feature-icon {
        flex-shrink: 0;
        width: 80rpx;
        height: 80rpx;
        margin-right: var(--spacing-lg);
        background-color: var(--bg-color-2);
        border-radius: var(--radius-lg);
      }

      .feature-content {
        flex: 1;

        .feature-name {
          display: block;
          margin-bottom: var(--spacing-xs);
          font-size: var(--font-md);
          font-weight: 600;
        }

        .feature-desc {
          display: block;
          font-size: var(--font-sm);
          line-height: 1.4;
        }
      }
    }
  }

  .guide-section {
    padding: var(--spacing-xl);

    .guide-header {
      margin-bottom: var(--spacing-xxl);

      .guide-title {
        font-size: var(--font-lg);
        font-weight: 600;
      }
    }

    .guide-steps {
      .guide-step {
        display: flex;
        margin-bottom: var(--spacing-xxl);

        &:last-child {
          margin-bottom: 0;
        }

        .step-indicator {
          position: relative;
          flex-shrink: 0;
          margin-right: var(--spacing-lg);

          .step-number {
            width: 48rpx;
            height: 48rpx;
            font-size: var(--font-sm);
            font-weight: 600;
            color: #fff;
            background: var(--primary-color);
            border-radius: 50%;
          }

          .step-line {
            position: absolute;
            top: 48rpx;
            left: 50%;
            width: 2rpx;
            height: 48rpx;
            background: var(--border-color);
            transform: translateX(-50%);
          }
        }

        .step-content {
          flex: 1;
          padding-top: var(--spacing-xs);

          .step-title {
            display: block;
            margin-bottom: var(--spacing-xs);
            font-size: var(--font-md);
            font-weight: 600;
          }

          .step-desc {
            display: block;
            font-size: var(--font-sm);
            line-height: 1.4;
          }
        }
      }
    }

    .guide-footer {
      padding: var(--spacing-xl);
      margin-top: var(--spacing-xxl);
      border-radius: var(--radius-lg);

      .footer-text {
        font-size: var(--font-sm);
      }
    }
  }
}
</style>