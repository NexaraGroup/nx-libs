/**
 * @file
 * 有的时候，修改需要重启 IDE
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

  // 制表符宽度
  tabWidth: 4,

  // 行尾使用LF
  endOfLine: "lf",

  // 文件末尾插入空行
  insertFinalNewline: true,

  // 导入排序规则
  importOrder: ["react", "<THIRD_PARTY_MODULES>", "^[./]"],

  // 使用的插件
  plugins: [
    "@ianvs/prettier-plugin-sort-imports",
    "prettier-plugin-packagejson",
  ],
};
