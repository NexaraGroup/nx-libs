---
sidebar_position: 3
---

# Prettier 配置

`@nxlibs/prettier-config` 提供共享的 Prettier 配置，帮助团队保持一致的代码格式风格。

[![npm version](https://img.shields.io/npm/v/@nxlibs/prettier-config)](https://www.npmjs.com/package/@nxlibs/prettier-config)
[![npm downloads](https://img.shields.io/npm/dm/@nxlibs/prettier-config)](https://www.npmjs.com/package/@nxlibs/prettier-config)

## 安装

```bash
# npm
npm install --save-dev @nxlibs/prettier-config prettier

# pnpm
pnpm add -D @nxlibs/prettier-config prettier

# yarn
yarn add -D @nxlibs/prettier-config prettier
```

## 使用方法

在项目中，有以下几种配置方式：

### 方法一：在 package.json 中引用

最简单的方式是在 `package.json` 中添加：

```json
{
	"prettier": "@nxlibs/prettier-config"
}
```

### 方法二：在 .prettierrc.js 中引用

如果需要扩展配置，可以在 `.prettierrc.js` 中引用：

```js
module.exports = {
	...require('@nxlibs/prettier-config'),
	// 在这里可以添加自定义配置来覆盖默认设置
	semi: true,
};
```

## 配置详情

默认配置包含以下规则：

- 使用单引号 (`singleQuote: true`)
- 对象属性名如果有引号则保留 (`quoteProps: 'preserve'`)
- 使用尾逗号 (`trailingComma: 'all'`)
- 一行最多100个字符 (`printWidth: 100`)
- 使用制表符缩进 (`useTabs: true`)
- 不使用分号 (`semi: false`)
- 箭头函数参数始终使用括号 (`arrowParens: 'always'`)
- 自动进行导入排序

## 包含的插件

配置集成了以下插件：

- **@ianvs/prettier-plugin-sort-imports** - 用于排序导入语句，确保导入语句的一致性和可读性
- **prettier-plugin-packagejson** - 用于格式化package.json文件，保持字段顺序一致

## 与其他工具集成

### 与 ESLint 集成

为了避免 ESLint 和 Prettier 冲突，推荐使用 `eslint-config-prettier`：

```bash
npm install --save-dev eslint-config-prettier
```

然后在你的 ESLint 配置中添加：

```json
{
	"extends": [
		// 其他扩展...
		"prettier" // 必须放在最后
	]
}
```

### 与编辑器集成

#### VS Code

1. 安装 Prettier 扩展
2. 设置为默认格式化程序
3. 配置保存时自动格式化：

```json
{
	"editor.defaultFormatter": "esbenp.prettier-vscode",
	"editor.formatOnSave": true
}
```

#### WebStorm/IntelliJ IDEA

1. 安装 Prettier 插件
2. 在设置中启用 Prettier 集成
3. 配置保存时自动格式化

## 自定义配置示例

如果你需要根据项目特定需求自定义配置：

```js
// .prettierrc.js
module.exports = {
	...require('@nxlibs/prettier-config'),

	// 根据项目需要覆盖配置
	semi: true, // 使用分号
	tabWidth: 4, // 使用4个空格缩进
	printWidth: 120, // 增加行宽
	useTabs: false, // 使用空格而非制表符
};
```

## 相关链接

- [GitHub仓库](https://github.com/NexaraGroup/nx-libs)
- [Prettier官方文档](https://prettier.io/docs/en/)

---

## 📋 更新历史

<details>
<summary>点击查看完整更新记录</summary>

### 1.0.0 (2024)

**Major Changes**

- 🎉 **首次发布** - 初始版本发布
- 🎨 **代码格式化** - 提供统一的代码格式化规则
- 📦 **插件集成** - 包含导入排序和 package.json 格式化插件
- ⚙️ **灵活配置** - 支持项目级别的自定义覆盖
- 🔧 **编辑器集成** - 与主流编辑器无缝集成

</details>
