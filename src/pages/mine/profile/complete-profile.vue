<template>
  <view class="app-container">
    <!-- 头部标题 -->
    <view class="header">
      <view class="title">完善个人信息</view>
      <view class="subtitle">为了给您提供更好的服务，请完善以下信息</view>
    </view>

    <!-- 表单区域 -->
    <view class="form-container">
      <wd-form ref="profileFormRef" :model="profileForm">
        <!-- 微信小程序专用头像昵称组件 -->
        <!-- #ifdef MP-WEIXIN -->
        <view class="form-section">
          <view class="section-title">基本信息</view>

          <!-- 内联WechatProfile组件的内容 -->
          <view class="wechat-profile">
            <!-- 头像选择 -->
            <view class="avatar-section">
              <view class="section-title">头像</view>
              <button class="avatar-button" open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
                <image
                  v-if="profileForm.avatar"
                  :src="profileForm.avatar"
                  class="avatar-image"
                  mode="aspectFill"
                />
                <view v-else class="avatar-placeholder">
                  <wd-icon name="camera" size="40" color="#999" />
                  <text class="placeholder-text">选择头像</text>
                </view>
              </button>
            </view>

            <!-- 昵称输入 -->
            <view class="nickname-section">
              <view class="section-title">昵称</view>
              <input
                v-model="profileForm.name"
                type="nickname"
                class="nickname-input"
                placeholder="请输入昵称"
                :maxlength="20"
              />
            </view>

            <!-- 性别选择 -->
            <view class="gender-section">
              <view class="section-title">性别</view>
              <wd-radio-group v-model="profileForm.gender" shape="button" class="gender-group">
                <wd-radio :value="1" class="gender-radio">男</wd-radio>
                <wd-radio :value="2" class="gender-radio">女</wd-radio>
              </wd-radio-group>
            </view>
          </view>
        </view>
        <!-- #endif -->

        <!-- 其他平台的头像上传 -->
        <!-- #ifndef MP-WEIXIN -->
        <!-- 头像上传 -->
        <view class="form-section">
          <view class="section-title">头像</view>
          <view class="avatar-upload" @click="chooseAvatar">
            <view v-if="!profileForm.avatar" class="avatar-placeholder">
              <wd-icon name="camera" size="40" color="#999" />
              <text class="placeholder-text">点击上传头像</text>
            </view>
            <image v-else :src="profileForm.avatar" class="avatar-preview" mode="aspectFill" />
          </view>
        </view>

        <!-- 昵称输入 -->
        <view class="form-section">
          <view class="section-title">
            昵称
            <text class="required">*</text>
          </view>
          <wd-input
            v-model="profileForm.name"
            placeholder="请输入昵称"
            prop="name"
            :rules="rules.name"
            custom-class="nickname-input"
          />
        </view>

        <!-- 性别选择 -->
        <view class="form-section">
          <view class="section-title">性别</view>
          <wd-radio-group v-model="profileForm.gender" shape="button" class="gender-group">
            <wd-radio :value="1" class="gender-radio">男</wd-radio>
            <wd-radio :value="2" class="gender-radio">女</wd-radio>
          </wd-radio-group>
        </view>
        <!-- #endif -->

        <!-- 手机号输入 -->
        <view class="form-section">
          <view class="section-title">手机号</view>
          <wd-input
            v-model="profileForm.mobile"
            placeholder="请输入手机号"
            type="number"
            :maxlength="11"
            custom-class="mobile-input"
          />
        </view>
      </wd-form>
    </view>

    <!-- 底部按钮 -->
    <view class="footer">
      <wd-button
        class="complete-btn"
        type="primary"
        size="large"
        block
        :disabled="!canComplete || loading"
        :loading="loading"
        @click="handleComplete"
      >
        完成
      </wd-button>
      <view class="skip-btn" @click="handleSkip">
        <text>暂时跳过</text>
      </view>
    </view>

    <!-- 头像裁剪 -->
    <wd-img-cropper
      v-model="cropperVisible"
      :img-src="originalImageSrc"
      @confirm="handleAvatarConfirm"
    />

    <wd-toast />
  </view>
</template>

<script lang="ts" setup>
import { ref, reactive, computed } from "vue";
import { onLoad } from "@dcloudio/uni-app";
import { useToast } from "wot-design-uni";
import type { FormRules } from "wot-design-uni/components/wd-form/types";
import { useUserStore } from "@/store/modules/user.store";
import UserAPI, { type UserInfo } from "@/api/user";
import FileAPI from "@/api/file";

const toast = useToast();
const userStore = useUserStore();

// 页面参数
const redirect = ref("/pages/index/index");

// 表单数据
const profileForm = reactive({
  name: "",
  gender: "0",
  mobile: "",
  email: "",
  username: "",
  dept_name: "",
  positions: [] as UserInfo["positions"],
  roles: [] as UserInfo["roles"],
  avatar: "",
  created_at: "",
});

// 表单验证规则
const rules: FormRules = {
  name: [{ required: true, message: "请输入昵称" }],
};

// 状态管理
const loading = ref(false);
const cropperVisible = ref(false);
const originalImageSrc = ref("");
const profileFormRef = ref();

// 计算属性
const canComplete = computed(() => {
  return profileForm.name && profileForm.name.length >= 2;
});

// 页面加载
onLoad((options: any) => {
  if (options?.redirect) {
    redirect.value = decodeURIComponent(options.redirect);
  }

  // 如果用户已有部分信息，预填充
  const userInfo = userStore.userInfo;
  if (userInfo) {
    profileForm.name = userInfo.name || "";
    profileForm.avatar = userInfo.avatar || "";
    profileForm.gender = userInfo.gender || "0";
    profileForm.email = userInfo.email || "";
    profileForm.username = userInfo.username || "";
    profileForm.dept_name = userInfo.dept_name || "";
    profileForm.positions = userInfo.positions || [];
    profileForm.roles = userInfo.roles || [];
    profileForm.created_at = userInfo.created_at || "";
  }
});

// 微信小程序头像选择处理
const onChooseAvatar = async (e: any) => {
  try {
    const { avatarUrl } = e.detail;

    // 上传头像到服务器
    uni.showLoading({ title: "上传中..." });

    const fileInfo: UploadFileResult = await FileAPI.upload(avatarUrl);
    profileForm.avatar = fileInfo.file_url;
    uni.hideLoading();
    uni.showToast({ title: "头像上传成功", icon: "success" });
  } catch (error: any) {
    uni.hideLoading();
    console.error("头像上传失败:", error);
    uni.showToast({ title: error?.message || "头像上传失败", icon: "error" });
  }
};

// 选择头像
const chooseAvatar = () => {
  // #ifdef MP-WEIXIN
  // 微信小程序使用头像昵称填写能力
  uni.chooseMedia({
    count: 1,
    mediaType: ["image"],
    sourceType: ["album", "camera"],
    success: (res) => {
      originalImageSrc.value = res.tempFiles[0].tempFilePath;
      cropperVisible.value = true;
    },
    fail: (err) => {
      console.error("选择图片失败:", err);
      toast.error("选择图片失败");
    },
  });
  // #endif

  // #ifndef MP-WEIXIN
  uni.chooseImage({
    count: 1,
    sourceType: ["album", "camera"],
    success: (res) => {
      originalImageSrc.value = res.tempFilePaths[0];
      cropperVisible.value = true;
    },
    fail: (err) => {
      console.error("选择图片失败:", err);
      toast.error("选择图片失败");
    },
  });
  // #endif
};

// 头像裁剪确认
const handleAvatarConfirm = async (event: any) => {
  try {
    const { tempFilePath } = event;
    toast.loading("上传中...");

    const fileInfo: UploadFileResult = await FileAPI.upload(tempFilePath);
    profileForm.avatar = fileInfo.file_url;

    toast.success("头像上传成功");
  } catch (error) {
    console.error("头像上传失败:", error);
    toast.error("头像上传失败");
  }
};

// 完成信息填写
const handleComplete = async () => {
  try {
    // 表单验证
    const { valid } = await profileFormRef.value.validate();
    if (!valid) return;

    loading.value = true;

    // 更新用户信息
    await UserAPI.updateCurrentUserInfo({
      name: profileForm.name,
      gender: profileForm.gender,
      mobile: profileForm.mobile || "",
      email: profileForm.email || "",
      username: profileForm.username || "",
      dept_name: profileForm.dept_name || "",
      positions: profileForm.positions || [],
      roles: profileForm.roles || [],
      avatar: profileForm.avatar || "",
      created_at: profileForm.created_at || "",
    });

    // 重新获取用户信息
    await userStore.getInfo();

    toast.success("信息完善成功");

    // 跳转到目标页面
    setTimeout(() => {
      uni.reLaunch({
        url: redirect.value,
      });
    }, 1000);
  } catch (error: any) {
    console.error("完善信息失败:", error);
    toast.error(error?.message || "完善信息失败");
  } finally {
    loading.value = false;
  }
};

// 跳过完善信息
const handleSkip = () => {
  uni.showModal({
    title: "提示",
    content: "跳过信息完善可能会影响部分功能使用，确定要跳过吗？",
    success: (res) => {
      if (res.confirm) {
        uni.reLaunch({
          url: redirect.value,
        });
      }
    },
  });
};
</script>

<style lang="scss" scoped>
.header {
  margin-bottom: 60rpx;
  text-align: center;

  .title {
    margin-bottom: 20rpx;
    font-size: 48rpx;
    font-weight: bold;
    color: #fff;
  }

  .subtitle {
    font-size: 28rpx;
    line-height: 1.5;
    color: rgba(255, 255, 255, 0.8);
  }
}

.form-container {
  padding: 40rpx;
  margin-bottom: 40rpx;
  background: #fff;
  border-radius: 24rpx;
  box-shadow: 0 8rpx 40rpx rgba(0, 0, 0, 0.1);
}

.form-section {
  margin-bottom: 40rpx;

  &:last-child {
    margin-bottom: 0;
  }
}

.section-title {
  margin-bottom: 20rpx;
  font-size: 32rpx;
  font-weight: 600;
  color: #333;

  .required {
    color: #ff4757;
  }
}

.avatar-upload {
  display: flex;
  justify-content: center;

  .avatar-placeholder {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 160rpx;
    height: 160rpx;
    background: #f8f9fa;
    border: 2rpx dashed #ddd;
    border-radius: 50%;

    .placeholder-text {
      margin-top: 10rpx;
      font-size: 24rpx;
      color: #999;
    }
  }

  .avatar-preview {
    width: 160rpx;
    height: 160rpx;
    border: 4rpx solid #f0f0f0;
    border-radius: 50%;
  }
}

.nickname-input {
  :deep(.wd-input__inner) {
    padding: 24rpx 20rpx;
    background: #f8f9fa;
    border: 1rpx solid #e9ecef;
    border-radius: 12rpx;
  }
}

.gender-group {
  display: flex;
  gap: 20rpx;

  .gender-radio {
    flex: 1;

    :deep(.wd-radio) {
      justify-content: center;
      width: 100%;
    }
  }
}

.phone-auth {
  .phone-auth-btn {
    display: flex;
    gap: 12rpx;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 88rpx;
    font-size: 28rpx;
    color: #fff;
    background: linear-gradient(90deg, #165dff, #4080ff);
    border: none;
    border-radius: 12rpx;

    &[disabled] {
      opacity: 0.6;
    }

    .auth-text {
      font-size: 28rpx;
    }
  }
}

.phone-display {
  display: flex;
  gap: 12rpx;
  align-items: center;
  padding: 24rpx 20rpx;
  background: #f0f9ff;
  border: 1rpx solid #bae6fd;
  border-radius: 12rpx;

  .phone-number {
    flex: 1;
    font-size: 28rpx;
    color: #333;
  }

  .change-phone {
    font-size: 26rpx;
    color: #165dff;
  }
}

.footer {
  .complete-btn {
    margin-bottom: 30rpx;

    :deep(.wd-button) {
      height: 88rpx;
      font-size: 32rpx;
      font-weight: 600;
      border-radius: 44rpx;
    }
  }

  .skip-btn {
    text-align: center;

    text {
      font-size: 28rpx;
      color: rgba(255, 255, 255, 0.8);
      text-decoration: underline;
    }
  }
}

/* 内联WechatProfile组件的样式 */
.wechat-profile {
  padding: 20rpx;

  .avatar-section {
    margin-bottom: 40rpx;

    .avatar-button {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 160rpx;
      height: 160rpx;
      padding: 0;
      margin: 0 auto;
      overflow: hidden;
      background: transparent;
      border: none;
      border-radius: 50%;

      &::after {
        border: none;
      }
    }

    .avatar-image {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }

    .avatar-placeholder {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      background: var(--wot-color-bg-light);
      border: 2rpx dashed var(--wot-color-border);
      border-radius: 50%;

      .placeholder-text {
        margin-top: 10rpx;
        font-size: 24rpx;
        color: var(--wot-color-text-secondary);
      }
    }
  }

  .nickname-section {
    margin-bottom: 40rpx;

    .nickname-input {
      box-sizing: border-box;
      width: 100%;
      height: 80rpx;
      padding: 0 20rpx;
      font-size: 28rpx;
      background: var(--wot-color-bg-light);
      border: 1rpx solid var(--wot-color-border);
      border-radius: 12rpx;
    }
  }

  .gender-section {
    .gender-group {
      display: flex;
      gap: 20rpx;

      .gender-radio {
        flex: 1;

        :deep(.wd-radio) {
          justify-content: center;
          width: 100%;
        }
      }
    }
  }
}
</style>
