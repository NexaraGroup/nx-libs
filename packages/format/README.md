# @nxlibs/format

格式化工具集合，提供高质量的数字和日期格式化功能，专注于安全性、一致性和易用性。

## 特性

- ✅ **类型安全** - 完整的 TypeScript 类型定义
- ✅ **轻量级** - 最小依赖，支持 tree-shaking
- ✅ **双格式支持** - 同时支持 ESM 和 CommonJS
- ✅ **处理边缘情况** - 优雅处理无效输入
- ✅ **可定制化** - 灵活的格式化选项

## 安装

```bash
npm install @nxlibs/format
```

本包有两个对等依赖(peerDependencies)，需要同时安装：

```bash
npm install big.js dayjs
```

## 数字格式化

`formatNumber` 函数提供可靠且一致的数字格式化，使用 big.js 处理精度问题。

### 基本用法

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

### 自定义选项

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

### 数字格式化选项

| 选项                    | 类型      | 默认值 | 描述                 |
| ----------------------- | --------- | ------ | -------------------- |
| `removeTrailingZeros`   | `boolean` | `true` | 是否去除尾部的0      |
| `addThousandsSeparator` | `boolean` | `true` | 是否添加千分位分隔符 |

## 日期格式化

`formatDate` 函数提供强大而灵活的日期格式化能力，基于 dayjs 库。

### 基本用法

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

### 自定义格式

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

### 日期格式化选项

| 选项     | 类型     | 默认值                  | 描述                          |
| -------- | -------- | ----------------------- | ----------------------------- |
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

## 性能考虑

- **Tree Shaking** - 包支持tree-shaking，只使用需要的函数不会导入不必要的代码
- **对等依赖** - big.js 和 dayjs 作为对等依赖，避免重复安装
- **惰性计算** - 格式化仅在需要时执行

## 浏览器兼容性

包支持所有现代浏览器，以及 Node.js 环境。

## 贡献

欢迎贡献！请参考我们的贡献指南。

## 许可证

MIT
