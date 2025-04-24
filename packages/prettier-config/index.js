/**
 * @file Prettier 配置
 */

module.exports = {
  // 使用单引号
  singleQuote: true,

  // 如果对象写了引号，保留
  quoteProps: "preserve",

  // 尾逗号
  trailingComma: "all",

  // 一行最多100个字符
  printWidth: 100,

  // 使用制表符缩进
  useTabs: true,

  // 不使用分号
  semi: false,

  // 箭头函数参数始终使用括号
  arrowParens: "always",

  // 对象花括号内添加空格
  bracketSpacing: true,

  // 导入排序
  importOrder: ["react", "<THIRD_PARTY_MODULES>", "^[./]"],

  // 插件
  plugins: [
    "@ianvs/prettier-plugin-sort-imports",
    "prettier-plugin-packagejson",
  ],
};
