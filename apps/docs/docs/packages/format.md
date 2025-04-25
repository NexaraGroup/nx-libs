---
sidebar_position: 1
---

# Format 包

`@nx-utils/format` 提供了高质量、类型安全的格式化工具，专注于数字和日期格式化。

## 安装

```bash
npm install @nx-utils/format
```

注意：本包有以下对等依赖(peerDependencies)：

```bash
npm install big.js dayjs
```

## 特性

- 数字格式化 - 处理千分位、小数位等
- 日期格式化 - 灵活的日期时间格式化
- 类型安全 - 完全的 TypeScript 类型支持
- 输入容错 - 优雅地处理各种边缘情况
- 轻量级 - 支持 tree-shaking，仅打包你使用的功能

## 数字格式化

`formatNumber` 函数提供了一种简单而强大的方式来格式化数字。

### 基本使用

```typescript
import { formatNumber } from '@nx-utils/format';

// 基本使用
formatNumber(1234.5600);  // "1,234.56"
formatNumber('1234.5600');  // "1,234.56"
```

### 处理无效输入

```typescript
// 所有这些情况都返回 "-"
formatNumber('非数字');
formatNumber(null);
formatNumber(undefined);
formatNumber(NaN);
formatNumber(Infinity);
```

### 精度处理

使用 big.js 处理 JavaScript 浮点数精度问题：

```typescript
formatNumber(0.1 + 0.2);  // "0.3" 而不是 "0.30000000000000004"
```

### 自定义选项

```typescript
// 保留尾部的零
formatNumber(1234.5600, { 
  removeTrailingZeros: false 
});  // "1,234.5600"

// 不使用千分位分隔符
formatNumber(1234.5600, { 
  addThousandsSeparator: false 
});  // "1234.56"

// 组合选项
formatNumber(1234.5600, { 
  removeTrailingZeros: false, 
  addThousandsSeparator: false 
});  // "1234.5600"
```

### 选项说明

| 选项 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| `removeTrailingZeros` | `boolean` | `true` | 是否去除尾部的0 |
| `addThousandsSeparator` | `boolean` | `true` | 是否添加千分位分隔符 |

## 日期格式化

`formatDate` 函数提供了灵活的日期时间格式化能力。

### 基本使用

```typescript
import { formatDate } from '@nx-utils/format';

// 当前日期
formatDate(new Date());  // "2023-04-25 14:30:45"

// 支持多种输入格式
formatDate('2023-01-01');  // "2023-01-01 00:00:00"
formatDate(1672531200000);  // "2023-01-01 00:00:00"
formatDate('1672531200000');  // "2023-01-01 00:00:00"
```

### 自定义格式

```typescript
// 年月日
formatDate(new Date(), { 
  format: 'YYYY年MM月DD日' 
});  // "2023年04月25日"

// 不同地区格式
formatDate(new Date(), { 
  format: 'MM/DD/YYYY' 
});  // "04/25/2023"

// 仅日期
formatDate(new Date(), { 
  format: 'YYYY-MM-DD' 
});  // "2023-04-25"

// 仅时间
formatDate(new Date(), { 
  format: 'HH:mm:ss' 
});  // "14:30:45"
```

### 选项说明

| 选项 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| `format` | `string` | `"YYYY-MM-DD HH:mm:ss"` | 日期格式，支持 dayjs 的所有格式 |

### 常用格式说明

- `YYYY` - 四位数年份
- `MM` - 两位数月份
- `DD` - 两位数日期
- `HH` - 两位数小时（24小时制）
- `mm` - 两位数分钟
- `ss` - 两位数秒钟

更多格式选项参考 [dayjs 文档](https://day.js.org/docs/en/display/format)。

## 类型定义

Format 包提供完整的 TypeScript 类型定义：

```typescript
interface FormatNumberOptions {
  removeTrailingZeros?: boolean;
  addThousandsSeparator?: boolean;
}

interface FormatDateOptions {
  format?: string;
}

declare function formatNumber(
  value: unknown, 
  options?: FormatNumberOptions
): string;

declare function formatDate(
  value: unknown, 
  options?: FormatDateOptions
): string;
```

## 实现细节

- 使用 `big.js` 处理数字精度问题
- 使用 `dayjs` 提供强大的日期格式化能力
- 所有函数都提供防御性编程，确保不会因无效输入而抛出异常
- 支持 tree-shaking，您可以只使用需要的函数

## 最佳实践

- 对所有用户输入使用 `formatNumber` 和 `formatDate` 进行格式化
- 利用类型系统确保正确使用选项
- 在处理金融数据时，总是使用 `formatNumber` 以避免浮点数精度问题 