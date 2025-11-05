<script setup lang="ts">
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";
import { useThemeStore } from "@/store";

// 主题初始化
const themeStore = useThemeStore();

onLaunch(() => {
  // 延迟初始化主题，确保DOM完全加载
  setTimeout(() => {
    themeStore.initTheme();
  }, 50);
});

onShow(() => {
  console.log("App Show");
  // 在应用显示时也尝试初始化主题，处理可能的初始化失败
  setTimeout(() => {
    themeStore.initTheme();
  }, 10);
});

onHide(() => {
  console.log("App Hide");
});
</script>

<style lang="scss">
/* H5 环境样式变量设置 */
:root {
  --primary-color: #165dff;
  --primary-color-light: #94bfff;
  --primary-color-dark: #0e3c9b;
}

/* 小程序环境样式变量设置 */
page {
  --primary-color: #165dff;
  --primary-color-light: #94bfff;
  --primary-color-dark: #0e3c9b;
  background: #f8f8f8;
}

/* 动态加载小程序主题色的钩子 */
/* 用于通过小程序原生API获取主题色并应用 */
.theme-container {
  display: none;
}
</style>
