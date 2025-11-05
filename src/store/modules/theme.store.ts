import { defineStore } from "pinia";
import { useStorage } from "@uni-helper/uni-use";
import type { ConfigProviderThemeVars } from "wot-design-uni";
import { nextTick, reactive, computed, watch } from "vue";

// 声明uni-app全局API
declare function getCurrentPages(): any[];

// 主题色选项接口
export interface ThemeColorOption {
  name: string;
  value: string;
  primary: string;
}

// 主题类型
export type ThemeMode = "light" | "dark";

export const useThemeStore = defineStore("appTheme", () => {
  const theme = useStorage<ThemeMode>("app-theme", "dark");

  // 预定义的主题色选项
  const themeColorOptions: ThemeColorOption[] = [
    { name: "默认蓝", value: "blue", primary: "#4D7FFF" },
    { name: "活力橙", value: "orange", primary: "#FF7D00" },
    { name: "薄荷绿", value: "green", primary: "#07C160" },
    { name: "樱花粉", value: "pink", primary: "#FF69B4" },
    { name: "紫罗兰", value: "purple", primary: "#8A2BE2" },
    { name: "朱砂红", value: "red", primary: "#FF4757" },
  ];

  // 主题色
  const currentThemeColor = useStorage<ThemeColorOption>("app-theme-color", themeColorOptions[0]);

  // 获取当前主题的基础颜色配置
  const getThemeColors = (isDark: boolean) => ({
    // 基础颜色
    colorBg: isDark ? "#0f0f0f" : "#f8f8f8",
    colorTitle: isDark ? "#ffffff" : "#1d2129",
    colorContent: isDark ? "#e0e0e0" : "#4e5969",
    colorSecondary: isDark ? "#a0a0a0" : "#86909c",
    colorBorder: isDark ? "#2f2f2f" : "#e5e6eb",
    colorBorderLight: isDark ? "#3d3d3d" : "#f2f3f5",
    
    // 卡片相关变量
    cardBg: isDark ? "#1a1a1a" : "#ffffff",
    cardTitleColor: isDark ? "#ffffff" : "#1d2129",
    cardContentColor: isDark ? "#e0e0e0" : "#4e5969",
    cardContentBorderColor: isDark ? "#2f2f2f" : "#e5e6eb",
  });

  // 主题变量（响应式对象）
  const themeVars: ConfigProviderThemeVars = reactive({
    // 暗黑模式背景色
    darkBackground: "#0f0f0f",
    darkBackground2: "#1a1a1a",
    darkBackground3: "#242424",
    darkBackground4: "#2f2f2f",
    darkBackground5: "#3d3d3d",
    darkBackground6: "#4a4a4a",
    darkBackground7: "#606060",
    
    // 暗黑模式文字颜色
    darkColor: "#ffffff",
    darkColor2: "#e0e0e0",
    darkColor3: "#a0a0a0",
    darkColorGray: "#a0a0a0",
    darkBorderColor: "#2f2f2f",
    
    // 主题色
    colorTheme: currentThemeColor.value.primary,
    
    // 根据当前主题模式设置基础颜色
    ...getThemeColors(theme.value === 'dark'),
  });

  // 计算属性
  const isDark = computed(() => theme.value === "dark");

  // 设置导航栏颜色
  const setCustomNavigationBarColor = async () => {
    try {
      // 检查当前环境是否支持设置导航栏颜色
      // 在非H5环境（如小程序）中，确保页面已加载
      const pages = getCurrentPages();
      if (pages.length === 0) {
        // 页面还未加载，稍后重试
        setTimeout(() => {
          setCustomNavigationBarColor();
        }, 100);
        return;
      }

      await uni.setNavigationBarColor({
        frontColor: theme.value === "light" ? "#000000" : "#ffffff",
        backgroundColor: theme.value === "light" ? "#ffffff" : "#000000",
      });
    } catch (error) {
      console.warn('设置导航栏颜色失败，将在下次页面加载时重试:', error);
      // 可以在这里添加重试逻辑或降级方案
    }
  };

  // 更新主题变量
  const updateThemeVars = () => {
    const isDark = theme.value === 'dark';
    const colors = getThemeColors(isDark);
    
    // 更新所有主题变量
    Object.assign(themeVars, colors);
  };

  // 更新CSS变量
  const updateCSSVariables = () => {
    // 确保在客户端环境且DOM已准备好
    if (typeof window !== 'undefined' && typeof document !== 'undefined' && document.documentElement) {
      const root = document.documentElement;
      const isDark = theme.value === 'dark';
      
      // 更新主题色
      root.style.setProperty('--wot-color-theme', currentThemeColor.value.primary);
      
      // 更新主题类
      root.classList.toggle('dark', isDark);
      root.classList.toggle('light', !isDark);
      
    }
    
    // 更新主题变量
    updateThemeVars();
  };

  // 切换主题, 指定主题模式，不传则自动切换
  const toggleTheme = (mode?: ThemeMode) => {
    theme.value = mode || (theme.value === "light" ? "dark" : "light");
    setCustomNavigationBarColor();
    updateCSSVariables();
    
    // 触发主题变化事件
    nextTick(() => {
      uni.$emit('theme-change', theme.value);
    });
  };

  // 设置主题色
  const setCurrentThemeColor = (color: ThemeColorOption) => {
    currentThemeColor.value = color;
    
    // 强制更新主题变量
    Object.assign(themeVars, {
      colorTheme: color.primary
    });
    
    updateCSSVariables();
    
    // 触发主题色变化事件
    nextTick(() => {
      uni.$emit('theme-color-change', color);
    });
  };

  // 初始化主题
  const initTheme = () => {
    // 强制更新主题变量中的颜色
    Object.assign(themeVars, {
      colorTheme: currentThemeColor.value.primary
    });
    
    // 更新主题变量
    updateThemeVars();
    
    // 延迟更新CSS变量，确保DOM已准备好
    nextTick(() => {
      updateCSSVariables();
      // 尝试设置导航栏颜色，但不阻止其他初始化流程
      try {
        setCustomNavigationBarColor();
      } catch (error) {
        console.warn('初始化导航栏颜色失败:', error);
      }
    });
    
    // 为了兼容性，在更长的延迟后再次尝试
    if (typeof window !== 'undefined') {
      setTimeout(() => {
        updateCSSVariables();
        // 再次尝试设置导航栏颜色
        try {
          setCustomNavigationBarColor();
        } catch (error) {
          console.warn('延迟重试设置导航栏颜色失败:', error);
        }
      }, 100);
    }
  };

  // 监听主题变化，自动更新CSS变量
  watch(theme, () => {
    updateCSSVariables();
  });

  // 监听主题色变化，自动更新CSS变量
  watch(currentThemeColor, () => {
    Object.assign(themeVars, {
      colorTheme: currentThemeColor.value.primary
    });
    updateCSSVariables();
  });

  // 注意：全局主题管理已在App.vue中处理
  // 包括：系统主题监听、导航栏颜色同步等
  // 组件中一般不需要再调用initTheme()，除非有特殊需求

  return {
    // 状态
    theme,
    currentThemeColor,
    themeVars,
    themeColorOptions,

    // 计算属性
    isDark,

    // 方法
    toggleTheme,
    setCurrentThemeColor,
    setCustomNavigationBarColor,
    initTheme,
  };
});
