---
sidebar_position: 2
---

# ESLint 配置

`@nxlibs/eslint-config` 提供了一套预配置的 ESLint 规则，帮助团队统一代码规范，减少配置开销。

## 安装

```bash
# npm
npm install --save-dev @nxlibs/eslint-config eslint

# pnpm
pnpm add -D @nxlibs/eslint-config eslint

# yarn
yarn add -D @nxlibs/eslint-config eslint
```

## 特性

- 分层设计：基础、React和Next.js三层配置
- TypeScript支持：针对TypeScript项目优化
- 导入排序：自动组织和格式化导入语句
- 与Prettier兼容：避免与代码格式化工具冲突
- 遵循最新的React和Next.js最佳实践

## 使用方法

### 基础配置（TypeScript项目）

适用于所有TypeScript项目的基础配置，包含TypeScript规则和导入排序。

```js
// .eslintrc.js
module.exports = {
	extends: ['@nxlibs/eslint-config'],
	// 或明确指定基础配置
	// extends: ['@nxlibs/eslint-config/base'],
	rules: {
		// 自定义规则
	},
};
```

### React配置

包含React、React Hooks和JSX可访问性规则。

```js
// .eslintrc.js
module.exports = {
	extends: ['@nxlibs/eslint-config/react'],
	rules: {
		// 自定义规则
	},
};
```

### Next.js配置

针对Next.js项目的专用配置，包含性能和最佳实践规则。

```js
// .eslintrc.js
module.exports = {
	extends: ['@nxlibs/eslint-config/next'],
	rules: {
		// 自定义规则
	},
};
```

## 配置层级关系

配置采用继承结构，确保规则的一致性和可扩展性：

```
base（基础） → react（React扩展） → next（Next.js扩展）
```

每个层级都专注于特定领域：

- `base`: 基础TypeScript语法和导入规则
- `react`: 继承`base`并添加React特定规则
- `next`: 继承`react`并添加Next.js特定规则

## 包含的主要规则

### 基础配置 (`base`)

- **TypeScript规则**

    - 警告使用`any`类型
    - 警告未使用的变量（忽略下划线开头的参数）
    - 允许非空断言操作符

- **导入排序规则**
    - 按分组排序：内置模块 → 外部依赖 → 内部模块 → 父级目录 → 同级目录 → 索引文件
    - 组间添加空行
    - 按字母顺序排序（忽略大小写）

### React配置 (`react`)

- **React核心规则**

    - 关闭`react/react-in-jsx-scope`（React 17+不需要导入React）
    - 关闭`react/prop-types`（使用TypeScript类型代替）
    - 禁止不必要的花括号

- **React Hooks规则**

    - 强制执行Hooks规则
    - 警告依赖数组不完整

- **可访问性规则**
    - 确保链接元素符合可访问性标准
    - 自定义组件也需遵循规则

### Next.js配置 (`next`)

- **Next.js优化规则**

    - 强制使用Next.js的Link组件
    - 鼓励使用Next.js的Image组件

- **性能优化**
    - 融合了`next/core-web-vitals`配置
    - 针对Next.js应用优化的导入排序

## 自定义配置

可以通过扩展现有配置并添加自己的规则：

```js
// .eslintrc.js
module.exports = {
	extends: ['@nxlibs/eslint-config/react'],
	rules: {
		// 覆盖内置规则
		'@typescript-eslint/no-explicit-any': 'error',

		// 添加自定义规则
		'no-console': ['warn', { allow: ['warn', 'error'] }],
	},
};
```

## 相关链接

- [GitHub仓库](https://github.com/NexaraGroup/nx-libs)
- [ESLint官方文档](https://eslint.org/docs/latest/)
