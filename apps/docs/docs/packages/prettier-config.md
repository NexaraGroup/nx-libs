---
sidebar_position: 4
---

# Prettier 配置

`@nx-utils/prettier-config` 包提供了一组预配置的 Prettier 规则，用于在项目中保持代码格式的一致性，减少团队在代码风格上的争议。

## 安装

```bash
# npm
npm install -D @nx-utils/prettier-config prettier

# yarn
yarn add -D @nx-utils/prettier-config prettier

# pnpm
pnpm add -D @nx-utils/prettier-config prettier
```

## 特性

- ✅ **预配置规则** - 无需手动配置 Prettier 选项
- ✅ **与 ESLint 兼容** - 与 `@nx-utils/eslint-config` 完美配合
- ✅ **清晰的代码风格** - 强调可读性和一致性
- ✅ **现代 JavaScript 支持** - 针对 ES6+ 语法优化
- ✅ **多种文件类型** - 适用于 JS、TS、JSX、TSX、JSON、YAML、Markdown 等

## 使用方法

### 基本使用

创建 `.prettierrc.js` 文件，内容如下：

```js
module.exports = require('@nx-utils/prettier-config');
```

就这么简单！现在你的项目将使用 `@nx-utils/prettier-config` 中定义的规则。

### 自定义配置

如果你需要覆盖某些规则，可以这样做：

```js
const config = require('@nx-utils/prettier-config');

module.exports = {
  ...config,
  // 自定义规则...
  printWidth: 100,
  semi: false,
};
```

## 默认配置

以下是 `@nx-utils/prettier-config` 包含的默认配置：

```js
module.exports = {
  // 行宽
  printWidth: 80,
  
  // 使用 2 个空格缩进
  tabWidth: 2,
  
  // 使用空格而非 tab 缩进
  useTabs: false,
  
  // 在语句末尾添加分号
  semi: true,
  
  // 使用单引号
  singleQuote: true,
  
  // 对象属性的引号使用
  quoteProps: 'as-needed',
  
  // JSX 中使用双引号
  jsxSingleQuote: false,
  
  // 多行时尾随逗号
  trailingComma: 'es5',
  
  // 对象字面量的括号之间添加空格
  bracketSpacing: true,
  
  // JSX 标签的 > 放在最后一行的末尾，而不是单独一行
  bracketSameLine: false,
  
  // 箭头函数参数的括号
  arrowParens: 'always',
  
  // 格式化文件的开头和结尾
  requirePragma: false,
  insertPragma: false,
  
  // Markdown 文本换行
  proseWrap: 'preserve',
  
  // HTML 空白敏感度
  htmlWhitespaceSensitivity: 'css',
  
  // Vue 文件中的脚本和样式标签的缩进
  vueIndentScriptAndStyle: false,
  
  // 行尾序列
  endOfLine: 'lf',
  
  // 排序导入语句
  importOrder: ['^@core/(.*)$', '^@server/(.*)$', '^@ui/(.*)$', '^[./]'],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};
```

## 与其他工具集成

### 与 ESLint 集成

首先安装必要的包：

```bash
pnpm add -D eslint @nx-utils/eslint-config eslint-config-prettier
```

然后在 `.eslintrc.js` 中配置：

```js
module.exports = {
  extends: [
    '@nx-utils/eslint-config/base',
    'prettier', // 确保这是最后一个扩展，禁用与 Prettier 冲突的规则
  ],
};
```

### 与 VS Code 集成

1. 安装 Prettier 扩展
2. 在 VS Code 设置中添加：

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "prettier.requireConfig": true
}
```

### 与 Git 集成

使用 husky 和 lint-staged 在提交代码前自动格式化：

1. 安装必要的包：

```bash
pnpm add -D husky lint-staged
```

2. 配置 `package.json`：

```json
{
  "scripts": {
    "prepare": "husky install"
  },
  "lint-staged": {
    "*.{js,jsx,ts,tsx,json,css,md}": ["prettier --write"]
  }
}
```

3. 添加 Git hook：

```bash
npx husky add .husky/pre-commit "npx lint-staged"
```

## 常见问题

### 如何处理特定文件的格式化例外？

创建 `.prettierignore` 文件，添加你不想格式化的文件或目录：

```
# 构建输出
dist/
build/

# 依赖
node_modules/

# 其他
coverage/
*.min.js
```

### 如何在命令行中使用 Prettier？

```bash
# 格式化特定文件
npx prettier --write src/index.ts

# 格式化多个文件
npx prettier --write "src/**/*.{js,jsx,ts,tsx}"

# 检查文件格式是否正确（不修改）
npx prettier --check "src/**/*.{js,jsx,ts,tsx}"
```

### 格式化和 Lint 有什么区别？

- **Prettier** 关注代码格式化（空格、换行、引号等）
- **ESLint** 关注代码质量和潜在错误

两者结合使用效果最佳：Prettier 处理格式，ESLint 处理代码质量。 