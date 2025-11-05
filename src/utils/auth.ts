import { useUserStore } from "@/store";
import { Storage } from "./storage";
import { APP_ACCESS_TOKEN_KEY, APP_REFRESH_TOKEN_KEY, APP_USER_INFO } from "@/constants";

// 获取访问 token
export function getAccessToken(): string | null {
  return Storage.get<string>(APP_ACCESS_TOKEN_KEY) || null;
}

// 设置 token
export function setAccessToken(token: string): void {
  return Storage.set(APP_ACCESS_TOKEN_KEY, token);
}

// 获取刷新 token
export function getRefreshToken(): string | null {
  return Storage.get<string>(APP_REFRESH_TOKEN_KEY) || null;
}

// 设置刷新 token
export function setRefreshToken(token: string): void {
  return Storage.set(APP_REFRESH_TOKEN_KEY, token);
}

// 清除 token
export function clearTokens() {
  Storage.remove(APP_ACCESS_TOKEN_KEY);
  Storage.remove(APP_REFRESH_TOKEN_KEY);
}

// 获取用户信息
export function getUserInfo<T = any>(): T | undefined {
  return Storage.get<T>(APP_USER_INFO);
}

// 设置用户信息
export function setUserInfo(userInfo: any): void {
  return Storage.set(APP_USER_INFO, userInfo);
}

// 清除用户信息
export function clearUserInfo() {
  return Storage.remove(APP_USER_INFO);
}

// 清除所有缓存信息
export function clearAll() {
  Storage.remove(APP_ACCESS_TOKEN_KEY);
  Storage.remove(APP_REFRESH_TOKEN_KEY);
  Storage.remove(APP_USER_INFO);
}

// 检查用户登录状态，未登录则跳转到登录页面
export function checkLogin(silent: boolean = false): boolean {
  const userStore = useUserStore();
  const accessToken = getAccessToken();

  // 检查 token 和用户信息是否都存在
  const isLoggedIn = !!(accessToken && userStore.userInfo);

  if (!isLoggedIn && !silent) {
    try {
      // 获取当前页面路径
      let currentPagePath = "/pages/index/index"; // 默认路径

      const pages = getCurrentPages();
      if (pages && pages.length > 0) {
        const currentPage = pages[pages.length - 1];
        if (currentPage && currentPage.route) {
          currentPagePath = `/${currentPage.route}`;

          // 处理页面参数 - 使用类型断言
          const pageOptions = (currentPage as any).options;
          if (pageOptions && Object.keys(pageOptions).length > 0) {
            const params = new URLSearchParams(pageOptions as Record<string, string>);
            currentPagePath += `?${params.toString()}`;
          }
        }
      }

      // 跳转到登录页面
      uni.navigateTo({
        url: `/pages/login/index?redirect=${encodeURIComponent(currentPagePath)}`,
        fail: (error) => {
          console.error("跳转登录页面失败:", error);
          // 如果 navigateTo 失败，尝试使用 reLaunch
          uni.reLaunch({
            url: "/pages/login/index",
          });
        },
      });
    } catch (error) {
      console.error("检查登录状态时发生错误:", error);
      // 发生错误时，尝试直接跳转到登录页
      uni.reLaunch({
        url: "/pages/login/index",
      });
    }
  }

  return isLoggedIn;
}

// 检查用户是否已登录（静默检查，不跳转）
export function isLoggedIn(): boolean {
  return checkLogin(true);
}

// 强制用户登录，清除无效的登录状态
export function requireLogin(): void {
  const userStore = useUserStore();
  const accessToken = getAccessToken();

  if (!accessToken || !userStore.userInfo) {
    // 清除可能存在的无效状态
    clearTokens();
    userStore.logout();

    // 跳转到登录页
    uni.reLaunch({
      url: "/pages/login/index",
    });
  }
}
