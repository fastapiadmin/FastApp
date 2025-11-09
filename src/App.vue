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
/* CSS变量由 theme.store.ts 动态设置，不在此处硬编码 */
/* 动态加载小程序主题色的钩子 */
/* 用于通过小程序原生API获取主题色并应用 */
.theme-container {
  display: none;
}
</style>
