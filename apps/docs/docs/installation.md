---
sidebar_position: 3
---

# 安装指南

本指南将详细介绍如何在项目中安装和配置 NX libs 的各个包。

## 🎯 包选择指南

根据你的项目类型和需求选择合适的包：

### 📋 所有可用包

| 包名 | 版本 | 用途 | 安装命令 |
|------|------|------|----------|
| `@nxlibs/typescript-config` | [![npm](https://img.shields.io/npm/v/@nxlibs/typescript-config)](https://www.npmjs.com/package/@nxlibs/typescript-config) | TypeScript 配置 | `pnpm add -D @nxlibs/typescript-config` |
| `@nxlibs/eslint-config` | [![npm](https://img.shields.io/npm/v/@nxlibs/eslint-config)](https://www.npmjs.com/package/@nxlibs/eslint-config) | ESLint 配置 | `pnpm add -D @nxlibs/eslint-config` |
| `@nxlibs/format` | [![npm](https://img.shields.io/npm/v/@nxlibs/format)](https://www.npmjs.com/package/@nxlibs/format) | 格式化工具 | `pnpm add @nxlibs/format` |
| `@nxlibs/prettier-config` | [![npm](https://img.shields.io/npm/v/@nxlibs/prettier-config)](https://www.npmjs.com/package/@nxlibs/prettier-config) | Prettier 配置 | `pnpm add -D @nxlibs/prettier-config` |

### 🎨 按项目类型选择

#### TypeScript 库项目

```bash
# 核心配置
pnpm add -D @nxlibs/typescript-config
pnpm add -D @nxlibs/eslint-config  
pnpm add -D @nxlibs/prettier-config

# 工具函数（可选）
pnpm add @nxlibs/format
```

#### React 应用/组件库

```bash
# 核心配置
pnpm add -D @nxlibs/typescript-config
pnpm add -D @nxlibs/eslint-config
pnpm add -D @nxlibs/prettier-config

# 工具函数（可选）
pnpm add @nxlibs/format

# React 相关依赖
pnpm add -D eslint react @types/react
```

#### Next.js 应用

```bash
# 核心配置
pnpm add -D @nxlibs/typescript-config
pnpm add -D @nxlibs/eslint-config
pnpm add -D @nxlibs/prettier-config

# 工具函数（可选）
pnpm add @nxlibs/format

# Next.js 相关依赖
pnpm add -D eslint next react @types/react
```

## 🔧 详细安装步骤

### 第一步：安装基础依赖

所有配置包都需要相应的基础工具：

```bash
# TypeScript (必需)
pnpm add -D typescript

# ESLint (如果使用 eslint-config)
pnpm add -D eslint

# Prettier (如果使用 prettier-config)  
pnpm add -D prettier
```

### 第二步：安装 NX libs 包

根据需求安装相应的配置包：

```bash
# 选择你需要的包
pnpm add -D @nxlibs/typescript-config
pnpm add -D @nxlibs/eslint-config
pnpm add -D @nxlibs/prettier-config

# 工具包（生产依赖）
pnpm add @nxlibs/format
```

### 第三步：安装对等依赖

某些包需要安装对等依赖：

#### @nxlibs/format 的对等依赖

```bash
# 必需的对等依赖
pnpm add big.js dayjs
```

#### @nxlibs/eslint-config 的对等依赖

```bash
# 基础 ESLint（已在第一步安装）
pnpm add -D eslint

# React 项目额外依赖
pnpm add -D eslint-plugin-react eslint-plugin-react-hooks

# Next.js 项目额外依赖  
pnpm add -D eslint-config-next
```

## 📦 包管理器支持

NX libs 支持所有主流的包管理器：

### npm

```bash
npm install -D @nxlibs/typescript-config
npm install @nxlibs/format
```

### yarn

```bash
yarn add -D @nxlibs/typescript-config
yarn add @nxlibs/format
```

### pnpm (推荐)

```bash
pnpm add -D @nxlibs/typescript-config
pnpm add @nxlibs/format
```

> 💡 **推荐使用 pnpm**：我们的项目本身使用 pnpm，推荐你也使用 pnpm 以获得最佳体验。

## ⚙️ 安装后配置

安装完成后，你需要创建配置文件：

### TypeScript 配置

创建 `tsconfig.json`：

```json
{
  "extends": "@nxlibs/typescript-config/base.json",
  "compilerOptions": {
    "rootDir": "src",
    "outDir": "dist"  
  },
  "include": ["src/**/*.ts"]
}
```

### ESLint 配置

创建 `.eslintrc.js`：

```js
module.exports = {
  extends: ['@nxlibs/eslint-config'],
  rules: {
    // 你的自定义规则
  },
};
```

### Prettier 配置

在 `package.json` 中添加：

```json
{
  "prettier": "@nxlibs/prettier-config"
}
```

## 🚨 常见问题

### 版本兼容性

- **Node.js**: 需要 Node.js 16+ 
- **TypeScript**: 支持 TypeScript 4.5+
- **React**: 支持 React 17+
- **Next.js**: 支持 Next.js 12+

### 依赖冲突

如果遇到依赖版本冲突，可以使用以下策略：

```bash
# 查看冲突信息
pnpm ls --depth=0

# 使用覆盖解决冲突（package.json）
{
  "pnpm": {
    "overrides": {
      "eslint": "^8.0.0"
    }
  }
}
```

### TypeScript 版本问题

如果 TypeScript 版本过旧，升级到最新版本：

```bash
pnpm add -D typescript@latest
```

## 🔄 版本更新

### 检查更新

```bash
# 检查 NX libs 包的更新
pnpm outdated | grep @nxlibs

# 或者使用 npm-check-updates
npx npm-check-updates -f "@nxlibs/*"
```

### 更新到最新版本

```bash
# 更新所有 NX libs 包
pnpm up "@nxlibs/*"

# 或逐个更新
pnpm up @nxlibs/typescript-config@latest
pnpm up @nxlibs/eslint-config@latest
pnpm up @nxlibs/format@latest
pnpm up @nxlibs/prettier-config@latest
```

## 📋 安装检查清单

安装完成后，检查以下项目：

- [ ] 包已正确安装在 `package.json` 中
- [ ] 对等依赖已安装  
- [ ] 配置文件已创建（`tsconfig.json`, `.eslintrc.js` 等）
- [ ] IDE 能够正确识别类型定义
- [ ] ESLint 规则正常工作
- [ ] Prettier 格式化正常工作
- [ ] 构建命令成功执行

## 🆘 获取帮助

如果在安装过程中遇到问题：

1. 查看 [常见问题解答](#常见问题)
2. 检查 [GitHub Issues](https://github.com/NexaraGroup/nx-libs/issues)
3. 提交新的 issue 描述问题

## 🎯 下一步

安装完成后，建议：

1. 阅读 [快速开始](/docs/getting-started) 了解基本用法
2. 查看各包的详细文档：
   - [TypeScript 配置](/packages/typescript-config)
   - [ESLint 配置](/packages/eslint-config)
   - [格式化工具](/packages/format)
   - [Prettier 配置](/packages/prettier-config)
3. 参考 [最佳实践指南](/docs/guides/contributing)
