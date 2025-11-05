// pages.config.ts
import { defineUniPages } from "@uni-helper/vite-plugin-uni-pages";

export default defineUniPages({
  // 你也可以定义 pages 字段，它具有最高的优先级。
  pages: [],
  globalStyle: {
    navigationBarBackgroundColor: "@navBgColor",
    navigationBarTextStyle: "@navTxtStyle",
    navigationBarTitleText: "FastApp",
    backgroundColor: "@bgColor",
    backgroundTextStyle: "@bgTxtStyle",
    backgroundColorTop: "@bgColorTop",
    backgroundColorBottom: "@bgColorBottom",
    enablePullDownRefresh: false,
    onReachBottomDistance: 50,
    animationType: "pop-in",
    animationDuration: 300,
  },

  tabBar: {
    custom: true,
    customize: true,
    overlay: true,
    height: "0",
    color: "@tabColor",
    selectedColor: "@tabSelectedColor",
    backgroundColor: "@tabBgColor",
    borderStyle: "@tabBorderStyle",
    list: [
      {
        pagePath: "pages/index/index",
      },
      {
        pagePath: "pages/work/index",
      },
      {
        pagePath: "pages/mine/index",
      },
    ],
  },
});
