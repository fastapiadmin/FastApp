<template>
  <view class="app-container">
    <wd-card custom-style="margin-top: 20rpx" class="theme-card">
      <view class="flex-col-center py-lg">
        <text class="text-xl font-bold mb-md theme-text-primary">隐私政策</text>
        <text class="text-sm theme-text-secondary">更新日期：2024年3月15日</text>
      </view>
    </wd-card>

    <wd-collapse v-model="activeNames" accordion class="theme-card mt-md">
      <wd-collapse-item v-for="(section, index) in privacyContent" :key="index" :title="section.title"
        :name="String(index)">
        <view class="py-md px-lg">
          <text class="text-base leading-relaxed theme-text-secondary">{{ section.content }}</text>
        </view>
      </wd-collapse-item>
    </wd-collapse>

    <view class="mt-lg px-lg theme-card">
      <wd-button type="primary" block @click="handleAgree">我已阅读并同意</wd-button>
    </view>
  </view>
</template>

<script lang="ts" setup>
const activeNames = ref(["0"]); // 默认展开第一项

const privacyContent = ref([
  {
    title: "1. 信息收集",
    content: "我们可能收集您的基本信息（如设备信息、操作日志等）以提供更好的服务体验。我们承诺对这些信息进行严格保密，并只用于改善产品服务。收集的信息包括但不限于：设备型号、操作系统版本、网络状态、使用习惯等。",
  },
  {
    title: "2. 信息使用",
    content: "收集的信息将用于：优化用户体验、提供客户支持、发送重要通知、保障账号安全等。未经您的同意，我们不会向第三方分享您的个人信息。我们可能会对数据进行统计分析，但不会泄露任何个人身份信息。",
  },
  {
    title: "3. 信息安全",
    content: "我们采用业界标准的安全技术和程序来保护您的个人信息，防止未经授权的访问、使用或泄露。我们定期审查信息收集、存储和处理实践，确保数据安全。我们建立了完善的安全管理制度和技术防护措施。",
  },
  {
    title: "4. Cookie 使用",
    content: "我们使用 Cookie 和类似技术来提供、保护和改进我们的产品和服务。这些技术帮助我们了解用户行为，告诉我们哪些功能最受欢迎。您可以通过浏览器设置管理 Cookie，但可能会影响部分功能的正常使用。",
  },
  {
    title: "5. 第三方服务",
    content: "我们的应用可能包含第三方服务。这些第三方服务有自己的隐私政策，我们建议您查看这些政策。我们不对第三方的隐私实践负责。在使用第三方服务时，请注意查看其隐私条款和使用协议。",
  },
  {
    title: "6. 未成年人保护",
    content: "我们非常重视对未成年人个人信息的保护。若您是未成年人，请在监护人指导下使用我们的服务。如果您是监护人，当您对您所监护的未成年人的个人信息有疑问时，请联系我们。我们不会故意收集未成年人的个人信息。",
  },
  {
    title: "7. 隐私政策更新",
    content: "我们可能会不时更新本隐私政策。当我们更新隐私政策时，我们会在本页面上发布更新后的版本并修改更新日期。建议您定期查看本页面。重大变更将通过适当方式通知用户，确保您了解我们的数据处理方式。",
  },
  {
    title: "8. 联系我们",
    content: "如果您对本隐私政策有任何疑问或建议，请通过以下方式联系我们：邮箱：privacy@fastapiadmin.com；电话：400-123-4567。我们将尽快回复您的询问，并尽力解决您的问题。您也可以通过应用内的反馈功能提交您的意见。",
  },
]);

// 同意协议
const handleAgree = () => {
  uni.showToast({
    title: "感谢您的支持",
    icon: "success",
  });
  setTimeout(() => {
    uni.navigateBack();
  }, 1500);
};
</script>

<route lang="json">{
  "name": "privacy",
  "style": {}
}</route>

<style lang="scss" scoped></style>
