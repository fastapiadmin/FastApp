<template>
  <view class="app-container">
    <wd-text size="small" class="theme-text-secondary">选填，最多上传3张图片</wd-text>
    <wd-form ref="formRef" :model="formData" :rules="rules" errorType="toast">
      <!-- 问题类型选择 -->
      <wd-cell-group title="问题类型" custom-class="theme-card mt-md">
        <wd-radio-group v-model="formData.feedbackType" inline prop="feedbackType" custom-class="p-md">
          <wd-radio v-for="item in feedbackTypes" :key="item.value" :value="item.value" custom-class="mb-sm">
            {{ item.label }}
          </wd-radio>
        </wd-radio-group>
      </wd-cell-group>

      <!-- 问题描述 -->
      <wd-cell-group title="问题描述" custom-class="theme-card mt-md">
        <wd-textarea v-model="formData.description" prop="description" placeholder="请详细描述您遇到的问题或建议..." :maxlength="300"
          show-word-limit custom-class="p-md" />
      </wd-cell-group>

      <!-- 相关截图 -->
      <wd-cell-group title="相关截图" custom-class="theme-card mt-md">
        <view class="p-md">
          <wd-text size="small" custom-class="theme-text-secondary mb-sm">选填，最多上传3张图片</wd-text>
          <wd-upload v-model="formData.fileList" :max-count="3" :before-read="beforeRead" @delete="handleDelete" />
        </view>
      </wd-cell-group>

      <!-- 联系方式 -->
      <wd-cell-group title="联系方式" custom-class="theme-card mt-md">
        <view class="p-md">
          <wd-input v-model="formData.contact" prop="contact" placeholder="请输入您的手机号或邮箱" clearable />
          <wd-text size="small" custom-class="theme-text-secondary mt-sm">选填，便于我们与您联系</wd-text>
        </view>
      </wd-cell-group>

      <!-- 提交按钮 -->
      <view class="footer theme-card mt-md">
        <wd-button type="primary" size="large" :loading="submitting" block custom-class="submit-btn"
          @click="handleSubmit">提交反馈</wd-button>
      </view>
    </wd-form>
  </view>
</template>

<script setup lang="ts">
import { checkLogin } from "@/utils/auth";
import { useToast } from "wot-design-uni";
import { FormRules } from "wot-design-uni/components/wd-form/types";

const toast = useToast();
const formRef = ref();

// 检查登录状态
onLoad(() => {
  if (!checkLogin()) return;
});

// 问题类型选项
const feedbackTypes = [
  { label: "功能异常", value: "bug" },
  { label: "优化建议", value: "suggestion" },
  { label: "其他问题", value: "other" },
];

// 表单数据
const formData = reactive({
  feedbackType: "bug",
  description: "",
  fileList: [] as Array<Record<string, any>>,
  contact: "",
});

// 表单验证规则
const rules: FormRules = {
  feedbackType: [
    {
      required: true,
      message: "请选择问题类型",
      trigger: "change",
    },
  ],
  description: [
    {
      required: true,
      message: "请描述您遇到的问题",
      validator: (value) => {
        if (value && value.trim()) {
          return Promise.resolve();
        } else {
          return Promise.reject("请描述您遇到的问题");
        }
      },
    },
  ],
  contact: [
    {
      required: false,
      validator: (value) => {
        if (!value) return Promise.resolve(); // 非必填
        const emailReg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
        const phoneReg = /^1[3456789]\d{9}$/;
        return emailReg.test(value) || phoneReg.test(value) ? Promise.resolve() : Promise.reject("请输入正确的手机号或邮箱");
      },
      message: "请输入正确的手机号或邮箱",
      trigger: "blur",
    },
  ],
};

// 提交状态
const submitting = ref(false);

// 图片上传前的校验
const beforeRead = (file: Record<string, any>) => {
  // 验证文件类型
  const validTypes = ["image/jpeg", "image/png", "image/gif"];
  if (!validTypes.includes(file.type)) {
    toast.error("请上传 jpg、png 或 gif 格式的图片");
    return false;
  }
  // 验证文件大小（限制为 5MB）
  if (file.size > 5 * 1024 * 1024) {
    toast.error("图片大小不能超过 5MB");
    return false;
  }
  return true;
};

// 删除图片
const handleDelete = (detail: { index: number }) => {
  const index = detail.index;
  formData.fileList.splice(index, 1);
};

// 提交反馈
const handleSubmit = async () => {
  // 表单验证
  try {
    const { valid } = await formRef.value.validate();

    if (valid) {
      submitting.value = true;
      try {
        // TODO: 调用提交反馈的接口
        await new Promise((resolve) => setTimeout(resolve, 1500)); TODO // 模拟提交
        toast.success("提交成功，我们会尽快处理您的反馈");

        // 重置表单
        formRef.value.reset();
        formData.feedbackType = "bug";
        formData.description = "";
        formData.fileList = [];
        formData.contact = "";

        // 延迟返回上一页
        setTimeout(() => {
          uni.navigateBack();
        }, 1500);
      } catch (error: any) {
        toast.error(error?.message || "提交失败，请重试");
      } finally {
        submitting.value = false;
      }
    }
  } catch (error: any) {
    // 表单验证失败
    console.log("表单验证失败", error);
  }
};
</script>

<route lang="json">{
  "name": "feedback",
  "style": {}
}</route>

<style lang="scss" scoped>
.footer {
  padding: var(--spacing-md);
  margin-bottom: var(--spacing-lg);
}

.submit-btn {
  height: 88rpx;
  font-size: 32rpx;
  border-radius: 44rpx;
}
</style>
