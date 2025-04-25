/**
 * @file Next.js项目的ESLint配置
 * 扩展了React配置，添加Next.js特定规则
 */
module.exports = {
  extends: ["../react", "next/core-web-vitals"], // react 继承了 base，所以不需要单独引入 base
  rules: {
    // Next.js 特定规则
    "@next/next/no-html-link-for-pages": "error",
    "@next/next/no-img-element": "warn",

    // 覆盖某些React规则，以适应Next.js最佳实践
    "jsx-a11y/anchor-is-valid": "off", // Next.js的Link组件处理方式特殊
  },
};
