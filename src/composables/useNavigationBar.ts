import { nextTick, watch } from "vue";
import { useThemeStore } from "@/store/modules/theme.store";

/**
 * 设置导航栏样式的 composable
 * 用于在 H5 环境下设置导航栏的背景色、文字颜色等
 */
export function useNavigationBar() {
  const themeStore = useThemeStore();

  // 设置导航栏样式（H5环境）
  const setNavigationBarStyle = () => {
    // #ifdef H5
    nextTick(() => {
      try {
        const isDark = themeStore.isDark;
        const themeVars = themeStore.themeVars;
        const navBar = document.querySelector('.uni-page-head') as HTMLElement;
        const navTitle = document.querySelector('.uni-page-head__title') as HTMLElement;
        const navBtns = document.querySelectorAll('.uni-page-head__btn') as NodeListOf<HTMLElement>;
        // 返回按钮可能有不同的选择器 - 更全面的选择器
        const backBtns = document.querySelectorAll(
          '.uni-page-head__left, .uni-page-head__back, .uni-page-head__btn-left, ' +
          '.uni-page-head__hd, .uni-page-head__left-btn, [class*="back"], [class*="arrow"]'
        ) as NodeListOf<HTMLElement>;
        // 返回图标 - 更全面的选择器
        const backIcons = document.querySelectorAll(
          '.uni-page-head__left .uni-icon, .uni-page-head__back .uni-icon, .uni-page-head__btn-left .uni-icon, ' +
          '.uni-page-head__left svg, .uni-page-head__back svg, .uni-page-head__btn-left svg, ' +
          '.uni-page-head__hd .uni-icon, .uni-page-head__hd svg, ' +
          '[class*="back"] .uni-icon, [class*="back"] svg, [class*="arrow"] .uni-icon, [class*="arrow"] svg, ' +
          '.uni-page-head__left i, .uni-page-head__back i, .uni-page-head__btn-left i'
        ) as NodeListOf<HTMLElement>;
        
        if (!themeVars) return;
        
        // 根据主题模式获取颜色值
        let navBgColor: string;
        let navBorderColor: string;
        let navTextColor: string;
        
        if (isDark) {
          navBgColor = themeVars.darkBackground;
          navBorderColor = themeVars.darkBorderColor;
          navTextColor = themeVars.darkColor;
        } else {
          navBgColor = themeVars.colorBg;
          navBorderColor = themeVars.colorBorder;
          navTextColor = themeVars.colorTitle;
        }
        
        // 设置导航栏背景和边框
        if (navBar && navBgColor && navBorderColor) {
          navBar.style.backgroundColor = navBgColor;
          navBar.style.borderBottomColor = navBorderColor;
        }
        
        // 设置导航栏标题颜色
        if (navTitle && navTextColor) {
          navTitle.style.color = navTextColor;
        }
        
        // 设置所有按钮颜色
        if (navTextColor) {
          navBtns.forEach(btn => {
            btn.style.color = navTextColor;
          });
        }
        
        // 设置返回按钮和图标颜色
        if (navTextColor) {
          // 设置返回按钮颜色
          backBtns.forEach(btn => {
            btn.style.color = navTextColor;
            btn.style.setProperty('color', navTextColor, 'important');
          });
          
          // 设置返回图标颜色
          backIcons.forEach(icon => {
            icon.style.color = navTextColor;
            icon.style.fill = navTextColor;
            icon.style.setProperty('color', navTextColor, 'important');
            icon.style.setProperty('fill', navTextColor, 'important');
          });
          
          // 额外处理：直接查找所有可能的返回箭头元素
          const allBackElements = document.querySelectorAll(
            '.uni-page-head__left, .uni-page-head__back, .uni-page-head__btn-left, ' +
            '.uni-page-head__hd, .uni-page-head__left-btn, ' +
            '.uni-page-head__left *, .uni-page-head__back *, .uni-page-head__btn-left *'
          ) as NodeListOf<HTMLElement>;
          allBackElements.forEach(el => {
            el.style.color = navTextColor;
            el.style.setProperty('color', navTextColor, 'important');
            if (el.tagName === 'svg' || el.tagName === 'path') {
              el.style.fill = navTextColor;
              el.style.setProperty('fill', navTextColor, 'important');
            }
          });
        }
      } catch (error) {
        // 静默失败
      }
    });
    // #endif
  };

  // 初始化导航栏样式
  const initNavigationBar = () => {
    // #ifdef H5
    // 主要依赖 CSS 自动渲染，只在主题切换时更新
    // 因为导航栏是 uni-app 动态创建的，CSS 应该能自动应用
    // 这里只做一次检查，确保样式已应用
    nextTick(() => {
      setNavigationBarStyle();
    });
    // #endif

    // 监听主题变化，更新导航栏样式（这是必要的，因为主题切换时需要更新）
    watch(() => themeStore.isDark, () => {
      setNavigationBarStyle();
    });
  };

  return {
    setNavigationBarStyle,
    initNavigationBar,
  };
}

