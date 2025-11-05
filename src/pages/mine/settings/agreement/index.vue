<template>
  <view class="app-container">
    <wd-card custom-style="margin-top: 20rpx" class="theme-card">
      <view class="flex-col-center py-lg">
        <text class="text-xl font-bold mb-md theme-text-primary">用户协议</text>
        <text class="text-sm theme-text-secondary">更新日期：2024年3月15日</text>
      </view>
    </wd-card>

    <wd-collapse v-model="activeNames" accordion class="theme-card mt-md">
      <wd-collapse-item v-for="(section, index) in agreementContent" :key="index" :title="section.title"
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

const agreementContent = [
  {
    title: "1. 协议的范围",
    content: "本协议是您与我们之间关于使用本应用服务所订立的协议。您在使用本应用服务时，须完全接受本协议所有条款。本协议适用于本应用提供的所有服务。如果您不同意本协议的任何条款，请立即停止使用本应用。本协议构成您与我们之间的法律协议，具有法律约束力。",
  },
  {
    title: "2. 服务内容",
    content: "本应用向您提供以下服务：网络状态检测、网络性能测试、数据统计分析以及其他相关服务。我们将持续优化和更新服务内容，为您提供更好的使用体验。我们保留在任何时候修改或终止部分或全部服务的权利，且无需提前通知用户。",
  },
  {
    title: "3. 用户隐私",
    content: "我们重视用户的隐私保护，收集信息仅用于提供网络测试服务、改善用户体验和必要的系统维护。我们承诺对您的信息进行严格保密，不会向任何第三方出售、出租或分享您的个人信息。我们采用行业标准的安全措施保护您的数据安全。",
  },
  {
    title: "4. 用户行为规范",
    content: "您在使用本服务时必须遵守中华人民共和国相关法律法规。您不得利用本服务从事违法违规活动，包括但不限于：传播违法信息、侵犯他人合法权益、破坏网络安全等。如发现违规行为，我们有权终止服务并保留追究法律责任的权利。",
  },
  {
    title: "5. 免责声明",
    content: "由于网络服务的特殊性，本应用不保证服务一定能满足用户的所有要求。对于因网络状态、通信线路等不可控因素导致的服务中断或其他缺陷，本应用不承担任何责任。我们不对任何间接、偶然、特殊或后果性损害承担责任。",
  },
  {
    title: "6. 协议修改",
    content: "我们保留随时修改本协议的权利。协议修改后，如果您继续使用本应用服务，即视为您已接受修改后的协议。我们建议您定期查看本协议以了解任何变更。重大修改将通过适当方式通知用户。",
  },
  {
    title: "7. 知识产权",
    content: "本应用的所有内容，包括但不限于文字、图片、音频、视频、软件等，均受知识产权法律法规保护。未经我们书面许可，您不得以任何方式使用、复制、传播或修改本应用的任何内容。用户在使用过程中产生的合法内容，其知识产权归用户所有。",
  },
  {
    title: "8. 争议解决",
    content: "因本协议引起的或与本协议有关的任何争议，双方应首先通过友好协商解决。协商不成的，任何一方均可向我们所在地有管辖权的人民法院提起诉讼。本协议的解释、效力和执行均适用中华人民共和国法律。",
  },
];

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
  "name": "agreement",
  "style": {
    "navigationBarTitleText": "用户协议"
  },
  "layout": "tabbar"
}</route>

<style lang="scss" scoped></style>
