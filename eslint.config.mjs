// https://eslint.nodejs.cn/docs/latest/use/configure/configuration-files

import globals from "globals";
import pluginJs from "@eslint/js"; // JavaScript 规则
import pluginVue from "eslint-plugin-vue"; // Vue 规则
import pluginTypeScript from "@typescript-eslint/eslint-plugin"; // TypeScript 规则

import parserVue from "vue-eslint-parser"; // Vue 解析器
import parserTypeScript from "@typescript-eslint/parser"; // TypeScript 解析器

import configPrettier from "eslint-config-prettier"; // 禁用与 Prettier 冲突的规则
import pluginPrettier from "eslint-plugin-prettier"; // 运行 Prettier 规则

// 解析自动导入配置
import fs from "fs";
const autoImportConfig = JSON.parse(fs.readFileSync(".eslintrc-auto-import.json", "utf-8"));

/** @type {import('eslint').Linter.Config[]} */
export default [
  // 忽略指定文件
  {
    ignores: ["node_modules/**", "dist/**", "auto-imports.d.ts", "unpackage/**", "public/**", "static/**", "**/u-charts/**", "**/qiun-**/**", "**/auto-imports.d.ts"],
  },
  // 检查文件的配置
  {
    files: ["**/*.{js,mjs,cjs,ts,vue}"],
    ignores: ["**/*.d.ts"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...autoImportConfig.globals,
        ...{
          uni: "readonly", // uni-app 全局对象
          UniApp: "readonly", // uni-app 全局对象
          getCurrentPages: "readonly", // uni-app 全局 API
          ApiResponse: "readonly", // 统一响应数据类型
          PageQuery: "readonly", // 分页查询数据类型
          PageResult: "readonly", // 分页结果数据类型
          OptionType: "readonly", // 选项类型
          creatorType: "readonly", // 创建人类型
          UploadFileResult: "readonly", // 上传文件返回类型
          plus: true, // HTML5+ 运行时环境
        },
      },
    },
    plugins: { prettier: pluginPrettier },
    rules: {
      ...configPrettier.rules, // 关闭与 Prettier 冲突的规则
      ...pluginPrettier.configs.recommended.rules, // 启用 Prettier 规则
      "prettier/prettier": "off", // 完全关闭 Prettier 格式化检查
      "no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_", // 忽略参数名以 _ 开头的参数未使用警告
          varsIgnorePattern: "^[A-Z0-9_]+$", // 忽略变量名为大写字母、数字或下划线组合的未使用警告（枚举定义未使用场景）
          ignoreRestSiblings: true, // 忽略解构赋值中同级未使用变量的警告
        },
      ],
      "no-prototype-builtins": "off", // 允许直接调用Object.prototype方法
      "no-constant-binary-expression": "warn", // 将常量二元表达式警告降为警告级别
    },
  },
  // JavaScript 配置
  pluginJs.configs.recommended,

  // TypeScript 配置
  {
    files: ["**/*.ts"],
    ignores: ["**/*.d.ts"], // 排除d.ts文件
    languageOptions: {
      parser: parserTypeScript,
      parserOptions: {
        sourceType: "module",
      },
    },
    plugins: { "@typescript-eslint": pluginTypeScript },
    rules: {
      ...pluginTypeScript.configs.strict.rules, // TypeScript 严格规则
      "@typescript-eslint/no-explicit-any": "off", // 允许使用 any
      "@typescript-eslint/no-empty-function": "off", // 允许空函数
      "@typescript-eslint/no-empty-object-type": "off", // 允许空对象类型
    },
  },

  // Vue 配置
  {
    files: ["**/*.vue"],
    languageOptions: {
      parser: parserVue,
      parserOptions: {
        parser: parserTypeScript,
        sourceType: "module",
      },
    },
    plugins: { vue: pluginVue, "@typescript-eslint": pluginTypeScript },
    processor: pluginVue.processors[".vue"],
    rules: {
      ...pluginVue.configs["vue3-recommended"].rules, // Vue 3 推荐规则
      "vue/no-v-html": "off", // 允许 v-html
      "vue/multi-word-component-names": "off", // 允许单个单词组件名
    },
  },

  // 单独针对第三方组件的处理
  {
    files: ["**/qiun-data-charts.vue", "**/qiun-data-charts/**/*.vue", "**/u-charts/**"],
    linterOptions: {
      noInlineConfig: false,
      reportUnusedDisableDirectives: false,
    },
    rules: {
      // 禁用所有规则
      ...Object.fromEntries(Object.keys(pluginVue.configs["vue3-recommended"].rules || {}).map((key) => [key, "off"])),
      "no-unused-vars": "off",
      "no-prototype-builtins": "off",
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
];
