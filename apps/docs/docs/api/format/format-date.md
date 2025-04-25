---
sidebar_position: 2
---

# formatDate

格式化日期为指定格式的字符串。

## 导入方式

```typescript
import { formatDate } from '@nx-utils/format';
```

## 签名

```typescript
function formatDate(
  value: Date | string | number | null | undefined,
  format = 'YYYY-MM-DD',
  options?: FormatDateOptions
): string;

interface FormatDateOptions {
  /**
   * 当值为空时返回的默认值
   * @default '-'
   */
  defaultValue?: string;
}
```

## 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| `value` | `Date \| string \| number \| null \| undefined` | 要格式化的日期值 |
| `format` | `string` | 格式模板，默认为 'YYYY-MM-DD' |
| `options` | `FormatDateOptions` | 可选的格式化选项 |

### 格式字符串

支持以下格式标记:

| 格式 | 输出 | 描述 |
|------|------|------|
| `YYYY` | `2022` | 4位年份 |
| `YY` | `22` | 2位年份 |
| `MM` | `01`-`12` | 月份，两位数字 |
| `M` | `1`-`12` | 月份，不补零 |
| `DD` | `01`-`31` | 日期，两位数字 |
| `D` | `1`-`31` | 日期，不补零 |
| `HH` | `00`-`23` | 小时，两位数字（24小时制） |
| `H` | `0`-`23` | 小时，不补零（24小时制） |
| `hh` | `01`-`12` | 小时，两位数字（12小时制） |
| `h` | `1`-`12` | 小时，不补零（12小时制） |
| `mm` | `00`-`59` | 分钟，两位数字 |
| `m` | `0`-`59` | 分钟，不补零 |
| `ss` | `00`-`59` | 秒，两位数字 |
| `s` | `0`-`59` | 秒，不补零 |
| `SSS` | `000`-`999` | 毫秒，三位数字 |
| `A` | `AM`/`PM` | 上午/下午（大写） |
| `a` | `am`/`pm` | 上午/下午（小写） |
| `Q` | `1`-`4` | 季度 |
| `Do` | `1st`, `2nd`, `3rd`... | 带序数词的日期 |

### options.defaultValue

`string`, 默认值: `'-'`

当输入值为 `null` 或 `undefined` 时返回的默认值。

## 返回值

`string`

格式化后的日期字符串。如果输入值无效（如无法解析为日期），则返回默认值。

## 示例

### 基本使用

```typescript
const date = new Date('2023-05-15T14:30:45.123Z');

formatDate(date);                         // "2023-05-15"
formatDate(date, 'YYYY/MM/DD');           // "2023/05/15"
formatDate(date, 'DD/MM/YYYY');           // "15/05/2023"
formatDate(date, 'YYYY-MM-DD HH:mm:ss');  // "2023-05-15 14:30:45"
formatDate(date, 'HH:mm');                // "14:30"
```

### 使用不同的输入类型

```typescript
// 字符串日期
formatDate('2023-05-15');                 // "2023-05-15"

// 时间戳（毫秒）
formatDate(1684161045123);                // "2023-05-15"

// ISO格式字符串
formatDate('2023-05-15T14:30:45.123Z');   // "2023-05-15"
```

### 处理无效输入

```typescript
formatDate(null);                         // "-"
formatDate(undefined);                    // "-"
formatDate('not a date');                 // "-"

// 自定义默认值
formatDate(null, 'YYYY-MM-DD', { 
  defaultValue: 'N/A' 
});                                       // "N/A"
```

### 使用特殊格式

```typescript
const date = new Date('2023-05-15T14:30:45.123Z');

// 12小时制
formatDate(date, 'hh:mm A');              // "02:30 PM"

// 带毫秒
formatDate(date, 'HH:mm:ss.SSS');         // "14:30:45.123"

// 季度
formatDate(date, 'YYYY年Q季度');           // "2023年2季度"

// 序数日期
formatDate(date, 'Do MMMM YYYY');         // "15th May 2023"

// 自定义格式
formatDate(date, 'YYYY年MM月DD日 HH时mm分'); // "2023年05月15日 14时30分"
```

## 实现细节

- 内部使用 `dayjs` 库处理日期格式化
- 自动处理无效日期输入，返回默认值
- 支持多种日期输入格式：`Date` 对象、时间戳、日期字符串

## 最佳实践

- 使用 ISO 标准格式（YYYY-MM-DD）以保持跨区域一致性
- 对于用户界面显示，根据区域习惯选择合适的格式
- 处理用户输入的日期时，提供清晰的格式指示

## 相关函数

- [formatNumber](/api/format/format-number) - 格式化数字 