import { pages, subPackages } from "virtual:uni-pages";
import { isLoggedIn } from "@/utils/auth";
import { createRouter } from "uni-mini-router";

// 生成路由配置
function generateRoutes() {
  const routes = pages.map((page: { path: string; [key: string]: any }) => {
    const newPath = `/${page.path}`;
    // 透传 meta 字段（如果 pages.json 中定义了）
    const meta = page.meta ?? undefined;
    return { ...page, path: newPath, meta };
  });

  // 处理分包路由
  if (subPackages && subPackages.length > 0) {
    subPackages.forEach((subPackage: { root: string; pages: any[] }) => {
      const subRoutes = subPackage.pages.map((page: any) => {
        const newPath = `/${subPackage.root}/${page.path}`;
        const meta = page.meta ?? undefined;
        return { ...page, path: newPath, meta };
      });
      routes.push(...subRoutes);
    });
  }
  return routes;
}

// 创建路由实例
const router = createRouter({
  routes: generateRoutes(),
});

// 全局前置守卫
router.beforeEach((to, from, next) => {
  console.log("🚀 路由守卫触发:", {
    to: to.path,
    from: from.path,
    requireAuth: to.meta?.requireAuth,
  });

  if (to.meta && to.meta.requireAuth && !isLoggedIn()) {
    console.log("🔒 需要登录，但用户未登录");

    // 先阻止当前导航
    next(false);

    // 然后显示登录提示
    uni.showModal({
      title: "提示",
      content: "该功能需要登录后使用",
      confirmText: "去登录",
      cancelText: "返回",
      success: (res) => {
        if (res.confirm) {
          // 记住原来要去的页面
          uni.setStorageSync("redirect", to.fullPath);
          // 使用 uni 原生导航而不是 router
          uni.navigateTo({
            url: "/pages/login/index",
          });
        } else {
          // 取消则返回首页
          uni.switchTab({
            url: "/pages/index/index",
          });
        }
      },
      fail: () => {
        // 失败时也返回首页
        uni.switchTab({
          url: "/pages/index/index",
        });
      },
    });
  } else {
    // 继续导航
    next();
  }
});

router.afterEach((to, from) => {
  console.log("🎯 afterEach 钩子触发:", { to, from });
});

export default router;
