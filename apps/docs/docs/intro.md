---
slug: /
sidebar_position: 1
---

# 欢迎使用 NX libs

**NX libs** 是一个前端工具库集合，提供可靠的实用工具，简化前端开发流程。

## 特性

- ✅ **类型安全** - 所有包都提供完整的 TypeScript 类型定义
- ✅ **模块化设计** - 按需引入，支持 tree-shaking
- ✅ **双格式支持** - 同时支持 ESM 和 CommonJS
- ✅ **测试覆盖** - 核心功能包含完整测试用例确保稳定性
- ✅ **轻量实现** - 核心功能保持轻量，避免不必要的复杂性

## 包概览

NX libs 包含以下几个独立的包：

| 包名                                                         | 描述                 | 版本 & NPM 链接                                                |
| ------------------------------------------------------------ | -------------------- | ---------------------------------------------------------------- |
| [`@nxlibs/typescript-config`](/packages/typescript-config) | 共享 TypeScript 配置 | [![npm](https://img.shields.io/npm/v/@nxlibs/typescript-config)](https://www.npmjs.com/package/@nxlibs/typescript-config) |
| [`@nxlibs/eslint-config`](/packages/eslint-config)         | 共享 ESLint 配置     | [![npm](https://img.shields.io/npm/v/@nxlibs/eslint-config)](https://www.npmjs.com/package/@nxlibs/eslint-config) |
| [`@nxlibs/format`](/packages/format)                       | 数字和日期格式化工具 | [![npm](https://img.shields.io/npm/v/@nxlibs/format)](https://www.npmjs.com/package/@nxlibs/format) |
| [`@nxlibs/prettier-config`](/packages/prettier-config)     | 共享 Prettier 配置   | [![npm](https://img.shields.io/npm/v/@nxlibs/prettier-config)](https://www.npmjs.com/package/@nxlibs/prettier-config) |

## 快速开始

安装你需要的包：

```bash
# 使用 npm
npm install @nxlibs/format

# 使用 yarn
yarn add @nxlibs/format

# 使用 pnpm
pnpm add @nxlibs/format
```

开始使用：

```typescript
import { formatDate, formatNumber } from '@nxlibs/format';

// 格式化数字
formatNumber(1234.56); // "1,234.56"

// 格式化日期
formatDate(new Date()); // "2023-04-25 14:30:45"
```

## 项目架构

NX libs 使用 monorepo 结构组织代码，基于以下原则设计：

1. **独立版本化** - 每个包可以独立发布和版本化
2. **共享配置** - 统一的代码规范和构建流程
3. **一致性体验** - 所有包遵循相同的 API 设计原则
4. **最小化依赖** - 避免不必要的外部依赖

## 贡献

我们欢迎社区贡献！无论是修复错误、改进文档还是添加新功能，请查看[贡献指南](/docs/guides/contributing)了解如何参与。

## 相关链接

- [GitHub 仓库](https://github.com/NexaraGroup/nx-libs)
- [问题反馈](https://github.com/NexaraGroup/nx-libs/issues)
