import { defineStore } from "pinia";
import UserAPI, { type UserInfo } from "@/api/user";
import AuthAPI, { type LoginFormData, type LoginResult, type LogoutBody } from "@/api/auth";
import { getAccessToken, setAccessToken, setRefreshToken, clearAll, getUserInfo, setUserInfo } from "@/utils/auth";

export const useUserStore = defineStore("appUserInfo", () => {
  const userInfo = ref<UserInfo | undefined>(getUserInfo());
  const isLoggingIn = ref(false);

  // 统一的登录处理方法
  const handleLogin = async (loginFn: () => Promise<LoginResult>, loginType: string) => {
    if (isLoggingIn.value) return;

    isLoggingIn.value = true;
    try {
      const result = await loginFn();
      setAccessToken(result.access_token);
      setRefreshToken(result.refresh_token);

      // 登录成功后获取用户信息
      await getInfo();

      return result;
    } catch (error: any) {
      console.error(`${loginType}登录失败`, error);
      throw error;
    } finally {
      isLoggingIn.value = false;
    }
  };

  // 账号密码登录
  const login = async (data: LoginFormData) => {
    return handleLogin(() => AuthAPI.login(data), "账号密码");
  };

  // 获取用户信息
  const getInfo = async () => {
    try {
      const userInfoData = await UserAPI.getCurrentUserInfo();
      setUserInfo(userInfoData);
      // 确保响应式数据更新
      userInfo.value = userInfoData;
      return userInfoData;
    } catch (error) {
      console.error("获取用户信息失败", error);
      return null;
    }
  };

  // 登出
  const logout = async () => {
    try {
      const logoutBody: LogoutBody = {
        token: getAccessToken() || "",
      };
      await AuthAPI.logout(logoutBody); // 调用后台注销接口
    } catch (error) {
      console.error("登出失败", error);
    } finally {
      clearAll(); // 清除本地的 token
      userInfo.value = undefined; // 清空用户信息
      // 跳转到登录页面
      uni.reLaunch({
        url: "/pages/login/index",
      });
    }
  };

  // 判断用户信息是否完整
  const isUserInfoComplete = (): boolean => {
    if (!userInfo.value) return false;
    return !!(userInfo.value.username && userInfo.value.avatar);
  };

  return {
    userInfo,
    isLoggingIn,
    login,
    logout,
    getInfo,
    isUserInfoComplete,
  };
});
