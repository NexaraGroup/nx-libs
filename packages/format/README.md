# @repo/format

格式化工具集合，包含数字格式化和日期格式化功能。

## 安装

```bash
npm install @repo/format
```

注意：本包依赖 `big.js` 和 `dayjs`，需要安装为依赖：

```bash
npm install big.js dayjs
```

## 数字格式化

```ts
import { formatNumber } from '@repo/format';

// 基本使用
formatNumber(1234.5600); // 返回 "1,234.56"
formatNumber('1234.5600'); // 返回 "1,234.56"
formatNumber('非数字'); // 返回 "-"
formatNumber({}); // 返回 "-"

// 自定义选项
formatNumber(1234.5600, { removeTrailingZeros: false }); // 返回 "1,234.5600"
formatNumber(1234.5600, { addThousandsSeparator: false }); // 返回 "1234.56"
formatNumber(1234.5600, { 
  removeTrailingZeros: false, 
  addThousandsSeparator: false 
}); // 返回 "1234.5600"
```

### 数字格式化选项

| 选项 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| `removeTrailingZeros` | `boolean` | `true` | 是否去除尾部的0 |
| `addThousandsSeparator` | `boolean` | `true` | 是否添加千分位分隔符 |

## 日期格式化

```ts
import { formatDate } from '@repo/format';

// 基本使用
formatDate(new Date()); // 返回当前日期，格式为 "YYYY-MM-DD HH:mm:ss"
formatDate('2023-01-01'); // 返回 "2023-01-01 00:00:00"
formatDate(1672531200000); // 返回 "2023-01-01 00:00:00"
formatDate('1672531200000'); // 返回 "2023-01-01 00:00:00"，会自动识别数字字符串时间戳
formatDate('无效日期'); // 返回 "-"

// 自定义格式
formatDate(new Date(), { format: 'YYYY年MM月DD日' }); // 返回 "2023年01月01日"
formatDate(new Date(), { format: 'MM/DD/YYYY' }); // 返回 "01/01/2023"
```

### 日期格式化选项

| 选项 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| `format` | `string` | `"YYYY-MM-DD HH:mm:ss"` | 日期格式，支持dayjs的所有格式 |

## 格式说明

日期格式使用 dayjs 的格式化规则，常用格式有：

- `YYYY`: 四位数年份
- `MM`: 两位数月份
- `DD`: 两位数日期
- `HH`: 两位数小时（24小时制）
- `mm`: 两位数分钟
- `ss`: 两位数秒钟

更多格式请参考 [dayjs 文档](https://day.js.org/docs/en/display/format)。 