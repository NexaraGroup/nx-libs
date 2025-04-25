# TypeScript 配置

本包提供了一组经过优化的 TypeScript 配置，用于简化项目中的 TypeScript 设置和统一代码规范。

## 可用配置

### 基础配置 (`base.json`)

通用的 TypeScript 配置，适用于大多数项目，采用了现代 TypeScript 最佳实践。

```json
{
  "extends": "@repo/typescript-config/base.json"
}
```

### React 库配置 (`react-library.json`)

为 React 库和应用程序定制的配置，扩展了基础配置并添加了 React 特定的设置。

```json
{
  "extends": "@repo/typescript-config/react-library.json"
}
```

### Next.js 配置 (`nextjs.json`)

专门为 Next.js 应用程序优化的配置，基于 Next.js 官方推荐的配置，扩展了 React 配置。

```json
{
  "extends": "@repo/typescript-config/nextjs.json"
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
  "extends": "@repo/typescript-config/base.json",
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
  "extends": "@repo/typescript-config/react-library.json",
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
  "extends": "@repo/typescript-config/nextjs.json",
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}
```

## 核心配置特性

所有配置都采用以下关键特性：

- **现代目标** - 使用 `ES2022` 作为编译目标，支持较新的 JavaScript 特性
- **严格类型检查** - 启用 `strict: true` 和其他增强类型安全的选项
- **优化性能** - 启用 `incremental` 和 `skipLibCheck` 提高构建速度
- **打包工具友好** - 使用 `noEmit: true`，配合现代构建工具工作
- **路径解析** - 支持模块解析和 JSON 导入等现代特性

## 注意事项

- 配置已针对现代开发环境和工具链优化
- `base.json` 中的设置适合大多数项目，仅在必要时覆盖特定选项
- Next.js 配置使用 `jsx: "preserve"` 以允许 Next.js 自己处理 JSX 转换

## 自定义

如果这些预设配置不能完全满足你的需求，你可以根据项目要求进行覆盖或扩展。例如：

```json
{
  "extends": "@repo/typescript-config/base.json",
  "compilerOptions": {
    // 你的自定义配置...
    "target": "ES2020",            // 降级目标
    "strictNullChecks": false,     // 放宽某些严格检查
    "experimentalDecorators": true // 添加实验特性
  }
}
``` 