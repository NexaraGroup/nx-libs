---
sidebar_position: 2
---

# 快速开始

欢迎使用 NX libs！本指南将帮助你快速上手我们的工具包。

## 💡 什么是 NX libs？

NX libs 是一个现代前端工具库集合，专注于提供类型安全、轻量且易用的解决方案。每个包都独立发布，可按需引入。

## 📦 选择你需要的包

根据项目需求选择相应的包：

### 🔧 开发工具配置

如果你正在搭建新项目或规范现有项目：

```bash
# TypeScript 配置 (v1.0.3)
pnpm add -D @nxlibs/typescript-config

# ESLint 配置 (v1.0.2) 
pnpm add -D @nxlibs/eslint-config

# Prettier 配置 (v1.0.0)
pnpm add -D @nxlibs/prettier-config
```

### 🛠️ 实用工具

如果你需要可靠的格式化功能：

```bash
# 格式化工具 (v1.0.1)
pnpm add @nxlibs/format
```

## 🚀 基础配置示例

### TypeScript 项目设置

1. **创建 `tsconfig.json`**:

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

2. **创建 `.eslintrc.js`**:

```js
module.exports = {
	extends: ['@nxlibs/eslint-config'],
	rules: {
		// 你的自定义规则
	},
};
```

3. **配置 Prettier** (在 `package.json` 中):

```json
{
	"prettier": "@nxlibs/prettier-config"
}
```

### React 项目设置

1. **React TypeScript 配置**:

```json
{
	"extends": "@nxlibs/typescript-config/react.json",
	"include": ["src/**/*.ts", "src/**/*.tsx"]
}
```

2. **React ESLint 配置**:

```js
module.exports = {
	extends: ['@nxlibs/eslint-config/react'],
};
```

### Next.js 项目设置

1. **Next.js TypeScript 配置**:

```json
{
	"extends": "@nxlibs/typescript-config/nextjs.json",
	"include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"]
}
```

2. **Next.js ESLint 配置**:

```js
module.exports = {
	extends: ['@nxlibs/eslint-config/next'],
};
```

## 🎯 实用工具使用

### 格式化工具

```typescript
import { formatNumber, formatDate } from '@nxlibs/format';

// 数字格式化
const price = formatNumber(1234.56); // "1,234.56"
const amount = formatNumber('999.999'); // "999.999"

// 日期格式化  
const now = formatDate(new Date()); // "2024-01-15 14:30:25"
const custom = formatDate(new Date(), { 
	format: 'YYYY年MM月DD日' 
}); // "2024年01月15日"
```

## ✅ 测试支持

我们的包都包含完整的测试覆盖：

- **@nxlibs/format** - 包含 `formatNumber` 和 `formatDate` 的完整单元测试
- **配置包** - 经过实际项目验证，确保配置正确性

你可以在项目中安全使用，所有核心功能都有测试保障。

## 🔄 版本管理

我们使用语义化版本管理，每次更新都有详细的 CHANGELOG：

- **主版本** - 破坏性变更
- **次版本** - 新功能添加
- **修订版本** - 错误修复和优化

查看各包的详细更新历史：
- [format 更新记录](/packages/format#更新历史)
- [eslint-config 更新记录](/packages/eslint-config#更新历史)  
- [typescript-config 更新记录](/packages/typescript-config#更新历史)

## 📝 下一步

- 查看 [包文档](/packages/typescript-config) 了解详细配置选项
- 阅读 [贡献指南](/docs/guides/contributing) 参与开发
- 访问 [monorepo 结构](/docs/guides/monorepo-structure) 了解项目架构

## 🆘 获取帮助

遇到问题？

1. 查看各包的详细文档
2. 搜索 [GitHub Issues](https://github.com/NexaraGroup/nx-libs/issues)
3. 提交新的 issue 或 PR

我们欢迎任何形式的贡献和反馈！
