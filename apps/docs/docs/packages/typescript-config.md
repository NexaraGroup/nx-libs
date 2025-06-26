---
sidebar_position: 1
---

# TypeScript 配置

`@nxlibs/typescript-config` 提供了一组优化的 TypeScript 配置，简化项目设置并统一代码规范。

[![npm version](https://img.shields.io/npm/v/@nxlibs/typescript-config)](https://www.npmjs.com/package/@nxlibs/typescript-config)
[![npm downloads](https://img.shields.io/npm/dm/@nxlibs/typescript-config)](https://www.npmjs.com/package/@nxlibs/typescript-config)

## 安装

```bash
# npm
npm install --save-dev @nxlibs/typescript-config

# pnpm
pnpm add -D @nxlibs/typescript-config

# yarn
yarn add -D @nxlibs/typescript-config
```

## 可用配置

### 基础配置 (`base.json`)

通用的 TypeScript 配置，适用于大多数项目，采用现代 TypeScript 最佳实践。

```json
{
	"extends": "@nxlibs/typescript-config/base.json"
}
```

### React 配置 (`react.json`)

为 React 库和应用程序定制的配置，扩展了基础配置并添加了 React 特定的设置。

```json
{
	"extends": "@nxlibs/typescript-config/react.json"
}
```

### Next.js 配置 (`nextjs.json`)

专门为 Next.js 应用程序优化的配置，基于 Next.js 官方推荐的配置，扩展了 React 配置。

```json
{
	"extends": "@nxlibs/typescript-config/nextjs.json"
}
```

### 通用库配置 (`library.json`)

独立的完整配置，专为开发 JavaScript/TypeScript 库设计，支持 Node.js 和 ESM 环境，适合创建发布到 npm 的包。

```json
{
	"extends": "@nxlibs/typescript-config/library.json"
}
```

## 使用方法

1. 在你的项目中创建 `tsconfig.json` 文件
2. 使用 `extends` 字段引用所需的配置
3. 根据需要添加项目特定的配置

### 示例

基础项目示例：

```json
{
	"extends": "@nxlibs/typescript-config/base.json",
	"compilerOptions": {
		"rootDir": "src",
		"outDir": "dist"
	},
	"include": ["src/**/*.ts"],
	"exclude": ["node_modules", "dist"]
}
```

React 项目示例：

```json
{
	"extends": "@nxlibs/typescript-config/react.json",
	"compilerOptions": {
		"baseUrl": ".",
		"paths": {
			"@components/*": ["src/components/*"],
			"@hooks/*": ["src/hooks/*"]
		}
	},
	"include": ["src/**/*.ts", "src/**/*.tsx"],
	"exclude": ["node_modules", "dist"]
}
```

Next.js 项目示例：

```json
{
	"extends": "@nxlibs/typescript-config/nextjs.json",
	"include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
	"exclude": ["node_modules"]
}
```

TypeScript 库示例：

```json
{
	"extends": "@nxlibs/typescript-config/library.json",
	"compilerOptions": {
		"paths": {
			"@/*": ["./src/*"]
		}
	}
}
```

## 核心配置特性

### 基础、React 和 Next.js 配置特性

- **现代目标** - 使用 `ES2022` 作为编译目标
- **严格类型检查** - 启用 `strict: true` 和其他增强类型安全的选项
- **优化性能** - 启用 `incremental` 和 `skipLibCheck` 提高构建速度
- **打包工具友好** - 使用 `noEmit: true`，配合现代构建工具工作
- **路径解析** - 支持模块解析和 JSON 导入等现代特性

### 库配置特性

`library.json` 配置专为库开发优化，是一个独立的完整配置：

- **双环境支持** - 使用 `module: "NodeNext"` 同时支持 Node.js 和 ESM 环境
- **智能模块解析** - `moduleResolution: "NodeNext"` 处理现代 package.json 的 exports 字段
- **输出控制** - 生成 JavaScript 文件、声明文件和源码映射
- **类型声明支持** - 自动生成 `.d.ts` 文件，便于在 TypeScript 项目中使用
- **更好的兼容性** - 使用 ES2019 目标确保广泛兼容性
- **全面类型检查** - 包含全套严格模式设置，确保类型安全

## 自定义

如果这些预设配置不能完全满足你的需求，你可以根据项目要求进行覆盖或扩展：

```json
{
	"extends": "@nxlibs/typescript-config/base.json",
	"compilerOptions": {
		// 自定义配置
		"target": "ES2020", // 修改目标
		"strictNullChecks": false, // 放宽某些严格检查
		"experimentalDecorators": true // 添加实验特性
	}
}
```

## 库开发最佳实践

使用 `library.json` 配置时，推荐的完整工作流程：

```json
// package.json
{
	"scripts": {
		"build": "tsup src/index.ts --format esm,cjs --dts",
		"typecheck": "tsc --noEmit"
	},
	"main": "dist/index.js", // CommonJS 入口
	"module": "dist/index.mjs", // ESM 入口
	"types": "dist/index.d.ts", // 类型声明
	"exports": {
		// 条件导出
		".": {
			"import": "./dist/index.mjs",
			"require": "./dist/index.js",
			"types": "./dist/index.d.ts"
		}
	}
}
```

这种设置可以确保你的库在各种环境中都能良好工作，同时提供完整的类型支持。

## 相关链接

- [GitHub仓库](https://github.com/NexaraGroup/nx-libs)
- [TypeScript官方文档](https://www.typescriptlang.org/docs/)

---

## 📋 更新历史

<details>
<summary>点击查看完整更新记录</summary>

### 1.0.3 (2024)

**Patch Changes**

- 🏷️ **包名称修正** - 修改了 tsconfig 的内部包名称，提升一致性

### 1.0.2 (2024)

**Patch Changes**

- 🗂️ **配置优化** - 移除 base 配置中的 dist 排除路径
- 🚀 **Next.js 配置改进** - 去除 next 默认的别名及相关路径配置，减少配置复杂度

### 1.0.1 (2024)

**Patch Changes**

- 🔧 **配置调整** - 调整部分 TypeScript 配置项
- 📝 **文档完善** - 补充和完善 README 文档说明
- 🎯 **最佳实践** - 遵循现代 TypeScript 最佳实践

### 1.0.0 (2024)

**Major Changes**

- 🎉 **首次发布** - 初始版本发布
- 🔧 **多种配置** - 提供 base、react、nextjs、library 四种配置
- 🎯 **现代目标** - 使用 ES2022 作为编译目标
- 🛡️ **严格检查** - 启用 strict 模式和增强类型安全
- ⚡ **性能优化** - 启用增量构建和 skipLibCheck

</details>
