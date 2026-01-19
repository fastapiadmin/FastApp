# FastApp - 移动端跨平台应用

<div align="center">
  <p align="center">
    <img src="https://gitee.com/fastapiadmin/FastDocs/raw/main/docs/public/logo.png" width="150" height="150" alt="logo" />
  </p>
  <h1>FastApiAdmin <sup style="background-color: #28a745; color: white; padding: 2px 6px; border-radius: 3px; font-size: 0.4em; vertical-align: super; margin-left: 5px;">v2.0.0</h1>
  <h3>FastApp 基于 uni-app + Vue 3 + TypeScript 的现代化移动端跨平台开发模板</h3>
  <p>如果你喜欢这个项目，给个 ⭐️ 支持一下吧！</p>
  <p align="center">
    <img src="https://img.shields.io/badge/FastApp-3.14.0-blue.svg" alt="FastApp">
    <img src="https://img.shields.io/badge/Vue-3.5.22-green.svg" alt="Vue">
    <img src="https://img.shields.io/badge/TypeScript-5.9.2-blue.svg" alt="TypeScript">
    <img src="https://img.shields.io/badge/uni--app-3.0.0-orange.svg" alt="uni-app">
    <img src="https://img.shields.io/badge/license-MIT-green.svg" alt="License">
  </p>
</div>

## 📖 项目介绍

FastApp 是 FastapiAdmin 项目的移动端应用，基于 uni-app 框架开发，支持一套代码多端运行。采用 Vue 3 + TypeScript + Vite 等现代化技术栈，集成了完善的代码规范和开发工具链，为开发者提供开箱即用的移动端开发解决方案。

### 核心特点

- 🚀 **跨平台支持** - 一套代码，多端运行（H5、微信小程序、支付宝小程序、App等）
- 💎 **现代化技术栈** - Vue 3 Composition API + TypeScript + Vite
- 🎨 **精美UI组件** - 集成 wot-design-uni 组件库，开箱即用
- 📦 **工程化配置** - ESLint、Prettier、Stylelint、Husky 等工具链
- 🔥 **开发体验** - 自动导入、类型提示、热更新等
- 📱 **完整功能** - 用户管理、数据统计、工作台、个人中心等

## 🔗 源码仓库

| 平台       | 仓库地址                                                                                                                                                                                         |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **GitHub** | [FastapiAdmin主工程](https://github.com/fastapiadmin/FastapiAdmin.git) \| [FastDocs官网](https://github.com/fastapiadmin/FastDocs.git) \| [FastApp移动端](https://github.com/fastapiadmin/FastApp.git) |
| **Gitee**  | [FastapiAdmin主工程](https://gitee.com/fastapiadmin/FastapiAdmin.git) \| [FastDocs官网](https://gitee.com/fastapiadmin/FastDocs.git) \| [FastApp移动端](https://gitee.com/fastapiadmin/FastApp.git)          |

## 📸 项目截图

| 登录 <div style="width:60px"/> | 首页 <div style="width:60px"/> | 个人中心 <div style="width:60px"/> |
|----------|----------|----------|
| ![移动端登录](https://gitee.com/fastapiadmin/FastDocs/raw/main/docs/public/app_login.png) | ![移动端首页](https://gitee.com/fastapiadmin/FastDocs/raw/main/docs/public/app_home.png) | ![移动端个人中心](https://gitee.com/fastapiadmin/FastDocs/raw/main/docs/public/app_mine.png) |

## ✨ 功能特性

### 核心功能模块

- ✅ **用户认证** - 登录、注册、密码重置、权限管理
- ✅ **首页展示** - 轮播图、快捷导航、通知公告、数据统计
- ✅ **工作台** - 业务功能入口，支持权限控制
- ✅ **个人中心** - 个人信息、设置、FAQ、问题反馈
- ✅ **数据统计** - 实时访客数、浏览量等数据展示
- ✅ **主题切换** - 支持深色/浅色主题切换

### 系统功能特性

- 🔐 **用户管理** - 支持用户注册、登录、权限管理等功能，提供完善的用户体系
- 📊 **数据统计** - 提供实时数据分析和可视化报表，帮助您更好地了解业务状况
- 📁 **文件管理** - 支持文件上传、下载、分类管理，提供安全的文件存储服务
- 🔔 **消息通知** - 实时消息推送和系统通知，确保您不会错过重要信息
- 🛡️ **权限控制** - 基于RBAC的权限管理模型，灵活控制用户访问权限
- 📝 **日志审计** - 完整的操作日志记录，便于追踪和审计用户行为

## 🛠️ 技术栈

### 核心框架

- **[uni-app](https://uniapp.dcloud.net.cn/)** - 跨平台应用开发框架
- **[Vue 3](https://cn.vuejs.org/)** - 渐进式 JavaScript 框架（Composition API）
- **[TypeScript](https://www.typescriptlang.org/)** - JavaScript 的超集，提供类型支持
- **[Vite](https://cn.vitejs.dev/)** - 下一代前端构建工具

### 工具库

- **[UnoCSS](https://unocss.dev/)** - 原子化 CSS 引擎
- **[VueUse](https://vueuse.org/)** - Vue Composition API 工具集合
- **[vue-i18n](https://vue-i18n.intlify.dev/)** - Vue 国际化插件
- **[@stomp/stompjs](https://stomp-js.github.io/)** - WebSocket 消息协议库

### 开发工具

- **ESLint** - JavaScript/TypeScript 代码检查工具
- **Prettier** - 代码格式化工具
- **Stylelint** - CSS 代码检查工具
- **Husky** - Git hooks 工具
- **Commitlint** - Git 提交信息规范检查

## 📁 项目结构

```bash
FastApp/
├── public/                 # 静态资源目录
├── src/
│   ├── api/               # API 接口定义
│   ├── components/        # 公共组件
│   ├── composables/       # 组合式函数
│   ├── constants/         # 常量定义
│   ├── enums/             # 枚举定义
│   ├── layouts/           # 布局组件
│   ├── pages/             # 页面目录
│   │   ├── index/         # 首页
│   │   ├── login/         # 登录页
│   │   ├── work/          # 工作台
│   │   └── mine/          # 个人中心
│   ├── router/            # 路由配置
│   ├── store/             # 状态管理
│   ├── styles/            # 样式文件
│   ├── types/             # TypeScript 类型定义
│   ├── utils/             # 工具函数
│   ├── App.vue            # 应用根组件
│   ├── main.ts            # 应用入口文件
│   ├── manifest.json      # 应用配置文件
│   └── pages.json         # 页面路由配置
├── dist/                  # 构建输出目录
├── .eslintrc.js           # ESLint 配置
├── vite.config.ts         # Vite 配置
├── tsconfig.json          # TypeScript 配置
├── pages.config.ts        # 页面配置
├── unocss.config.ts       # UnoCSS 配置
└── package.json           # 项目依赖配置
```

## 🚀 快速开始

### 环境要求

- **Node.js** >= 22
- **pnpm** >= 9

### 安装依赖

```bash
pnpm install
```

### 开发运行

#### H5 开发

```bash
# 启动 H5 开发服务器
pnpm run dev:h5

# 访问地址
# http://localhost:5180/app
```

### 生产构建

#### H5 构建

```bash
pnpm run build:h5

# 构建产物在 dist/build/h5 目录
```

## 📝 开发指南

### 代码规范

项目集成了完善的代码规范工具：

```bash
# ESLint 检查并自动修复
pnpm run lint:eslint

# Prettier 格式化
pnpm run lint:prettier

# Stylelint 检查样式
pnpm run lint:stylelint

# TypeScript 类型检查
pnpm run type-check
```

### 自动导入

项目配置了自动导入，以下内容无需手动导入：

- Vue 3 API（`ref`, `computed`, `watch` 等）
- uni-app API（`uni.request`, `uni.navigateTo` 等）
- Pinia（`defineStore`, `storeToRefs` 等）
- 路由（`useRouter`, `useRoute` 等）
- 组件库工具（`useToast`, `useMessage` 等）
- `src/composables` 目录下的组合式函数
- `src/utils` 目录下的工具函数
- `src/api` 目录下的 API 函数

### 路由配置

路由配置采用约定式路由，在 `src/pages` 目录下创建页面文件即可自动生成路由。

页面路由配置在 `pages.config.ts` 文件中：

```typescript
export default defineUniPages({
  globalStyle: {
    navigationBarTitleText: "FastApp",
    // ...
  },
  tabBar: {
    // 底部导航栏配置
  },
});
```

### 状态管理

使用 Pinia 进行状态管理，store 文件位于 `src/store` 目录：

```typescript
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    // 状态
  }),
  actions: {
    // 方法
  },
});
```

### 样式开发

- 使用 **UnoCSS** 原子化 CSS，支持类名方式快速开发
- 支持 **SCSS** 预处理器
- 支持主题变量配置（`src/theme.json`）

### API 请求

API 请求封装在 `src/api` 目录，使用 uni-app 的 `uni.request` 进行网络请求。

## 🔧 配置说明

### 环境变量

在项目根目录创建 `.env` 文件配置环境变量：

```env
# API 基础地址
VITE_API_BASE_URL=http://localhost:8001

# API 前缀
VITE_APP_BASE_API=/api

# 开发服务器端口
VITE_APP_PORT=5180
```

### 代理配置

H5 开发时的代理配置在 `vite.config.ts` 中：

```typescript
proxy: {
  [env.VITE_APP_BASE_API]: {
    changeOrigin: true,
    target: env.VITE_API_BASE_URL,
  },
}
```

## 📦 构建部署

### H5 部署

1. 执行构建命令：`pnpm run build:h5`
2. 将 `dist/build/h5` 目录部署到 Web 服务器
3. 配置服务器支持 SPA 路由（如 Nginx 的 `try_files`）

### 小程序发布

1. 执行对应平台的构建命令
2. 使用对应平台的开发者工具打开构建产物目录
3. 在开发者工具中上传代码并提交审核

### App 打包

1. 使用 HBuilderX 打开项目
2. 配置 App 相关信息（图标、启动页等）
3. 选择云打包或本地打包
4. 下载安装包并发布到应用商店

## 🤝 贡献指南

欢迎贡献代码！请遵循以下步骤：

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📄 许可证

本项目采用 [MIT](LICENSE) 许可证。

## 🙏 致谢

- [uni-app](https://uniapp.dcloud.net.cn/) - 跨平台应用开发框架
- [Vue 3](https://cn.vuejs.org/) - 渐进式 JavaScript 框架
- [Vite](https://cn.vitejs.dev/) - 下一代前端构建工具

---

## 🎨 社区交流

| 群组二维码 | 微信支付二维码 |
| --- | --- |
| ![群组二维码](https://gitee.com/fastapiadmin/FastDocs/raw/main/docs/public/group.jpg) | ![微信支付二维码](https://gitee.com/fastapiadmin/FastDocs/raw/main/docs/public/wechatPay.jpg) |

---

<div align="center">

**如果这个项目对你有帮助，请给一个 ⭐ Star**

Made with ❤️ by FastApp Team

</div>
