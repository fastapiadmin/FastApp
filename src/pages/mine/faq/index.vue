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

const themeStore = useThemeStore();
const themeVars = themeStore.themeVars;

// 响应式数据
const activeNames = ref<string[]>(["faq"]);
const currentFaq = ref<number | null>(null);
const scrollTop = ref<number>(0);

// FAQ数据
const faqList = ref([
  {
    question: "如何重置密码？",
    answer: "在登录页面点击 '忘记密码'，按照提示操作即可重置密码。如果无法收到验证码，请检查邮箱或手机号是否正确，或联系客服协助处理。建议定期修改密码以保障账户安全。",
  },
  {
    question: "数据如何备份？",
    answer: "系统会自动定期备份数据，您也可以在'系统设置-数据管理'中手动导出数据。建议每月进行一次完整数据备份，确保数据安全。重要数据请务必做好多重备份。",
  },
  {
    question: "支持哪些浏览器？",
    answer: "推荐使用Chrome 90+、Firefox 88+、Safari 14+、Edge 90+等现代浏览器。IE浏览器仅支持IE11及以上版本。移动端建议使用最新版本的微信、QQ浏览器等。",
  },
  {
    question: "如何联系客服？",
    answer: "您可以通过以下方式联系客服：1. 客服热线 400-123-4567（工作日9:00-18:00）；2. 邮箱 support@example.com（7×24小时）；3. 在线客服（工作日9:00-18:00）。我们将尽快回复您的问题。",
  },
  {
    question: "如何反馈问题？",
    answer: "您可以通过'我的-问题反馈'页面提交问题，详细描述遇到的问题并上传相关截图。我们的技术团队会在24小时内处理您的反馈。您也可以通过客服热线直接反馈问题。",
  },
  {
    question: "如何更新应用？",
    answer: "应用会自动检测更新，有新版本时会提示您更新。您也可以在应用商店中手动检查更新。建议及时更新到最新版本以获得更好的使用体验和安全保障。",
  },
]);

// 系统功能数据
const featureList = ref([
  {
    name: "用户管理",
    desc: "支持用户注册、登录、权限管理等功能，提供完善的用户体系",
    icon: "user",
    color: "#0083f0",
  },
  {
    name: "数据统计",
    desc: "提供实时数据分析和可视化报表，帮助您更好地了解业务状况",
    icon: "chart",
    color: "#00c250",
  },
  {
    name: "文件管理",
    desc: "支持文件上传、下载、分类管理，提供安全的文件存储服务",
    icon: "folder",
    color: "#ff9500",
  },
  {
    name: "消息通知",
    desc: "实时消息推送和系统通知，确保您不会错过重要信息",
    icon: "notification",
    color: "#ff3b30",
  },
  {
    name: "权限控制",
    desc: "基于RBAC的权限管理模型，灵活控制用户访问权限",
    icon: "secured",
    color: "#5a5a5a",
  },
  {
    name: "日志审计",
    desc: "完整的操作日志记录，便于追踪和审计用户行为",
    icon: "file",
    color: "#8a8a8a",
  },
]);

// 使用指南数据
const guideSteps = ref([
  {
    title: "注册账号并登录系统",
    desc: "使用手机号或邮箱注册账号，完成实名认证，设置安全密码",
  },
  {
    title: "完善个人或企业信息",
    desc: "填写基本信息，设置安全问题和密保邮箱，绑定手机号",
  },
  {
    title: "根据需求配置功能模块",
    desc: "选择需要的功能模块，设置相关参数，配置权限角色",
  },
  {
    title: "开始使用各项功能",
    desc: "完成初始化设置，开始使用系统各项功能，定期备份数据",
  },
  {
    title: "获取技术支持",
    desc: "遇到问题时可通过客服、FAQ或在线反馈获取技术支持",
  },
]);

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