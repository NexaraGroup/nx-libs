---
sidebar_position: 2
---

# 安装

NX libs 是一个模块化的工具集合，每个功能都被封装在独立的包中。你可以只安装你需要的包，而不必引入整个库。

## 安装单个包

### Format 包

提供数字和日期格式化功能：

```bash
# npm
npm install @nxlibs/format

# yarn
yarn add @nxlibs/format

# pnpm
pnpm add @nxlibs/format
```

注意：Format 包有以下对等依赖(peerDependencies)：

```bash
npm install big.js dayjs
```

### TypeScript 配置

共享的 TypeScript 配置：

```bash
# npm
npm install -D @nxlibs/typescript-config

# yarn
yarn add -D @nxlibs/typescript-config

# pnpm
pnpm add -D @nxlibs/typescript-config
```

### ESLint 配置

共享的 ESLint 配置：

```bash
# npm
npm install -D @nxlibs/eslint-config

# yarn
yarn add -D @nxlibs/eslint-config

# pnpm
pnpm add -D @nxlibs/eslint-config
```

### Prettier 配置

共享的 Prettier 配置：

```bash
# npm
npm install -D @nxlibs/prettier-config

# yarn
yarn add -D @nxlibs/prettier-config

# pnpm
pnpm add -D @nxlibs/prettier-config
```

## 一次性安装所有包

如果你需要使用多个包，可以一次性安装：

```bash
# npm
npm install @nxlibs/format
npm install -D @nxlibs/typescript-config @nxlibs/eslint-config @nxlibs/prettier-config

# yarn
yarn add @nxlibs/format
yarn add -D @nxlibs/typescript-config @nxlibs/eslint-config @nxlibs/prettier-config

# pnpm
pnpm add @nxlibs/format
pnpm add -D @nxlibs/typescript-config @nxlibs/eslint-config @nxlibs/prettier-config
```

## 版本兼容性

- Node.js: 14.x 或更高版本
- TypeScript: 4.5 或更高版本
- 支持的浏览器: 所有现代浏览器和 IE11 (需要适当的 polyfills)
