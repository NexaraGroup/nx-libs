---
sidebar_position: 1
---

# Monorepo 结构

NX Utils 使用 monorepo 结构组织代码，基于 pnpm workspace 和 Turborepo 构建。这种结构使我们能够在一个代码库中管理多个相关但独立的包，同时共享配置和工具。

## 目录结构

```
nx-utils/
├── apps/                   # 应用程序
│   ├── docs/               # 文档网站
│   └── web/                # 示例网站（如果有）
├── packages/               # 工具库包
│   ├── format/             # 格式化工具
│   ├── typescript-config/  # TypeScript 配置
│   ├── eslint-config/      # ESLint 配置
│   └── prettier-config/    # Prettier 配置
├── .eslintrc.js            # 根ESLint配置
├── .prettierrc.js          # 根Prettier配置
├── package.json            # 根package.json
├── pnpm-workspace.yaml     # pnpm工作区配置
└── turbo.json              # Turborepo配置
```

## 包说明

### apps 目录

`apps` 目录包含了完整的应用程序，这些应用程序通常是消费 `packages` 中的包：

- **docs**: 文档网站，使用 Docusaurus 构建
- **web**: 示例网站（如有）

### packages 目录

`packages` 目录包含了可发布的 npm 包：

- **format**: 数字和日期格式化工具
- **typescript-config**: 共享的 TypeScript 配置
- **eslint-config**: 共享的 ESLint 配置
- **prettier-config**: 共享的 Prettier 配置

## 工作原理

### 依赖管理

我们使用 pnpm 管理依赖，它通过硬链接共享依赖，减少磁盘空间占用和安装时间。

`pnpm-workspace.yaml` 文件定义了工作区：

```yaml
packages:
  - 'apps/*'
  - 'packages/*'
```

包之间的内部依赖使用 `workspace:*` 协议：

```json
{
  "dependencies": {
    "@nx-utils/format": "workspace:*"
  }
}
```

### 构建系统

我们使用 Turborepo 作为构建系统，它提供了：

- 增量构建
- 任务缓存
- 并行执行
- 依赖图分析

`turbo.json` 定义了项目中的各种任务：

```json
{
  "$schema": "https://turbo.build/schema.json",
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "lint": {},
    "test": {
      "dependsOn": ["build"],
      "outputs": []
    }
  }
}
```

### 代码共享

公共配置和工具以包的形式共享，包括：

- TypeScript 配置
- ESLint 规则
- Prettier 规则
- 工具函数

## 开发流程

### 新建包

创建新包的步骤：

1. 在 `packages` 目录下创建新目录
2. 添加 `package.json` 和必要的源文件
3. 更新 `pnpm-workspace.yaml`（如有必要）
4. 安装依赖 `pnpm install`

示例 `package.json`：

```json
{
  "name": "@nx-utils/new-package",
  "version": "0.0.0",
  "main": "./dist/index.js",
  "module": "./dist/index.mjs",
  "types": "./dist/index.d.ts",
  "sideEffects": false,
  "license": "MIT",
  "files": [
    "dist/**"
  ],
  "scripts": {
    "build": "tsup src/index.ts --format esm,cjs --dts",
    "dev": "tsup src/index.ts --format esm,cjs --watch --dts",
    "lint": "eslint \"src/**/*.ts\"",
    "test": "jest"
  }
}
```

### 常用命令

```bash
# 安装依赖
pnpm install

# 构建所有包
pnpm build

# 开发模式
pnpm dev

# 运行测试
pnpm test

# 运行 lint
pnpm lint

# 格式化代码
pnpm format
```

## 发布流程

1. 更新版本号
2. 构建所有包
3. 发布包

```bash
# 更新版本号
pnpm version patch  # 或 minor, major

# 构建
pnpm build

# 发布
pnpm publish --access public
```

## 优势

- **代码共享**: 包之间可以共享代码，避免重复
- **统一配置**: 统一的代码规范和构建流程
- **增量构建**: 只重建有改动的包
- **并行执行**: 提高构建速度
- **原子更改**: 跨包修改可以在单个提交中完成
- **简化依赖**: 一致的依赖版本 