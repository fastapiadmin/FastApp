import { defineStore } from "pinia";
import type { ConfigProviderThemeVars } from "wot-design-uni";
import { nextTick, reactive, computed, watch, ref, type Ref } from "vue";
import { adjustColorBrightness } from "@/utils/color";

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

// 扩展主题变量类型，确保必需的属性是 string 类型
export interface RequiredThemeVars extends ConfigProviderThemeVars {
  darkBackground: string;
  darkBorderColor: string;
  darkColor: string;
  colorBg: string;
  colorBorder: string;
  colorTitle: string;
}

/**
 * 基于 uni API 的响应式存储实现
 * 完全替代 @uni-helper/uni-use 的 useStorage，更可靠且不依赖第三方库
 * 
 * @param key 存储键名
 * @param defaultValue 默认值
 * @returns 响应式的 ref，值变化时自动同步到存储
 */
function useUniStorage<T>(key: string, defaultValue: T): Ref<T> {
  // 初始化：从存储中读取值，如果不存在则使用默认值
  let initialValue: T = defaultValue;
  
  try {
    if (typeof uni !== 'undefined' && uni.getStorageSync) {
      const stored = uni.getStorageSync(key);
      if (stored !== '' && stored !== null && stored !== undefined) {
        // 尝试解析 JSON，如果失败则直接使用原始值
        try {
          initialValue = typeof stored === 'string' ? JSON.parse(stored) : (stored as T);
        } catch {
          // 如果 JSON 解析失败，可能是简单类型，直接使用
          initialValue = stored as T;
        }
      }
    }
  } catch (error) {
    // 读取失败，使用默认值
    console.warn(`读取存储失败 [${key}]:`, error);
  }
  
  // 创建响应式 ref
  const state = ref<T>(initialValue) as Ref<T>;
  
  // 监听变化并自动同步到存储
  watch(
    state,
    (newValue) => {
      try {
        if (typeof uni !== 'undefined' && uni.setStorageSync) {
          // 根据值类型决定存储方式
          if (typeof newValue === 'string' || typeof newValue === 'number' || typeof newValue === 'boolean') {
            // 简单类型直接存储
            uni.setStorageSync(key, newValue);
          } else {
            // 复杂类型序列化为 JSON
            uni.setStorageSync(key, JSON.stringify(newValue));
          }
        }
      } catch (error) {
        console.warn(`保存存储失败 [${key}]:`, error);
      }
    },
    { deep: true } // 深度监听，支持对象和数组
  );
  
  return state;
}

export const useThemeStore = defineStore("appTheme", () => {
  // 预定义的主题色选项
  const themeColorOptions: ThemeColorOption[] = [
    { name: "默认蓝", value: "blue", primary: "#4D7FFF" },
    { name: "活力橙", value: "orange", primary: "#FF7D00" },
    { name: "薄荷绿", value: "green", primary: "#07C160" },
    { name: "樱花粉", value: "pink", primary: "#FF69B4" },
    { name: "紫罗兰", value: "purple", primary: "#8A2BE2" },
    { name: "朱砂红", value: "red", primary: "#FF4757" },
  ];

  // 使用自定义的 useUniStorage，自动处理存储同步
  const theme = useUniStorage<ThemeMode>("app-theme", "dark");
  const currentThemeColor = useUniStorage<ThemeColorOption>("app-theme-color", themeColorOptions[0]);

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
  const themeVars: RequiredThemeVars = reactive({
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
    const isDark = theme.value === 'dark';
    const primaryColor = currentThemeColor.value.primary;
    
    // 计算颜色变体
    const primaryColorLight = adjustColorBrightness(primaryColor, 1.5);
    const primaryColorDark = adjustColorBrightness(primaryColor, 0.6);
    
    // H5 环境：更新 :root 的 CSS 变量
    // #ifdef H5
    if (typeof window !== 'undefined' && typeof document !== 'undefined' && document.documentElement) {
      const root = document.documentElement;
      
      // 更新主题色
      root.style.setProperty('--wot-color-theme', primaryColor);
      
      // 更新主色及其变体
      root.style.setProperty('--primary-color', primaryColor);
      root.style.setProperty('--primary-color-light', primaryColorLight);
      root.style.setProperty('--primary-color-dark', primaryColorDark);
      
      // 更新主题类
      root.classList.toggle('dark', isDark);
      root.classList.toggle('light', !isDark);
    }
    // #endif
    
    // 小程序环境：更新 page 元素的 CSS 变量
    // #ifndef H5
    try {
      // 小程序中通过设置全局样式或使用 uni.setPageStyle
      // 这里我们通过设置根元素的样式来实现
      const pages = getCurrentPages();
      if (pages.length > 0) {
        const currentPage = pages[pages.length - 1];
        // 在小程序中，CSS变量应该在 page 元素上设置
        // 但由于小程序限制，我们通过全局样式设置
        // 实际应用中，CSS变量会在编译时处理
      }
    } catch (error) {
      console.warn('更新小程序CSS变量失败:', error);
    }
    // #endif
    
    // 更新主题变量
    updateThemeVars();
  };

  // 切换主题, 指定主题模式，不传则自动切换
  const toggleTheme = (mode?: ThemeMode) => {
    theme.value = mode || (theme.value === "light" ? "dark" : "light");
    setCustomNavigationBarColor();
    updateCSSVariables();
    
    // 显示提示信息
    uni.showToast({
      title: '主题已切换，即将重启小程序',
      icon: 'success',
      duration: 1500,
      mask: true
    });
    
    // 切换主题后重启小程序，确保所有页面都能正确应用新主题
    nextTick(() => {
      // 延迟执行，确保提示信息能够显示
      setTimeout(() => {
        try {
          // #ifdef H5
          // H5 环境下使用 location.reload() 完全重启
          if (typeof window !== 'undefined' && window.location) {
            window.location.reload();
            return;
          }
          // #endif
          
          // #ifndef H5
          // 小程序环境下使用 reLaunch 重启到首页
          uni.reLaunch({
            url: '/pages/index/index',
            fail: (err) => {
              console.warn('重启小程序失败:', err);
            }
          });
          // #endif
        } catch (error) {
          console.warn('重启小程序失败:', error);
        }
      }, 1500); // 等待提示显示完成后再重启
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
