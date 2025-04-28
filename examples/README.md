# @nx-utils/format 示例组件

本目录包含了使用 `@nx-utils/format` 包的React示例组件，展示了如何在React应用中利用格式化功能。

## 组件概览

1. **NumberFormatting** - 数字格式化组件，提供交互式界面展示数字格式化功能
2. **DateFormatting** - 日期格式化组件，提供交互式界面展示日期格式化功能
3. **FormatExample** - 综合示例组件，包含数字和日期格式化演示，以及代码示例

## 使用方法

### 安装依赖

首先确保安装了必要的依赖：

```bash
npm install @nx-utils/format big.js dayjs
```

### 引入组件

```jsx
import FormatExample from './examples';
// 或者单独引入
import { NumberFormatting, DateFormatting } from './examples';
```

### 在页面中使用

```jsx
import React from 'react';
import FormatExample from './examples';

const DemoPage = () => {
  return (
    <div>
      <h1>格式化工具演示</h1>
      <FormatExample />
    </div>
  );
};

export default DemoPage;
```

### 单独使用数字格式化组件

```jsx
import React from 'react';
import { NumberFormatting } from './examples';

const NumberDemo = () => {
  return (
    <div>
      <h1>数字格式化演示</h1>
      <NumberFormatting initialValue={9876.54321} />
    </div>
  );
};

export default NumberDemo;
```

### 单独使用日期格式化组件

```jsx
import React from 'react';
import { DateFormatting } from './examples';

const DateDemo = () => {
  return (
    <div>
      <h1>日期格式化演示</h1>
      <DateFormatting initialDate={new Date(2023, 0, 1)} />
    </div>
  );
};

export default DateDemo;
```

## 组件属性

### NumberFormatting

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| initialValue | number | 12345.6789 | 初始数值 |

### DateFormatting

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| initialDate | Date | new Date() | 初始日期 |

## 自定义样式

组件使用了CSS模块，您可以通过覆盖以下类名来自定义样式：

- `.format-example` - 整体容器
- `.format-section` - 每个格式化部分的容器
- `.number-formatting` - 数字格式化组件容器
- `.date-formatting` - 日期格式化组件容器
- `.result` - 结果显示区域
- `.code-examples` - 代码示例区域 