import request from "@/utils/request";
import { ApiHeader } from "@/enums/api-header.enum";

const AUTH_BASE_URL = "/system/auth";

const AuthAPI = {
  /**
   * 登录
   * @param body 登录表单数据
   * @returns 登录结果
   */
  login(body: LoginFormData): Promise<LoginResult> {
    return request<LoginResult>({
      url: `${AUTH_BASE_URL}/login`,
      method: "POST",
      header: { [ApiHeader.KEY]: ApiHeader.FORM },
      data: body,
    });
  },

  /**
   * 刷新令牌
   * @param body 刷新令牌请求体
   * @returns 新的访问令牌
   */
  refreshToken(body: RefreshToekenBody): Promise<any> {
    return request<LoginResult>({
      url: `${AUTH_BASE_URL}/token/refresh`,
      method: "POST",
      data: body,
    });
  },

  /**
   * 获取验证码
   * @returns 验证码信息
   */
  getCaptcha(): Promise<any> {
    return request<CaptchaInfo>({
      url: `${AUTH_BASE_URL}/captcha/get`,
      method: "GET",
    });
  },

  /**
   * 登出
   * @param body 登出请求体
   * @returns 登出结果
   */
  logout(body: LogoutBody): Promise<any> {
    return request<ApiResponse>({
      url: `${AUTH_BASE_URL}/logout`,
      method: "POST",
      data: body,
    });
  },
};

export default AuthAPI;

/** 登录表单数据 */
export interface LoginFormData {
  username: string;
  password: string;
  captcha_key: string;
  captcha: string;
  remember: boolean;
  login_type: string;
}

// 刷新令牌
export interface RefreshToekenBody {
  refresh_token: string;
}

/** 登录响应 */
export interface LoginResult {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
}

/** 验证码信息 */
export interface CaptchaInfo {
  enable: boolean;
  key: string;
  img_base: string;
}

/** 退出登录操作 */
export interface LogoutBody {
  token: string;
}
