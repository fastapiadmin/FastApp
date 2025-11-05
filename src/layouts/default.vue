<script lang="ts" setup>
import { useThemeStore } from "@/store/modules/theme.store";

const themeStore = useThemeStore();
const theme = computed(() => themeStore.theme);
const themeVars = computed(() => themeStore.themeVars);

</script>

<template>
  <wd-config-provider :theme-vars="themeVars" :theme="theme" :custom-class="`page-wrapper ${theme}`">
    <slot />
    <wd-notify />
    <wd-toast />
    <wd-message-box />
  </wd-config-provider>
</template>

<style lang="scss" scoped>
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