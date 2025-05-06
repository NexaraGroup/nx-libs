---
sidebar_position: 3
---

# 快速开始

本指南将帮助你快速上手使用 NX libs 中的各个包。

## Format 包使用示例

### 数字格式化

```typescript
import { formatNumber } from '@nxlibs/format';

// 基本使用
formatNumber(1234.56); // "1,234.56"
formatNumber('1234.5600'); // "1,234.56"

// 处理无效输入
formatNumber('非数字'); // "-"
formatNumber(null); // "-"
formatNumber(undefined); // "-"

// 保留尾部的零
formatNumber(1234.56, {
	removeTrailingZeros: false,
}); // "1,234.5600"

// 不使用千分位分隔符
formatNumber(1234.56, {
	addThousandsSeparator: false,
}); // "1234.56"
```

### 日期格式化

```typescript
import { formatDate } from '@nxlibs/format';

// 基本使用
formatDate(new Date()); // "2023-04-25 14:30:45"
formatDate('2023-01-01'); // "2023-01-01 00:00:00"
formatDate(1672531200000); // "2023-01-01 00:00:00"

// 自定义格式
formatDate(new Date(), {
	format: 'YYYY年MM月DD日',
}); // "2023年04月25日"

formatDate(new Date(), {
	format: 'HH:mm:ss',
}); // "14:30:45"
```

## TypeScript 配置使用示例

1. 安装配置包：

```bash
npm install -D @nxlibs/typescript-config
```

2. 创建或编辑 `tsconfig.json` 文件，扩展共享配置：

```json
{
	"extends": "@nxlibs/typescript-config/base.json",
	"compilerOptions": {
		// 自定义选项...
		"rootDir": "src",
		"outDir": "dist"
	},
	"include": ["src/**/*.ts"],
	"exclude": ["node_modules", "dist"]
}
```

如果你在开发 React 应用，可以使用专门的 React 配置：

```json
{
	"extends": "@nxlibs/typescript-config/react-library.json"
	// 其他自定义配置...
}
```

对于 Next.js 项目：

```json
{
	"extends": "@nxlibs/typescript-config/nextjs.json"
	// 其他自定义配置...
}
```

## ESLint 配置使用示例

1. 安装配置包：

```bash
npm install -D @nxlibs/eslint-config
```

2. 创建或编辑 `.eslintrc.js` 文件：

```js
module.exports = {
	extends: ['@nxlibs/eslint-config/base'],
	// 自定义规则...
};
```

对于 React 项目：

```js
module.exports = {
	extends: ['@nxlibs/eslint-config/react'],
	// 自定义规则...
};
```

## Prettier 配置使用示例

1. 安装配置包：

```bash
npm install -D @nxlibs/prettier-config
```

2. 创建或编辑 `.prettierrc.js` 文件：

```js
module.exports = require('@nxlibs/prettier-config');
```

如果你需要自定义一些规则，可以合并配置：

```js
const baseConfig = require('@nxlibs/prettier-config');

module.exports = {
	...baseConfig,
	// 自定义规则...
	printWidth: 100,
	tabWidth: 2,
};
```

## 接下来

- 查看 [Format 包](/docs/packages/format) 了解更多数字和日期格式化功能
- 了解 [TypeScript 配置](/docs/packages/typescript-config) 的详细配置项
- 探索 [ESLint 配置](/docs/packages/eslint-config) 中包含的规则
- 查看 [Prettier 配置](/docs/packages/prettier-config) 的预设规则
