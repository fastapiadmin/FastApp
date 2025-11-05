<template>
  <wd-config-provider :theme-vars="themeVars" :custom-class="`page-wrapper ${theme}`" :theme="theme">
    <slot />
    <wd-tabbar :model-value="activeTabbar" placeholder bordered safe-area-inset-bottom fixed
      @change="handleTabbarChange">
      <wd-tabbar-item v-for="(item, index) in tabbarList" :key="index" :name="item.name" :title="item.title"
        :icon="item.icon" />
    </wd-tabbar>
    <wd-notify />
    <wd-toast />
    <wd-message-box />
  </wd-config-provider>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from "uni-mini-router";
import { useTabbar } from "@/composables/useTabbar";
import { useThemeStore } from "@/store/modules/theme.store";

const useTheme = useThemeStore();

const router = useRouter();
const route = useRoute();
let theme = useTheme.theme;
let themeVars = useTheme.themeVars;
const { activeTabbar, setTabbarItemActive, tabbarList } = useTabbar();

function handleTabbarChange({ value }: { value: string }) {
  setTabbarItemActive(value);
  router.pushTab({ name: value });
}

onMounted(() => {
  // #ifdef APP-PLUS
  uni.hideTabBar();
  // #endif
  nextTick(() => {
    if (route.name) {
      setTabbarItemActive(route.name);
    }
  });
});
</script>

<script lang="ts">
export default {
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: "shared",
  },
};
</script>

<style lang="scss">
.page-wrapper {
  box-sizing: border-box;
  min-height: calc(100vh - var(--window-top));
  background-color: var(--bg-color-2);
  transition: background-color 0.3s ease;
}

.wot-theme-dark.page-wrapper {
  background-color: var(--bg-color);
}
</style>