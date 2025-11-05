import { getAccessToken } from "@/utils/auth";
import { ApiCode } from "@/enums/api-code.enum";

// H5 使用 VITE_APP_BASE_API 作为代理路径，其他平台使用 VITE_API_BASE_URL 作为请求路径
let baseApi = import.meta.env.VITE_API_BASE_URL;
// #ifdef H5
baseApi = import.meta.env.VITE_APP_BASE_API;
// #endif

const FileAPI = {
  /**
   * 文件上传地址
   */
  uploadUrl: baseApi + "/files/upload",

  /**
   * 上传文件
   *
   * @param filePath
   */
  upload(filePath: string): Promise<UploadFileResult> {
    return new Promise((resolve, reject) => {
      uni.uploadFile({
        url: this.uploadUrl,
        filePath: filePath,
        name: "file",
        header: {
          Authorization: getAccessToken() ? `Bearer ${getAccessToken()}` : "",
        },
        formData: {},
        success: (response) => {
          const resData = JSON.parse(response.data) as ApiResponse<UploadFileResult>;
          // 业务状态码 0 表示成功
          if (resData.code === ApiCode.SUCCESS) {
            resolve(resData.data);
          } else {
            // 其他业务处理失败
            uni.showToast({
              title: resData.msg || "文件上传失败",
              icon: "none",
            });
            reject({
              message: resData.msg || "业务处理失败",
              code: resData.code,
            });
          }
        },
        fail: (error) => {
          console.log("fail error", error);
          uni.showToast({
            title: "文件上传请求失败",
            icon: "none",
            duration: 2000,
          });
          reject({
            message: "文件上传请求失败",
            error,
          });
        },
      });
    });
  },
};

export default FileAPI;
