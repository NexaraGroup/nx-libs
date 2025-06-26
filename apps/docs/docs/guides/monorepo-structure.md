---
sidebar_position: 1
---

# Monorepo 结构

NX libs 使用 monorepo 结构组织代码，基于 pnpm workspace 和 Turborepo 构建。这种结构使我们能够在一个代码库中管理多个相关但独立的包，同时共享配置和工具。

## 目录结构

```
nx-libs/
├── apps/                   # 应用程序
│   └── docs/               # 文档网站 (Docusaurus)
├── packages/               # 工具库包
│   ├── format/             # 格式化工具 (v1.0.1)
│   ├── typescript-config/  # TypeScript 配置 (v1.0.3)
│   ├── eslint-config/      # ESLint 配置 (v1.0.2)
│   ├── prettier-config/    # Prettier 配置 (v1.0.0)
│   └── type-utils/         # 类型工具 (开发中)
├── .changeset/             # Changesets 配置
├── .husky/                 # Git hooks
├── commitlint.config.js    # 提交信息规范
├── package.json            # 根package.json
├── pnpm-workspace.yaml     # pnpm工作区配置
├── turbo.json              # Turborepo配置
└── vitest.config.ts        # 测试配置
```

## 包说明

### apps 目录

`apps` 目录包含了完整的应用程序，这些应用程序通常是消费 `packages` 中的包：

- **docs**: 文档网站，使用 Docusaurus 构建
- **web**: 示例网站（如有）

### packages 目录

`packages` 目录包含了可发布的 npm 包：

- **format** (v1.0.1): 数字和日期格式化工具，包含完整测试覆盖
- **typescript-config** (v1.0.3): 共享的 TypeScript 配置，支持多种项目类型
- **eslint-config** (v1.0.2): 共享的 ESLint 配置，支持 Next.js 15.x
- **prettier-config** (v1.0.0): 共享的 Prettier 配置，包含导入排序
- **type-utils**: 类型工具库 (规划中)

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
		"@nxlibs/format": "workspace:*"
	}
}
```

### 构建系统

我们使用 Turborepo 作为构建系统，它提供了：

- **增量构建** - 只重新构建变更的包
- **任务缓存** - 缓存构建结果，提升速度
- **并行执行** - 利用多核处理器并行构建
- **依赖图分析** - 智能处理包之间的依赖关系

`turbo.json` 定义了项目中的各种任务：

```json
{
	"$schema": "https://turbo.build/schema.json",
	"tasks": {
		"build": {
			"dependsOn": ["^build"],
			"inputs": ["$TURBO_DEFAULT$", ".env*"],
			"outputs": ["dist/**"]
		},
		"dev": {
			"cache": false,
			"persistent": true
		},
		"lint": {
			"dependsOn": ["^build"]
		},
		"typecheck": {
			"dependsOn": ["^build"]
		},
		"test": {
			"outputs": ["coverage/**"]
		}
	}
}
```

### 测试系统

我们使用 Vitest 作为统一的测试框架：

- **快速执行** - 基于 Vite 的高性能测试
- **TypeScript 支持** - 原生 TypeScript 支持
- **覆盖率报告** - 内置覆盖率分析
- **智能监听** - 只重测试相关变更

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
	"name": "@nxlibs/new-package",
	"version": "0.0.0",
	"main": "./dist/index.js",
	"module": "./dist/index.mjs",
	"types": "./dist/index.d.ts",
	"sideEffects": false,
	"license": "MIT",
	"files": ["dist/**"],
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
pnpm turbo run build

# 运行测试（所有包）
pnpm test

# 运行测试（带覆盖率）
pnpm test:coverage

# 类型检查
pnpm typecheck

# 代码规范检查
pnpm lint

# 代码格式化
pnpm format

# 启动文档开发服务器
cd apps/docs && pnpm dev

# 过滤特定包的操作
pnpm turbo run build --filter=@nxlibs/format
pnpm turbo run test --filter=@nxlibs/format
```

## 发布流程

我们使用 Changesets 进行版本管理和发布：

### 1. 生成变更集

```bash
# 交互式生成 changeset
pnpm changeset

# 将选择要发布的包和变更类型
# - patch: 修复和小改进
# - minor: 新功能
# - major: 破坏性变更
```

### 2. 版本更新

```bash
# 自动更新版本号和生成 CHANGELOG
pnpm changeset version

# 提交版本变更
git add .
git commit -m "chore: version packages"
```

### 3. 发布到 npm

```bash
# 构建所有包
pnpm turbo run build

# 发布变更的包
pnpm changeset publish

# 推送版本标签
git push --follow-tags
```

### 发布检查清单

- [ ] 所有测试通过
- [ ] 类型检查通过  
- [ ] 代码规范检查通过
- [ ] 构建成功
- [ ] 文档已更新
- [ ] Changeset 已创建

## 优势

- **代码共享** - 包之间可以共享代码，避免重复
- **统一配置** - 统一的代码规范和构建流程  
- **增量构建** - 只重建有改动的包，提升效率
- **并行执行** - 充分利用系统资源，提高构建速度
- **原子更改** - 跨包修改可以在单个提交中完成
- **依赖管理** - 通过 pnpm 实现高效的依赖共享
- **版本同步** - 使用 Changesets 确保版本管理的一致性
- **质量保证** - 统一的测试、检查和发布流程

## 🎯 最佳实践

### 包设计原则

1. **单一职责** - 每个包专注于单一功能领域
2. **最小 API** - 保持简洁的公共接口
3. **向后兼容** - 遵循语义化版本，避免破坏性变更
4. **文档完整** - 每个包都有完整的使用文档和示例

### 依赖管理原则

1. **最小依赖** - 只添加必要的依赖
2. **对等依赖** - 合理使用 peerDependencies 避免版本冲突
3. **开发依赖** - 工具类依赖放在根目录统一管理
4. **版本锁定** - 使用确定的版本范围

### 开发工作流

1. **功能分支** - 每个功能使用独立分支开发
2. **原子提交** - 每个提交专注于单个变更
3. **测试驱动** - 新功能优先编写测试
4. **文档同步** - 代码变更同步更新文档

## 📊 项目指标

### 当前状态

- **包数量**: 4 个已发布包 + 1 个开发中
- **测试覆盖**: 核心功能包含完整测试
- **文档覆盖**: 100% 包文档覆盖
- **发布节奏**: 基于需求的持续发布

### 技术债务管理

我们持续关注和改进：

- 📈 **测试覆盖率提升** - 为所有核心功能添加测试
- 🔧 **构建性能优化** - 利用 Turbo 缓存和并行构建
- 📝 **文档完善** - 保持文档与代码同步
- 🚀 **CI/CD 集成** - 计划加入自动化测试和发布
