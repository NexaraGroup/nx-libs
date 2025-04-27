---
sidebar_position: 2
---

# TypeScript 配置

`@nx-utils/typescript-config` 包提供了一组预配置的 TypeScript 设置，用于保持项目之间的一致性，并减少重复配置的工作。

## 安装

```bash
# npm
npm install -D @nx-utils/typescript-config

# yarn
yarn add -D @nx-utils/typescript-config

# pnpm
pnpm add -D @nx-utils/typescript-config
```

## 特性

- ✅ **预配置模板** - 为不同类型的项目提供优化的配置
- ✅ **类型安全** - 启用严格模式和其他类型检查选项
- ✅ **现代语法** - 支持最新的 ECMAScript 功能
- ✅ **一致性** - 确保跨项目的 TypeScript 设置一致
- ✅ **优化性能** - 针对开发和生产环境的性能优化

## 可用配置

本包提供以下几种预设配置：

| 配置文件 | 用途 |
|---------|------|
| `base.json` | 基础配置，适用于大多数 TypeScript 项目 |
| `library.json` | 用于构建库的配置 |
| `react-library.json` | 用于 React 库的配置 |
| `nextjs.json` | 用于 Next.js 项目的配置 |

## 使用方法

在你的 `tsconfig.json` 文件中，使用 `extends` 字段来引用这些配置：

### 基础配置

```json
{
  "extends": "@nx-utils/typescript-config/base.json",
  "compilerOptions": {
    // 自定义选项...
    "rootDir": "src",
    "outDir": "dist"
  },
  "include": ["src/**/*.ts"],
  "exclude": ["node_modules", "dist"]
}
```

### 库配置

```json
{
  "extends": "@nx-utils/typescript-config/library.json",
  "compilerOptions": {
    // 自定义选项...
  },
  "include": ["src/**/*"]
}
```

### React 库配置

```json
{
  "extends": "@nx-utils/typescript-config/react-library.json",
  "compilerOptions": {
    // 自定义选项...
  },
  "include": ["src/**/*"]
}
```

### Next.js 配置

```json
{
  "extends": "@nx-utils/typescript-config/nextjs.json",
  "compilerOptions": {
    // 自定义选项...
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}
```

## 配置详情

### base.json

基础配置包含以下设置：

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "node",
    "esModuleInterop": true,
    "isolatedModules": true,
    "strict": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true
  }
}
```

### library.json

库配置优化了用于构建可发布库的设置：

```json
{
  "extends": "./base.json",
  "compilerOptions": {
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "composite": true,
    "noEmit": false
  }
}
```

### 自定义配置

你可以在 `extends` 之后添加自己的配置选项，覆盖默认设置：

```json
{
  "extends": "@nx-utils/typescript-config/base.json",
  "compilerOptions": {
    "target": "ES2022", // 覆盖基础配置的 target
    "jsx": "react-jsx", // 添加额外选项
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

## 最佳实践

- 尽量使用预设配置，而不是从头创建配置
- 只覆盖必要的选项
- 对于大型项目，考虑使用 `references` 进行项目引用
- 与 ESLint 配置一起使用，获得最佳的代码质量保证

## 常见问题

### 如何为 monorepo 配置 TypeScript？

在 monorepo 中，推荐在根目录创建一个基本的 `tsconfig.json`，然后在各个包中扩展它：

```
my-monorepo/
├── tsconfig.json        # 基础配置
├── packages/
│   ├── package-a/
│   │   └── tsconfig.json  # 扩展基础配置
│   └── package-b/
│       └── tsconfig.json  # 扩展基础配置
```

### TypeScript 项目引用如何使用？

项目引用可以提高 TypeScript 在大型项目中的性能：

```json
{
  "extends": "@nx-utils/typescript-config/base.json",
  "compilerOptions": {
    "composite": true,
    "rootDir": "src",
    "outDir": "dist"
  },
  "references": [
    { "path": "../common" }
  ]
}
```

### 如何处理第三方库的类型声明？

默认情况下，`skipLibCheck` 设为 `true`，这会加快编译速度。如果你需要更严格的检查，可以将其设为 `false`，但会增加编译时间。 