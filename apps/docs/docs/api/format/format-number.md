---
sidebar_position: 1
---

# formatNumber

格式化数字为带千分位、处理尾部零的字符串。

## 导入方式

```typescript
import { formatNumber } from '@nx-utils/format';
```

## 签名

```typescript
function formatNumber(
  value: unknown,
  options?: FormatNumberOptions
): string;

interface FormatNumberOptions {
  /**
   * 是否去除尾部的0
   * @default true
   */
  removeTrailingZeros?: boolean;

  /**
   * 是否添加千分位分隔符
   * @default true
   */
  addThousandsSeparator?: boolean;
}
```

## 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| `value` | `unknown` | 要格式化的值，可以是数字或字符串 |
| `options` | `FormatNumberOptions` | 可选的格式化选项 |

### options.removeTrailingZeros

`boolean`, 默认值: `true`

控制是否移除小数部分末尾的零。

- 设为 `true`：移除末尾的零，如 "1.2300" 会格式化为 "1.23"
- 设为 `false`：保留末尾的零，如 "1.2300" 会格式化为 "1.2300"

### options.addThousandsSeparator

`boolean`, 默认值: `true`

控制是否添加千分位分隔符。

- 设为 `true`：添加千分位分隔符，如 "1234.56" 会格式化为 "1,234.56"
- 设为 `false`：不添加千分位分隔符，如 "1234.56" 会格式化为 "1234.56"

## 返回值

`string`

格式化后的字符串。如果输入值无效（非数字或无法解析为数字），则返回 "-"。

## 示例

### 基本使用

```typescript
formatNumber(1234.5);          // "1,234.5"
formatNumber("1234.5");        // "1,234.5"
formatNumber(1234.50);         // "1,234.5" (默认去除尾部的0)
formatNumber(1234);            // "1,234"
```

### 处理无效输入

```typescript
formatNumber("abc");          // "-"
formatNumber(null);           // "-"
formatNumber(undefined);      // "-"
formatNumber(NaN);            // "-"
formatNumber(Infinity);       // "-"
```

### 自定义选项

```typescript
// 保留尾部的零
formatNumber(1234.5000, { 
  removeTrailingZeros: false 
}); // "1,234.5000"

// 不使用千分位分隔符
formatNumber(1234.5, { 
  addThousandsSeparator: false 
}); // "1234.5"

// 组合选项
formatNumber(1234.5000, { 
  removeTrailingZeros: false, 
  addThousandsSeparator: false 
}); // "1234.5000"
```

### 精度处理

```typescript
// 处理浮点数精度问题
formatNumber(0.1 + 0.2);      // "0.3"
formatNumber(0.1 + 0.7);      // "0.8"
```

## 实现细节

- 使用 `big.js` 处理数字精度问题
- 对于非数字或无效输入，返回 "-"
- 自动处理浮点数精度问题，避免输出类似 "0.30000000000000004" 的结果

## 最佳实践

- 处理金融数据时使用 `formatNumber` 避免浮点数精度问题
- 对用户输入的数据使用此函数进行格式化
- 使用选项定制输出格式以满足不同的展示需求

## 相关函数

- [formatDate](/api/format/format-date) - 格式化日期 