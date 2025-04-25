---
sidebar_position: 2
---

# 安装

NX Utils 是一个模块化的工具集合，每个功能都被封装在独立的包中。你可以只安装你需要的包，而不必引入整个库。

## 安装单个包

### Format 包

提供数字和日期格式化功能：

```bash
# npm
npm install @nx-utils/format

# yarn
yarn add @nx-utils/format

# pnpm
pnpm add @nx-utils/format
```

注意：Format 包有以下对等依赖(peerDependencies)：

```bash
npm install big.js dayjs
```

### TypeScript 配置

共享的 TypeScript 配置：

```bash
# npm
npm install -D @nx-utils/typescript-config

# yarn
yarn add -D @nx-utils/typescript-config

# pnpm
pnpm add -D @nx-utils/typescript-config
```

### ESLint 配置

共享的 ESLint 配置：

```bash
# npm
npm install -D @nx-utils/eslint-config

# yarn
yarn add -D @nx-utils/eslint-config

# pnpm
pnpm add -D @nx-utils/eslint-config
```

### Prettier 配置

共享的 Prettier 配置：

```bash
# npm
npm install -D @nx-utils/prettier-config

# yarn
yarn add -D @nx-utils/prettier-config

# pnpm
pnpm add -D @nx-utils/prettier-config
```

## 一次性安装所有包

如果你需要使用多个包，可以一次性安装：

```bash
# npm
npm install @nx-utils/format
npm install -D @nx-utils/typescript-config @nx-utils/eslint-config @nx-utils/prettier-config

# yarn
yarn add @nx-utils/format
yarn add -D @nx-utils/typescript-config @nx-utils/eslint-config @nx-utils/prettier-config

# pnpm
pnpm add @nx-utils/format
pnpm add -D @nx-utils/typescript-config @nx-utils/eslint-config @nx-utils/prettier-config
```

## 版本兼容性

- Node.js: 14.x 或更高版本
- TypeScript: 4.5 或更高版本
- 支持的浏览器: 所有现代浏览器和 IE11 (需要适当的 polyfills)

## 下一步

- [快速开始](/getting-started) - 学习如何在项目中使用 NX Utils
- [包介绍](/packages/format) - 了解每个包的详细用法 