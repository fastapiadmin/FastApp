import { nextTick, watch } from "vue";
import { useThemeStore } from "@/store/modules/theme.store";

/**
 * 设置导航栏样式的 composable
 * 用于在 H5 环境下设置导航栏的背景色、文字颜色等
 * 注意：返回箭头颜色由CSS直接处理，这里只设置导航栏背景和标题
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

        if (!themeVars) return;

        const navBar = document.querySelector(".uni-page-head") as HTMLElement;
        const navTitle = document.querySelector(
          ".uni-page-head__title",
        ) as HTMLElement;
        const navBtns = Array.from(
          document.querySelectorAll(".uni-page-head__btn"),
        ) as HTMLElement[];

        // 根据主题模式获取颜色值
        let navBgColor: string;
        let navBorderColor: string;
        let navTextColor: string;

        if (isDark) {
          navBgColor = themeVars.darkBackground;
          navBorderColor = themeVars.darkBorderColor;
          navTextColor = themeVars.darkColor; // 白色
        } else {
          navBgColor = themeVars.colorBg;
          navBorderColor = themeVars.colorBorder;
          navTextColor = themeVars.colorTitle; // 深色
        }

        // 设置导航栏背景和边框
        if (navBar && navBgColor && navBorderColor) {
          navBar.style.setProperty("background-color", navBgColor, "important");
          navBar.style.setProperty("border-bottom-color", navBorderColor, "important");
        }

        // 设置导航栏标题颜色
        if (navTitle && navTextColor) {
          navTitle.style.setProperty("color", navTextColor, "important");
        }

        // 设置其他按钮颜色
        if (navTextColor) {
          navBtns.forEach((btn) => {
            btn.style.setProperty("color", navTextColor, "important");
          });
        }

        // 强制设置返回箭头颜色 - 使用更全面的方式查找所有可能的返回按钮
        // 方法1: 通过已知的选择器
        const backButtonSelectors = [
          ".uni-page-head__left",
          ".uni-page-head__back",
          ".uni-page-head__btn-left",
          ".uni-page-head__hd",
          "[class*='back']",
          "[class*='arrow']",
          "[class*='left']",
        ];

        backButtonSelectors.forEach((selector) => {
          try {
            const elements = document.querySelectorAll(selector);
            elements.forEach((el) => {
              const htmlEl = el as HTMLElement;
              // 设置容器本身
              htmlEl.style.setProperty("color", navTextColor, "important");
              
              // 设置所有子元素（包括SVG）
              const allChildren = htmlEl.querySelectorAll("*");
              allChildren.forEach((child) => {
                const childEl = child as HTMLElement;
                childEl.style.setProperty("color", navTextColor, "important");
                
                // SVG元素需要设置fill和stroke
                if (["svg", "path", "g", "circle", "rect", "line", "polyline", "polygon"].includes(child.tagName.toLowerCase())) {
                  childEl.style.setProperty("fill", navTextColor, "important");
                  childEl.style.setProperty("stroke", navTextColor, "important");
                }
              });
            });
          } catch (e) {
            // 忽略选择器错误
          }
        });

        // 方法2: 直接查找导航栏内的第一个可点击元素（通常是返回按钮）
        if (navBar) {
          const firstClickable = navBar.querySelector("a, button, [onclick], [class*='btn'], [class*='back'], [class*='left']");
          if (firstClickable) {
            const el = firstClickable as HTMLElement;
            el.style.setProperty("color", navTextColor, "important");
            const children = el.querySelectorAll("*");
            children.forEach((child) => {
              const childEl = child as HTMLElement;
              childEl.style.setProperty("color", navTextColor, "important");
              if (["svg", "path", "g"].includes(child.tagName.toLowerCase())) {
                childEl.style.setProperty("fill", navTextColor, "important");
                childEl.style.setProperty("stroke", navTextColor, "important");
              }
            });
          }
        }
      } catch (error) {
        console.warn("设置导航栏样式失败:", error);
      }
    });
    // #endif
  };

  // 初始化导航栏样式
  const initNavigationBar = () => {
    // #ifdef H5
    // 立即设置一次
    setNavigationBarStyle();

    // 监听主题变化，更新导航栏样式
    watch(
      () => themeStore.isDark,
      () => {
        setNavigationBarStyle();
      },
    );
    // #endif
  };

  return {
    setNavigationBarStyle,
    initNavigationBar,
  };
}
