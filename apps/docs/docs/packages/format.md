---
sidebar_position: 4
---

# 格式化工具

`@nxlibs/format` 提供可靠的数字和日期格式化功能，专注于类型安全和易用性。

[![npm version](https://img.shields.io/npm/v/@nxlibs/format)](https://www.npmjs.com/package/@nxlibs/format)
[![npm downloads](https://img.shields.io/npm/dm/@nxlibs/format)](https://www.npmjs.com/package/@nxlibs/format)

## 安装

```bash
# npm
npm install @nxlibs/format

# pnpm
pnpm add @nxlibs/format

# yarn
yarn add @nxlibs/format
```

同时需要安装对等依赖：

```bash
npm install big.js dayjs
```

## 功能概览

### 数字格式化

`formatNumber` 函数提供可靠且一致的数字格式化，使用 big.js 处理精度问题。

```ts
import { formatNumber } from '@nxlibs/format';

// 基本使用
formatNumber(1234.56); // "1,234.56"
formatNumber('1234.5600'); // "1,234.56"

// 处理无效输入
formatNumber('非数字'); // "-"
formatNumber({}); // "-"
formatNumber(NaN); // "-"
formatNumber(Infinity); // "-"

// 处理精度问题
formatNumber(0.1 + 0.2); // "0.3" (而不是 "0.30000000000000004")
```

### 日期格式化

`formatDate` 函数提供灵活的日期格式化能力，基于 dayjs 库实现。

```ts
import { formatDate } from '@nxlibs/format';

// 当前日期
formatDate(new Date()); // "2023-06-15 14:30:25"

// 支持多种输入格式
formatDate('2023-01-01'); // "2023-01-01 00:00:00"
formatDate(1672531200000); // "2023-01-01 00:00:00"
formatDate('1672531200000'); // "2023-01-01 00:00:00"

// 处理无效输入
formatDate('无效日期'); // "-"
formatDate(null); // "-"
```

## 详细 API

### formatNumber

格式化数字为字符串表示形式，处理精度问题和边缘情况。

#### 参数

```ts
function formatNumber(
	value: number | string | unknown,
	options?: {
		removeTrailingZeros?: boolean;
		addThousandsSeparator?: boolean;
	},
): string;
```

- `value`: 要格式化的数字或数字字符串
- `options`: 可选配置
    - `removeTrailingZeros`: 是否去除尾部的0（默认为`true`）
    - `addThousandsSeparator`: 是否添加千分位分隔符（默认为`true`）

#### 自定义选项示例

```ts
// 保留尾部的零
formatNumber(1234.56, {
	removeTrailingZeros: false,
}); // "1,234.5600"

// 不使用千分位分隔符
formatNumber(1234.56, {
	addThousandsSeparator: false,
}); // "1234.56"

// 组合选项
formatNumber(1234.56, {
	removeTrailingZeros: false,
	addThousandsSeparator: false,
}); // "1234.5600"
```

### formatDate

将日期或时间戳格式化为指定格式的字符串。

#### 参数

```ts
function formatDate(
	value: Date | string | number | unknown,
	options?: {
		format?: string;
	},
): string;
```

- `value`: 要格式化的日期、时间戳或日期字符串
- `options`: 可选配置
    - `format`: 日期格式字符串（默认为`"YYYY-MM-DD HH:mm:ss"`）

#### 自定义格式示例

```ts
// 年月日
formatDate(new Date(), {
	format: 'YYYY年MM月DD日',
}); // "2023年01月01日"

// 不同地区格式
formatDate(new Date(), {
	format: 'MM/DD/YYYY',
}); // "01/01/2023"

// 仅日期部分
formatDate(new Date(), {
	format: 'YYYY-MM-DD',
}); // "2023-01-01"

// 仅时间部分
formatDate(new Date(), {
	format: 'HH:mm:ss',
}); // "14:30:25"
```

## 格式说明

日期格式使用 dayjs 的格式化规则，常用格式有：

- `YYYY`: 四位数年份
- `MM`: 两位数月份
- `DD`: 两位数日期
- `HH`: 两位数小时（24小时制）
- `mm`: 两位数分钟
- `ss`: 两位数秒钟

## 设计特点

- **类型安全** - 完整的 TypeScript 类型定义
- **轻量级** - 最小依赖，支持 tree-shaking
- **双格式支持** - 同时支持 ESM 和 CommonJS
- **处理边缘情况** - 优雅处理无效输入
- **可定制化** - 灵活的格式化选项
- **测试覆盖** - 包含完整的单元测试，确保功能稳定性

## 相关链接

- [问题反馈](https://github.com/NexaraGroup/nx-libs/issues)
- [big.js](https://github.com/MikeMcl/big.js/) - 用于精确数值计算
- [dayjs](https://day.js.org/) - 用于日期处理和格式化

---

## 📋 更新历史

<details>
<summary>点击查看完整更新记录</summary>

### 1.0.1 (2024)

**Patch Changes**

- ✅ **测试覆盖率提升** - 新增 `formatDate` 和 `formatNumber` 函数的完整单元测试
- 🔧 **实现逻辑优化** - 调整部分实现逻辑，提升性能和可靠性  
- 📝 **ESLint 适配** - 适配 workspace 下的 ESLint 分组配置，提升代码质量

### 1.0.0 (2024)

**Major Changes**

- 🎉 **首次发布** - 初始版本发布
- 🔢 **数字格式化** - 支持千分位分隔符、精度处理
- 📅 **日期格式化** - 灵活的日期格式化选项
- 🛡️ **类型安全** - 完整的 TypeScript 类型定义
- 📦 **双格式支持** - 同时支持 ESM 和 CommonJS

</details>
