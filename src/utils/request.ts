import { ApiCode } from "@/enums/api-code.enum";

import { getAccessToken, clearAll } from "@/utils/auth";
/**
 * 请求拦截器 - 添加 Authorization 头
 */
function request<T>(options: UniApp.RequestOptions): Promise<T> {
  uni.showLoading({
    title: "加载中...",
  });
  return new Promise<T>((resolve, reject) => {
    // H5 使用 VITE_APP_BASE_API 作为代理路径，其他平台使用 VITE_API_BASE_URL 作为请求路径
    let baseApi = import.meta.env.VITE_API_BASE_URL;
    // #ifdef H5
    baseApi = import.meta.env.VITE_APP_BASE_API;
    // #endif

    let timeout = Number(import.meta.env.VITE_TIMEOUT);
    if (options.timeout) {
      timeout = options.timeout;
    }

    // 统一处理请求
    uni.request({
      url: `${baseApi}${options.url}`,
      method: options.method,
      data: options.data,
      header: {
        ...options.header,
        Authorization: getAccessToken() ? `Bearer ${getAccessToken()}` : "",
      },
      timeout: timeout,
      responseType: options.responseType,
      success: (res: UniApp.RequestSuccessCallbackResult) => {
        const result = res.data as ApiResponse<T>;
        // 请求成功
        if (result.code === ApiCode.SUCCESS) {
          resolve(result.data);
        }
        // 令牌过期
        else if (result.code === ApiCode.TOKEN_EXPIRED) {
          // 清除所有缓存
          clearAll();
          // 跳转登录
          uni.reLaunch({ url: "/pages/login/index" });
          // 提示
          uni.showToast({
            title: result.msg || "登录已过期，请重新登录",
            icon: "error",
          });
          reject(new Error(result.msg || "登录已过期，请重新登录"));
        }
        // 未授权访问
        else if (result.code === ApiCode.UNAUTHORIZED) {
          uni.showToast({
            title: result.msg || "未授权访问",
            icon: "error",
          });
          reject(new Error(result.msg || "未授权访问"));
        }
        // 其他错误
        else {
          uni.showToast({
            title: result.msg || "请求失败",
            icon: "error",
          });
          reject(new Error(result.msg || "请求失败"));
        }
      },
      fail: (err: UniApp.GeneralCallbackResult) => {
        console.log("请求失败", err);
        uni.showToast({
          title: "网络请求失败",
          icon: "none",
          duration: 2000,
        });
        reject(new Error(err.errMsg || "网络请求失败"));
      },
      complete: () => {
        // 请求完成，隐藏loading
        uni.hideLoading();
      },
    });
  });
}

export default request;
